import pino, {
  Logger,
  TransportMultiOptions,
  LoggerOptions,
  TransportPipelineOptions,
} from 'pino';
import {
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
} from 'fastify';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

type Request = {
  method: string;
  url: string;
  routerPath: string;
  params: object;
  body: object;
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
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      ignore: 'pid.hostname',
    },
    customLevels: levels,
    serializers: {
      res(reply: RawReplyDefaultExpression) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request: Request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          body: request.body,
        };
      },
    },
  },
);

export function handleError(
  error: Error,
  ...args: []
): void {
  pinoLog.error(error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export default pinoLog;
