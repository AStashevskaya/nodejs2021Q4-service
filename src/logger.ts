import pino, { Logger, TransportMultiOptions } from 'pino';

// const transport = pino.transport(<TransportMultiOptions>{

// });
const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const pinoLog: Logger = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        ignore: 'pid.hostname',
      },
    },

    // prettyPrint: true,
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      ignore: 'pid.hostname',
    },
    customLevels: levels, // our defined levels
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          body: request.body,
        };
      },
    },
  }
  // pino.destination(`${__dirname}/logger.log`),
);

export function handleError(
  error: Error,
  // customLogger: pino.Logger,
  ...args: []
): void {
  pinoLog.error(error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export default pinoLog;
