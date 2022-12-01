import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import * as RoomController from "../controllers/RoomController.js";

const router = express.Router();

router.get("/", RoomController.roomMenu);
router.get("/:id", RoomController.getRoom);
router.get("/find", verifyToken, RoomController.findRooms);
router.post("/create", verifyToken, RoomController.createRoom);
router.post("/upload", verifyToken, RoomController.uploadRoom);
router.get("/favourites/:id", verifyToken, RoomController.getAllFavouriteRooms);
router.put(
  "/favourites/add",
  verifyToken,
  RoomController.addRoomToFavoriteList
);
router.put("/favourites/clear", verifyToken, RoomController.clearFavouriteList);
router.post("/deletebyid", verifyToken, RoomController.deleteRoomById);
router.post("/myrooms", verifyToken, RoomController.myRooms);
router.post("/deleteallmyrooms", verifyToken, RoomController.deleteAllMyRooms);

export default router;
