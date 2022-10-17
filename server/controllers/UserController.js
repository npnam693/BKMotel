import User from '../models/User.js'


// [GET] /users/:username
export const showUser = (req, res, next) => {
    User.findOne({username: req.params.username})
        .then (user => res.json(user))
        .catch(next)
}