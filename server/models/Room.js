import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: [String],

    ratingCount: { type: Number, default: 0 },
    ratingPoint: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    area: Number,
    num: Number,
    description: String,
    price: Number,
    remainCount: Number,
    address: String,
    province: String,
    district: String,
    ward: String,
    contact: String,
  },
  {
    timestamps: true,
  }
);
const Room = mongoose.model("Room", RoomSchema);

export default Room;
