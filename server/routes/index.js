import roomsRouter from './rooms.js'
import UserRouter from './users.js'

function route(app) {
    app.use('/api/rooms', roomsRouter);
    app.use('/api/users', UserRouter);
}

export default route;
