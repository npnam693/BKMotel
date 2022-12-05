import Room from "../models/Room.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import { mongoose } from "mongoose";

//[GET] /api/rooms/
export const roomMenu = (req, res, next) => {
  const num = Number(req.query.num)
  console.log(num)
  Room.find()
    .sort({ ratingCount: -1, _id: -1 })
    .limit(num)
    .select("-creator -description -contact -remainCount")
    .then((rooms) => res.status(200).json(rooms))
    .catch(next);
};

//[GET] /api/rooms/:id
export const getRoom = (req, res, next) => {
  const roomId = req.params.id;
  Promise.all([
    Room.findById(roomId).populate("creator"),
    Review.find({ room: roomId }).populate("creator").sort("-createdAt"),
  ])
    .then(([rooms, reviews]) => res.status(200).json({ rooms, reviews }))
    .catch(next);
};

//[GET] /api/rooms/find
export const findRooms = (req, res, next) => {
  const { lowerPrice, higherPrice, province, area } = req.query;
  console.log(req.query)
  
  let q = {
    $and: [],
  };
  if (province) {
    q.$and.push({ province });
  }
  if (area) {
    q.$and.push({ area : { $lte: area}});
  }
  q.$and.push({ price: { $lte: lowerPrice, $gte: higherPrice } });

  Room.find(q)
    .then((rooms) => res.status(200).json(rooms))
    .catch(next);
};

export const createRoom = (req, res, next) => {
  const userId = req.user._id;
  const {
    title,
    area,
    description,
    price,
    remainCount,
    address,
    province,
    district,
    ward,
    contact,
    image,
  } = req.body;
  Room.create({
    title,
    creator: userId,
    area,
    description,
    price,
    remainCount,
    address,
    province,
    district,
    ward,
    contact,
    image,
  })
    .then((room) => res.status(201).json(room))
    .catch(next);
};

export const deleteRoom = (req, res) => {
  res.send("delete room");
};

//[GET] /api/rooms/favourites/:id
export const getAllFavouriteRooms = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .populate("favourites")
    .then((user) => res.status(200).json(user.favourites))
    .catch(next);
};





//[PUT] /api/rooms/favourites/add
export const addRoomToFavoriteList = async (req, res, next) => {
  const user = req.user;
  const { roomId } = req.body;
  let message, query;
  // console.log(roomId, user.favourites)
  if (user.favourites.includes(roomId)) {
    query = {
      $pull: { favourites: roomId },
    };
    message = "Hủy yêu thích thành công";
  } else {
    query = {
      $push: { favourites: roomId },
    };
    message = "Đã thêm vào danh sách yêu thích";
  }
  User.findByIdAndUpdate(user._id, query, { new: true })
    .populate("favourites")
    .then((u) =>
      res.status(200).json({
        favourites: u.favourites,
        message,
      })
    )
    .catch(next);
};

//[PUT] /api/rooms/favourites/clear
export const clearFavouriteList = (req, res, next) => {
  const user = req.user;
  if (!user.favourites.length) {
    next(new Error("Danh sách rỗng !"));
  }

  User.findByIdAndUpdate(
    user._id,
    {
      favourites: [],
    },
    {
      new: true,
    }
  )
    .then((u) =>
      res
        .status(200)
        .json({ favourites: u.favourites, message: "Xóa thành công" })
    )
    .catch(next);
};

// -------------- LAM ----------------
// [POST] /api/rooms/upload
export const uploadRoom = (req, res, next) => {
  const userId = req.user;
  console.log(userId._id);
  const {
    title,
    area,
    price,
    remainCount,
    province,
    district,
    ward,
    address,
    contact,
    description,
    image,
  } = req.body;
  Room.create({
    title,
    creator: userId._id,
    area,
    description,
    price,
    remainCount,
    address,
    province,
    district,
    ward,
    contact,
    image,
  })
    .then((room) => {
      console.log(room);
      res.status(201).json(room);
    })
    .catch(next);
};

// [POST] /api/rooms/deletebyid
export const deleteRoomById = async (req, res, next) => {
  const roomId = req.body._id;
  await Room.deleteOne({ _id: roomId }).then((e) => {
    if (e.acknowledged && e.deletedCount == 1) {
      return res.status(200).json({ message: "Xoá thành công" });
    } else {
      next(e);
    }
  });
};

// [POST] /api/rooms/deleteAllMyRooms
export const deleteAllMyRooms = async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  const creatorId = new ObjectId(req.body.creator);
  await Room.deleteMany({ creator: creatorId }).then((e) => {
    if (e.acknowledged && e.deletedCount > 0) {
      return res.status(200).json({ message: "Xoá thành công" });
    } else {
      next(e);
    }
  });
};

// [POST] /api/rooms/myrooms
export const myRooms = async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  const creatorId = new ObjectId(req.body.creator);
  Room.find({ creator: creatorId }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).json(data);
    }
  });
};


//  [PUT] /api/editrooms/reviews
export const updateReviewinRoom = (req, res, next) => {
  // const user = req.user;
  const {roomId, ratingCount, ratingPoint} = req.body
  console.log(roomId, ratingCount, ratingPoint)
  console.log('alo')
  Room.findByIdAndUpdate(roomId,
    {
      ratingCount: ratingCount,
      ratingPoint: ratingPoint
    }, () => console.log('oke r')
  )
}