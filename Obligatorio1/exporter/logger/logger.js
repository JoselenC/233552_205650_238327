const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
    format.printf(
      (info) =>
        `DateTime: ${info.timestamp}. Level: ${info.level}. Message: ${info.message}`
    )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logger/log_file.log`,
    }),
    new transports.Console({
      level: "info",
    }),
  ],
})