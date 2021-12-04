const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');
const userRoutes = require('./resources/users/user.router')

fastify.register(userRoutes);

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
// const app = require('./app');

// app.listen(PORT, () =>
//   console.log(`App is running on http://localhost:${PORT}`)
// );
