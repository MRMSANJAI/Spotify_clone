import express from "express";
import { listSong, addSong } from "../Controllers/songController.js";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.post("/add",upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  addSong
);


songRouter.get("/list", listSong);

export default songRouter;
