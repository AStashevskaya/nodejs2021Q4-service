import fastify from 'fastify';
// // import fastify from 'fastify';
// import { FastifyReply } from 'fastify';
import { PORT } from './common/config';
import userRoutes from './resources/users/user.router';
import boardRoutes from './resources/boards/border.router';
import TasksRoutes from './resources/tasks/tasks.router';

// const app = fastify({ logger: true, trustProxy: true });
const app = fastify();

const start = async () => {
  try {
    await app.register(userRoutes);
    await app.register(boardRoutes);
    await app.register(TasksRoutes);
    await app.listen(PORT);

    console.log(`App is running on http://localhost:${PORT}`);
  } catch (error) {
    app.log.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
// import fastify from 'fastify'

// const server = fastify()

// server.get('/ping', async (request, reply) => {
//   return 'pong\n'
// })

// server.listen(8080, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })
