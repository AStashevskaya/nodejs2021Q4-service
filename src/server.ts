import fastify from 'fastify'
// // import fastify from 'fastify';
// import { FastifyReply } from 'fastify';
import { PORT } from './common/config'
import userRoutes from "./resources/users/user.router";
import boardRoutes from "./resources/boards/border.router";
import TasksRoutes from "./resources/tasks/tasks.router";
// // const fastify = require('fastify')({ logger: true });
// // const { PORT } = require('./common/config');
// // const userRoutes = require('./resources/users/user.router.ts')
// // const boardRoutes = require('./resources/boards/border.router.ts');
// // const tasksRoutes = require('./resources/tasks/tasks.router.ts');

// const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
//     {
//         logger: true,
//         trustProxy: true
//     }
// );

// fastify.register(userRoutes);
// fastify.register(boardRoutes);
// fastify.register(TasksRoutes);
const server = fastify()
server.register(userRoutes);
server.register(boardRoutes);
server.register(TasksRoutes);



const start = async () => {
  try {
    await server.listen(PORT)
   console.log(`App is running on http://localhost:${PORT}`);
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start()
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
