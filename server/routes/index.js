import roomsRouter from './rooms.js'
import UserRouter from './users.js'

function route(app) {
    app.use('/rooms', roomsRouter);
    app.use('/users', UserRouter);
}

export default route;
