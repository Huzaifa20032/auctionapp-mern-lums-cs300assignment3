import { Auction } from "../models/auction.js"

export const createAuction = async (req, res, next) => {
    try {
        const { title , description, startingPrice, currentPrice, startDateTime, endDateTime, username, ownedBy, status } = req.body;

        const auction = await Auction.create({ title , description, startingPrice, currentPrice, startDateTime, endDateTime, username, ownedBy, status });

        return res.status(201).json({ auction });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAuction = async (req, res) => {
  try {
      let filter = {}; // Initialize an empty filter object

      // Check if the username is provided
      if (req.body.username) {
          filter = { username: req.body.username }; // Set the filter to filter by username
      }

      const auctions = await Auction.find(filter);

      return res.status(200).json({ auctions });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const getAuctionAll = async (req, res) => {
    try {
        let filter = {}; // Initialize an empty filter object
  
        // Check if the username is provided
        if (req.body.title) {
            filter = { title: req.body.title }; // Set the filter to filter by username
        }
  
        const auctions = await Auction.find(filter);

        return res.status(200).json({ auctions });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAuction2 = async (req, res) => {
    try {
      const { _id } = req.body;
  
      const auctions = await Auction.find({ _id: _id });
  
      return res.status(200).json({ auctions });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const updateAuction = async (req, res) => {
    try {
        const { _id, currentPrice } = req.body;

        const updatedAuction = await Auction.findByIdAndUpdate(_id, { currentPrice: currentPrice });

        return res.status(200).json( updatedAuction );
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateAuctionUser = async (req, res) => {
    try {
        const { _id, ownedBy } = req.body;

        const updatedAuction = await Auction.findByIdAndUpdate(_id, { ownedBy: ownedBy });

        return res.status(200).json( updatedAuction );
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateAuctionStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;

        const updatedAuction = await Auction.findByIdAndUpdate(_id, { status: status });

        return res.status(200).json( updatedAuction );
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// export const getAuction = async (req, res) => {
//     try {
//       const { username } = req.body;
  
//       const auctions = await Auction.find({ username: username });
  
//       return res.status(200).json({ auctions });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   };
