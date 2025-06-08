import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const ContactModal = ({ onClose }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    formName: "",
    formPhone: "",
    formMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, formPhone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.formName || !formData.formPhone) {
      toast.error(t("fillNamePhone", "Пожалуйста, заполните имя и номер телефона."));
      return;
    }

    if (!isValidPhoneNumber(formData.formPhone)) {
      toast.error(t("invalidPhone"));
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: formData.formName,
          formPhone: formData.formPhone,
          formMessage: formData.formMessage,
        }),
      });

      if (!response.ok) throw new Error("Network error");

      toast.success(t("messageSent"), { duration: 5000 });
      setFormData({ formName: "", formPhone: "", formMessage: "" });
      setTimeout(onClose, 2000);
    } catch (error) {
      toast.error(t("sendError", "Ошибка при отправке сообщения. Попробуйте позже."));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg p-8 max-w-lg w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-black"
          onClick={onClose}
          aria-label={t("close", "Закрыть")}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          {t("contactUs")}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              {t("formName")}
            </label>
            <input
              type="text"
              name="formName"
              value={formData.formName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t("enterName")}
            />
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              {t("formPhone")}
            </label>
            <PhoneInput
              international
              defaultCountry="AM"
              value={formData.formPhone}
              onChange={handlePhoneChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t("enterPhone")}
              required
            />
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              {t("formMessage")}
            </label>
            <textarea
              name="formMessage"
              rows="4"
              value={formData.formMessage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t("enterMessage")}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
          >
            {t("sendMessage")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
