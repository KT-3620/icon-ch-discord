module.exports = {
  apps: [
    {
      name: "icon", // Name of your application
      script: "src/index.ts", // Entry point of your application
      interpreter: "~/.bun/bin/bun", // Path to the Bun interpreter
    },
  ],
};
