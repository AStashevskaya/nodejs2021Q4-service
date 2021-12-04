const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');
const userRoutes = require('./resources/users/user.router')
const boardRoutes = require('./resources/boards/border.router');
const tasksRoutes = require('./resources/tasks/tasks.router');

fastify.register(userRoutes);
fastify.register(boardRoutes);
fastify.register(tasksRoutes);

const start = async () => {
  try {
    await fastify.listen(PORT)
   console.log(`App is running on http://localhost:${PORT}`);
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
