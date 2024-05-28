
import { Link, useLocation, useParams } from "react-router-dom";
import styles from '../Design/Auction/css/navbar.module.css';
import { useState } from "react";
import socket from "./userAuthR";
import { attemptCreateAuction, updateCurrentAuction, attemptChangePassword, attemptUpdateItems, attemptUpdateBidder, getItemsOwned } from "./browse";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./reducers";
import { setUsername } from "./reducers/user";


export const ChangePassword = () => {

    let globalUsername: string = useSelector((state: RootState) => state.user.username);

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
  
    const handleChangePassword = () => {
        if (password !== password2) {
            return;
        }

        attemptChangePassword(globalUsername, password)
        .then((result) => {
            if (result == true) {
                window.location.href = '/home'
            } else {
                return;
            }
        })
        .catch((error) => {
            console.error("Error while signing up", error);
        })
    };
    
        return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Sign Up</title>
          <link rel="stylesheet" href="../Design/Auction/css/SignUp.css" />
          <div className="container">
              <form className="login-form">
              <h2>Change Password</h2>
              <div className="form-group">
                  <label htmlFor="username">Logged in as: {globalUsername}</label>
              </div>
              <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Confirm New Password</label>
                  <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Re-enter your password"
                  onChange={(e) => setPassword2(e.target.value)}
                  />
              </div>
                <div className="form-group">
                    <button type="button" onClick={handleChangePassword}>Change password</button>
                </div>
                <div className="form-group signup-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
              </form>
          </div>
        </div>
      );
  };
  

