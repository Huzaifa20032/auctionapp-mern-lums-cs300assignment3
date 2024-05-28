import express from 'express'
import { createAuction, getAuction, getAuction2, updateAuction, updateAuctionUser, updateAuctionStatus, getAuctionAll } from '../controllers/auction.js'

export const auctionRouter = express.Router();

auctionRouter.post("/create", createAuction);
auctionRouter.post("/get", getAuction);
auctionRouter.post("/getAll", getAuctionAll);
auctionRouter.post("/get2", getAuction2);
auctionRouter.post("/update", updateAuction);
auctionRouter.post("/updateBidder", updateAuctionUser);
auctionRouter.post("/updateStatus", updateAuctionStatus);
// userRouter.get("/")
