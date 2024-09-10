module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom", // Para pruebas de React
  transformIgnorePatterns: ["/node_modules/"],
};
