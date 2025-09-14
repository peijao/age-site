import javascriptObfuscator from 'rollup-plugin-javascript-obfuscator';

export default {
  input: 'dist/assets/index-D2LqYQ5L.js',
  output: {
    file: 'dist/assets/index-obf.js',
    format: 'es',
  },
  plugins: [
    javascriptObfuscator({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      stringArray: true,
      rotateStringArray: true,
      selfDefending: true,
      disableConsoleOutput: true,
    }),
  ],
};
