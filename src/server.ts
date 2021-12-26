import fastify from 'fastify';
import config from './common/config';
import userRoutes from './resources/users/user.router';
import boardRoutes from './resources/boards/border.router';
import TasksRoutes from './resources/tasks/tasks.router';
import pinoLog, { handleError } from './logger';

const app = fastify({
  logger: pinoLog,
});

const start = async () => {
  try {
    await app.register(userRoutes);
    await app.register(boardRoutes);
    await app.register(TasksRoutes);
    await app.listen(config.PORT);

    console.log(`App is running on http://localhost:${config.PORT}`);
  } catch (error) {
    pinoLog.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

(async function startSync() {
  try {
    await start();
  } catch (error) {
    console.error(error);
  }
})();

process.on('uncaughtException', handleError);
process.on('unhandledRejection', (reason) =>
  handleError(new Error(String(reason))));
