import Room from '../models/Room.js'
import Review from '../models/Review.js'

//[GET] /api/rooms/
export const roomMenu = (req, res, next) => {
    Room.find().sort({ratingCount: -1, ratingPoint: -1})
                .limit(24)
                .select('-creator -description -contact -remainCount')
                .then(rooms => res.status(200).json(rooms))
                .catch(next)
}

//[GET] /api/rooms/:id
export const getRoom = (req, res, next) => {
    const roomId = req.params.id
    Promise.all([Room.findById(roomId).populate('creator'),
                Review.find({ room: roomId }).populate('creator').sort('-createdAt')])
                .then(([rooms, reviews])=> res.status(200).json({rooms, reviews}))
                .catch(next)
}

//[GET] /api/rooms/find
export const findRooms = (req, res, next) => {
    const {lowerPrice, higherPrice, province, area} = req.query
    let q = {
        $and: []
    }
    if (province){
        q.$and.push({province})
    }
    if(area){
        q.$and.push({area})
    }
    if(lowerPrice){
        if(higherPrice){
            q.$and.push({price: {$gt: lowerPrice, $lt: higherPrice}})
        }
        else{
            q.$and.push({ price: {$gt: lowerPrice} })
        }
    }
    Room.find(q).then(rooms => res.status(200).json(rooms))
                .catch(next)
}

export const createRoom = (req, res) => {
    
}

export const deleteRoom = (req, res) => {
    res.send('delete room')
}
