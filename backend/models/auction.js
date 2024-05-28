import mongoose from "mongoose"

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startingPrice: {
        type: Number,
        required: true,
    },
    currentPrice: {
        type: Number,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    ownedBy: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
});

export const Auction = mongoose.model("Auction", auctionSchema)