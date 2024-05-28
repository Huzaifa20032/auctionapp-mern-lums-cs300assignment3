import axios from "axios";

export async function attemptCreateAuction(title_: string, description_: string, startingPrice_: number, startingTime_: string, endingTime_: string, currentUser: string): Promise<boolean>
{
    const startDateTime_ = new Date(startingTime_); // Assuming startingTime is in the format 'yyyy-MM-ddTHH:mm'
    const endDateTime_ = new Date(endingTime_); // Assuming endingTime is in the format 'yyyy-MM-ddTHH:mm'

    console.log("Inside function, user about to be sent is: ", currentUser);

    try {
        await axios.post('http://localhost:7000/auction/create', {
            "title": title_,
            "description": description_,
            "startingPrice": startingPrice_,
            "currentPrice": startingPrice_,
            "startDateTime": startDateTime_,
            "endDateTime": endDateTime_,
            "username": currentUser,
            "ownedBy": currentUser,    
            "status": false,
        });

        return true;
    }
    catch (error) {
        console.log("Error in sending http request to store auction");
        return false;
    }
};

export async function updateCurrentAuction(_id: string, newBid: number): Promise<boolean>
{
    try {
        await axios.post('http://localhost:7000/auction/update', {
            "_id": _id,
            "currentPrice": newBid,
        });

        return true;
    }
    catch (error) {
        console.log("Error in sending http request to store auction");
        return false;
    }
};

export async function attemptChangePassword(username: string, newPassword: string): Promise<boolean>
{
    try {
        await axios.post('http://localhost:7000/user/updatePassword', {
            "username": username,
            "password": newPassword,
        });

        return true;
    }
    catch (error) {
        console.log("Error in sending http request to change password");
        return false;
    }
};

export async function attemptUpdateItems(username: string, socketID: string): Promise<boolean>
{
    try {
        await axios.post('http://localhost:7000/auction/updateStatus', {
            "_id": socketID,
            "status": true,
        })

        let myUser = await axios.post('http://localhost:7000/user/get', {
            "username": username,
        })

        await axios.post('http://localhost:7000/user/updateItems', {
            "username": username,
            "items": (myUser.data.users[0].items + 1),
        });

        return true;
    }
    catch (error) {
        console.log("Error in sending http request to change password");
        return false;
    }
};

export async function attemptUpdateBidder(socketID: string, newBidder: string): Promise<boolean>
{
    try {
        await axios.post('http://localhost:7000/auction/updateBidder', {
            "_id": socketID,
            "ownedBy": newBidder,
        });

        return true;
    }
    catch (error) {
        console.log("Error in updating bidder");
        return false;
    }
};

export async function getItemsOwned(username: string): Promise<number>
{
    try {
        let myUser = await axios.post('http://localhost:7000/user/get', {
            "username": username,
        })

        return myUser.data.users[0].items;
    }
    catch (error) {
        console.log("Error in sending http request to change password");
        return -1;
    }
};
