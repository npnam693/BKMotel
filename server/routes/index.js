import roomsRouter from './rooms.js'
import UserRouter from './users.js'
import reviewsRouter from './reviews.js';
function route(app) {
    app.use('/api/rooms', roomsRouter);
    app.use('/api/users', UserRouter);
     app.use('/api/reviews',reviewsRouter);
}

export default route;
