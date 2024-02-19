import log4js from "log4js";

const config: log4js.Configuration = {
  appenders: {
    console: {
      type: "console",
    },
    system: {
      type: "dateFile",
      filename: "log/system.log",
      pattern: "-yyyy-MM-dd",
      numBackups: 30,
    },
  },
  categories: {
    default: {
      appenders: ["console", "system"],
      level: "info",
    },
  },
};

log4js.configure(config);
//all < trace < debug < info < warn < error < fatal < mark < off

/** log4jsのlogger */
export const logger = log4js.getLogger("icon");
