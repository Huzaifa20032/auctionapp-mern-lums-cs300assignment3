import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connect } from "./utils/db.js";
import axios from "axios"

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Allow connections from this origin
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

const clientSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);


  socket.on("setUsername", ({ user, pass }) => {
    try {
      console.log("Signal received from frontend: setUsername");
      axios.post('http://localhost:7000/user/get', {
        "username": user
      })
      .then((ret) => {
        console.log("Received something");
        if (ret.data.users[0].password == pass)
        {
          console.log("Emitted");
          socket.emit("loggedIn", user);
        }
        else
        {
          console.log("Incorrect password");
        }
      })
    }
    catch (error) {
      console.log("Error while setting username");
    }
});


  socket.on("profile", (username) => {
    console.log("Signal received from frontend: profile")
    axios.post('http://localhost:7000/auction/get', { username })
      .then((response) => {
        // Emit the user profile data back to the client
        socket.emit("profileData", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        // Handle errors if necessary
      });
    // return what you get from the request
  })


  socket.on("browse", (toSearch) => {
    console.log("Signal received from frontend: browse")
    axios.post('http://localhost:7000/auction/getAll', { title: toSearch })
      .then((response) => {
        // Emit the user profile data back to the client
        socket.emit("browseData", response.data);
      })
      .catch((error) => {
        console.log("Error fetching browse:", error);
        // Handle errors if necessary
      });
    // return what you get from the request
  })


  socket.on("joinRoom", (socketID) => {
    socket.join(socketID);
    console.log("Signal received from frontend: joinRoom");
    // socket.join(socketID);
    axios.post('http://localhost:7000/auction/get2', { _id: socketID })
    .then((response) => {
      console.log("Room successfully joined");
      socket.emit("updateSpecificAuction", response.data);
    })
    .catch((error) => {
      console.log("Error fetching specific auction", error);
    });
  })


  socket.on("newBid", (auctionID) => {
    axios.post('http://localhost:7000/auction/get2', { _id: auctionID })
    .then((response) => {
      io.to(auctionID).emit("updateSpecificAuction", response.data);
      console.log("Room successfully updated");
    })
    .catch((error) => {
      console.log("Error fetching specific auction", error);
    });
  })


  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);

    clientSocketMap.forEach((value, key) => {
      if (value === socket.id) {
        clientSocketMap.delete(key);
      }
    });
  });
});

server.listen(7000, () => {
  console.log("Server is running on port 7000");
});

connect(); // for the http server