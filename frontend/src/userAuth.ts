import axios from "axios"

export const attemptSignUp = async (user: string, pass: string): Promise<boolean> => {
    // check for any duplicates
    const myRet = await axios.post('http://localhost:7000/user/get', {
        username: user,
    });

    try {
        if (myRet.data.users[0].password === "") {
            return false;
        }
        return false;
    }
    catch (error) {}

    // make a new entry

    axios.post('http://localhost:7000/user/create', {
        username: user,
        password: pass,
        items: 0,
    });

    return true;
}

export const attemptLogIn = async (user: string, pass: string): Promise<boolean> => {
    // check for any duplicates

    // check the existing entry

    console.log("Attempting log in\n");

    try {
        console.log("Attempting log in 2\n");
        const myRet = await axios.post('http://localhost:7000/user/get', {
            username: user,
          });

        console.log("Attempting log in 3\n");

        if (myRet.data.users[0].password === pass)
            return true;
        else
            return false;
    }
    catch (error) {
        console.log("Error in attemptLogIn");
        return false;
    }
}
