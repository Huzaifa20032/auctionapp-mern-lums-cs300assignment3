import { Auction } from "../models/auction.js";
import { User } from "../models/user.js"

export const createUser = async (req, res, next) => {
    try {
        const { username, password, items } = req.body;

        if (!username || !password ) {
            return  res.status(400).json("jerror: All fields are required")
        }

        console.log("Creating user\n");

        const user = await User.create({ username, password, items });

        console.log("User created\n");

        return res.status(201).json({ user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).json({ error: "Name is required" });
      }
  
      const users = await User.find({ username: username });
  
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
export const updateUserPassword = async (req, res) => {
  try {
      const { username, password } = req.body;

      const updatedUser = await User.findOneAndUpdate( {username: username } , { password: password} );

      return res.status(200).json( updatedUser );
  }
  catch (error) {
      return res.status(500).json({ error: error.message });
  }
}

export const updateUserItems = async (req, res) => {
  try {
      const { username, items } = req.body;

      console.log("Finding username and updated with: ", items);

      const updatedUser = await User.findOneAndUpdate( {username: username } , { items: items} );

      return res.status(200).json( updatedUser );
  }
  catch (error) {
      return res.status(500).json({ error: error.message });
  }
}
