import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { motion, AnimatePresence } from "framer-motion";

const ContactModal = ({ onClose }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    formName: "",
    formPhone: "",
    formMessage: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { formName, formPhone, formMessage } = formData;

    const nameEmpty = !formName.trim();
    const phoneValid = formPhone && isValidPhoneNumber(formPhone);

    if (nameEmpty && !phoneValid) {
      setError(t("enterNameAndPhone"));
      return;
    } else if (nameEmpty) {
      setError(t("enterNameOnly"));
      return;
    } else if (!phoneValid) {
      setError(t("enterPhoneOnly"));
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName, formPhone, formMessage }),
      });

      if (!res.ok) throw new Error("Network error");

      toast.success(t("messageSent"), { duration: 3000 });
      setFormData({ formName: "", formPhone: "", formMessage: "" });
      setTimeout(onClose, 2000);
    } catch {
      toast.error(t("sendError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white dark:bg-gray-900 rounded-lg p-8 max-w-lg w-full shadow-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="absolute top-3 right-3 text-2xl font-bold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            onClick={onClose}
            aria-label={t("close")}
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
            {t("contactUs")}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("formName")}
              </label>
              <input
                type="text"
                name="formName"
                value={formData.formName}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-white"
                placeholder={t("enterName")}
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("formPhone")}
              </label>
              <div className="phone-input-wrapper rounded border border-gray-300 dark:border-gray-600">
                <PhoneInput
                  international
                  defaultCountry="AM"
                  value={formData.formPhone}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, formPhone: val }))
                  }
                  inputClassName="w-full bg-transparent text-black dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  placeholder={t("enterPhone")}
                />
              </div>
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("formMessage")}
              </label>
              <textarea
                name="formMessage"
                rows="4"
                value={formData.formMessage}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-white"
                placeholder={t("enterMessage")}
              ></textarea>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium -mt-2 mb-2">
                {error}
              </p>
            )}

            <div className="relative">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-black text-white py-2 px-4 rounded overflow-hidden relative transition-colors duration-300 ${
                  isSubmitting ? "cursor-wait" : "hover:bg-gray-800"
                }`}
              >
                <span className="relative z-10">{t("sendMessage")}</span>
                {isSubmitting && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-white/70 z-0"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                )}
              </button>
            </div>
          </form>

          <style>{`
            .phone-input-wrapper {
              border: 1px solid #d1d5db; /* gray-300 */
              border-radius: 0.375rem; /* rounded */
            }
            .dark .phone-input-wrapper {
              border-color: #4b5563; /* gray-600 */
            }
            .phone-input-wrapper input {
              background-color: transparent !important;
              color: inherit !important;
              border: none !important;
              outline: none !important;
              width: 100%;
            }
            .phone-input-wrapper input:focus {
              outline: none !important;
              box-shadow: 0 0 0 2px black !important;
              border: none !important;
            }
            .dark .phone-input-wrapper input:focus {
              box-shadow: 0 0 0 2px white !important;
            }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