export const Browse = () => {
    const [auctions, setAuctions] = useState([]);
    const [searchPar, setSearchPar] = useState('');

    useEffect(() => {
        socket.emit("browse", "");
        socket.on("browseData", (data) => {
            setAuctions(data.auctions);
        });
    }, []);

    const handleSpecificAuction = (auctionID: string) => {
        console.log(auctionID);
        window.location.href = `/specificauction?socketID=${auctionID}`;
    }

    const handleSearch = (toSearch: string) => {
        socket.emit("browse", toSearch);
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Browse</title>
                <link rel="stylesheet" href="../Design/Auction/css/Browse.css" />
                <div className="container">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchPar(e.target.value)}
                        />
                        <button onClick={(e) => handleSearch(searchPar)}>Search</button>
                    </div>
                    <div className="auction-card">
                        {auctions.map((auction, index) => (
                            <div className="auction-card" key={index}>
                                <h4>{auction.title}</h4>
                                <p>{auction.description}</p>
                                <p>Starting Price: ${auction.startingPrice}</p>
                                <p>Current Price: ${auction.currentPrice}</p>
                                <p>Start Time: {new Date(auction.startDateTime).toLocaleString()}</p>
                                <p>End Time: {new Date(auction.endDateTime).toLocaleString()}</p>
                                <button onClick={() => handleSpecificAuction(auction._id)}>Go to auction</button>
                                {/* <p>Status: {auction.status}</p> */}
                            </div>
                        ))}
                    </div>
                    {/* <div className="auction-card">
                        <img
                        src="../Design/Auction/assets/auction.png"
                        alt="Item Image"
                        className="item-image"
                        />
                        <div className="auction-details">
                            <h2 className="auction-title">Auction Title</h2>
                            <p className="description">Description of the item goes here.</p>
                            <p>Starting Price: Rs. 5,000</p>
                            <p>Start Time: 10:00 AM</p>
                            <p>End Time: 12:00 PM</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
  
export const Profile = () => {
    const [auctions, setAuctions] = useState([]);
    const [items, setItems] = useState(-1);

    let globalUsername: string = useSelector((state: RootState) => state.user.username);

    getItemsOwned(globalUsername)
    .then((noItems) => {
        setItems(noItems);
    })
    .catch((error) => {
        console.log(error);
    })

    useEffect(() => {

        socket.emit("profile", globalUsername);
        socket.on("profileData", (data) => {
            setAuctions(data.auctions);
        });
        socket.on("profileDataUpdate", (data) => {
            setAuctions(data.auctions);
        }) 
    }, []);

    const handleSpecificAuction = (auctionID: string) => {
        console.log(auctionID);
        window.location.href = `/specificauction?socketID=${auctionID}`;
    }

    const checkStatus = (dateToCheck: Date, sold: boolean, nameToCheck: string, socketID: string) => {
        const currentDate = new Date();
        const timeToCheck = new Date(dateToCheck);

        if (currentDate >= timeToCheck) {
            if (sold == false)
            {
                attemptUpdateItems(nameToCheck, socketID)
                .then((result) => {
                    if (result == true)
                        console.log("Updated items for user: ", nameToCheck);
                    else
                        console.log("Could not update items for user: ", nameToCheck);
                })
                .catch((error) => {
                    console.log(error); 
                })
            }

            console.log("Status: not available");
            return false;
        }
        else {
            console.log("Status: available");
            return true;
        }
    }


        // myAuctions is returning correctly
        // you can access data through stuff like myAuctions.auctions[0].title
        // change the components to show this information

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
                <link rel="stylesheet" href="../Design/Auction/css/profile.css" />
                <div className="container">
                    <div className="profile-info">
                    <div className="profile-image">
                        <img src="../Design/Auction/assets/user.png" alt="User Image" />
                    </div>
                    <div className="user-details">
                        <h2>Name: {globalUsername}</h2>
                        <p>Items owned: { items }</p>
                    </div>
                    </div>
                    <div className="profile-actions">
                        <Link to="/createauction">Create Auction</Link>
                        <Link to="/updatepassword">Change password</Link>
                    {/* <button href="create_auction.html">Create Auction</button>
                    <button href="#">Update Password</button> */}
                    </div>
                    {/* Change from here */}
                    <h3>My Auctions</h3>
                    <div className="auction-list">
                        {auctions.map((auction, index) => (
                            <div className="auction-card" key={index}>
                                <h4>{auction.title}</h4>
                                <p>{auction.description}</p>
                                <p>Starting Price: ${auction.startingPrice}</p>
                                <p>Current Price: ${auction.currentPrice}</p>
                                <p>Start Time: {new Date(auction.startDateTime).toLocaleString()}</p>
                                <p>End Time: {new Date(auction.endDateTime).toLocaleString()}</p>
                                <button onClick={() => handleSpecificAuction(auction._id)}>Go to auction</button>
                                {checkStatus(auction.endDateTime, auction.status, auction.ownedBy, auction._id) ? (<p>Status: Available</p>) : (<p>Status: Not available</p>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  );
};

export const SpecificAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const [bidAmount, setBidAmount] = useState(0);

    let globalUsername: string = useSelector((state: RootState) => state.user.username);

    const location = useLocation();
    const socketID = new URLSearchParams(location.search).get('socketID');

    console.log(socketID);

    useEffect(() => {
        socket.emit("joinRoom", socketID);

        socket.on("updateSpecificAuction", (data) => {
            console.log("received update");
            setAuctions(data.auctions);
        });

    }, []);

    const handleBidPlacement = (newBid: number, currentBid: number) => {
        if (socketID == null)
            return;

        if (newBid <= currentBid)
            return;

        attemptUpdateBidder(socketID, globalUsername)
        .then((result) => {
            if (result == true) {
                updateCurrentAuction(socketID, newBid)
                .then((result) => {
                    if (result == true)
                        socket.emit("newBid", socketID);
                    else
                        console.log("Failed to update price");
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            else
                console.log("Failed to update bidder")
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const checkStatus = (dateToCheck: Date, sold: boolean, nameToCheck: string, socketID: string) => {
        const currentDate = new Date();
        const timeToCheck = new Date(dateToCheck);

        if (currentDate >= timeToCheck) {
            if (sold == false)
            {
                attemptUpdateItems(nameToCheck, socketID)
                .then((result) => {
                    if (result == true)
                        console.log("Updated items for user: ", nameToCheck);
                    else
                        console.log("Could not update items for user: ", nameToCheck);
                })
                .catch((error) => {
                    console.log(error); 
                })
            }

            console.log("Status: not available");
            return false;
        }
        else {
            console.log("Status: available");
            return true;
        }
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            { (globalUsername)}
            <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Specific Auction</title>
            <div className="auction-details">
            <link rel="stylesheet" href="../Design/Auction/css/specificauction.css" />
                {auctions.map((auction, index) => (
                    <div>
                    <div className="auction-image">
                    <img src="" alt="Item Image" />
                    </div>
                    <div className="auction-info">
                    <h2 className="auction-title">{auction ? auction.title : ""}</h2>
                    <p className="description">{auction ? auction.description : ""}</p>
                    <p>
                        <strong>Starting Price: </strong> Rs. {auction.startingPrice}
                    </p>
                    <p>
                        <strong>Current Price:</strong> Rs. {auction.currentPrice}
                    </p>
                    <p>
                        <strong>{new Date(auction.startDateTime).toLocaleString()}</strong> 10:00 AM
                    </p>
                    <p>
                        <strong>{new Date(auction.endDateTime).toLocaleString()}</strong> 12:00 PM
                    </p>
                    {
                        checkStatus(auction.endDateTime, auction.status, auction.ownedBy, auction._id) ? (<div>
                            <p>
                                <strong>Status: </strong> Available
                            </p>                        </div>) : (<div>
                            <p>
                                <strong>Status: </strong> Not available
                            </p>
                        </div>)
                    }
                    <div>
                    { (globalUsername !== auction.username && checkStatus(auction.endDateTime, auction.status, auction.ownedBy, auction._id) == true) ? (
                    <div className="bid-form">
                        <label htmlFor="bidAmount">Your Bid:</label>
                        <input
                        type="number"
                        id="bidAmount"
                        name="bidAmount"
                        min={0}
                        step={1}
                        onChange={(e) => setBidAmount(parseInt(e.target.value))}
                        />
                        <button onClick={() => handleBidPlacement(bidAmount, auction.currentPrice)}>Place Bid</button>
                    </div> ) : (<div></div>)}
                    </div>
                    </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}
  

export const CreateAuction = () => {
    // send the details to mongoDB

    let globalUsername: string = useSelector((state: RootState) => state.user.username);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState(0);  
    const [startingTime, setStartingTime] = useState('');  
    const [endTime, setEndTime] = useState('');

    const handleCreateAuction = () => {
        console.log("Entered handle create auction");

        console.log("User who made the auction is: ", globalUsername) // this still shows as missingUser even after updating
        attemptCreateAuction(title, description, startingPrice, startingTime, endTime, globalUsername)
        .then((result) => {
            if (result == true)
                console.log("Auction created successfully");
            else
                console.log("Auction creation failed");
            // window.location.href = '/profile';
        })
        .catch(() => {
            console.log("Error: new auction could not be created");
        })
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Create Auction</title>
            <link rel="stylesheet" href="../Design/Auction/css/createauction.css" />
            <div className="container">
                <h1>Create Auction</h1>
                <form action="" method="POST">
                <label htmlFor="itemImage">Item Image:</label>
                <input
                    type="file"
                    id="itemImage"
                    name="itemImage"
                    accept="image/*"
                    // required=""
                />
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)}/>
                {/* <input type="text" id="title" name="title" required="" /> */}
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    // required=""
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="startingPrice">Starting Price:</label>
                <input
                    type="number"
                    id="startingPrice"
                    name="startingPrice"
                    min={0}
                    step={1}
                    onChange={(e) => setStartingPrice(parseInt(e.target.value))}
                    // required=""
                />
                <label htmlFor="startTime">Start Time:</label>
                <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    onChange={(e) => setStartingTime(e.target.value)}
                    // required=""
                />
                <label htmlFor="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" name="endTime" onChange={(e) => setEndTime(e.target.value)}/>
                {/* <input type="datetime-local" id="endTime" name="endTime" required="" /> */}
                <button type="button" onClick={handleCreateAuction}>Create Auction</button>
                </form>
            </div>
            </div>
        </div>
    );
};


export const Home = () => {

    let globalUsername: string = useSelector((state: RootState) => state.user.username);

    console.log("Username at home is: ", globalUsername);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home</title>
                <link rel="stylesheet" href= "../Design/Auction/css/home.css"/>
                <div className="container">
                    {/* <Navbar /> */}
                    <div>
                    <h1>Welcome to BidMe</h1>
                    <p className="subtitle">Discover unique items and bid to win!</p>
                    <Link to="/createauction">
                        <button className="join">Join Now!</button>
                    </Link>
                    {/* <button className="join">Join Now!</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUsername("noUser"));
        window.location.href = '/';
    }

    return (
      <div className={styles.container}>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Navbar</title>
        <div>
          <ul className={styles.container}>
            <span className={styles['sub-container']}>
              <li>
                <Link className={styles.link} to="/home">Home</Link>
              </li>
              <li>
                <Link className={styles.link} to="/browse">Browse</Link>
              </li>
            </span>
            <span className={styles['sub-container']}>
              <li>
              <Link to="/profile">
                <img className={styles.image} src="../Design/Auction/assets/user.png" alt="User" />
              </Link>
              </li>
              <li className={styles.logout}>
                    <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </span>
          </ul>
        </div>
      </div>
    );
  };
  