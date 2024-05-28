import { useState } from 'react';
import { Link, useLocation } from "react-router-dom"
import { attemptSignUp, attemptLogIn } from "./userAuth";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { setUsername } from './reducers/user';

const socket = io('http://localhost:7000');

export default socket;

export const SignUp = () => {

  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (password !== password2) {
      return;
    }
  
    attemptSignUp(username, password)
      .then((result) => {
        console.log(username, password);
        if (result === true) {
          socket.emit("setUsername", username);
          dispatch(setUsername(username));
          window.location.href = '/home';
        } else {
          setShow(true);
          return;
        }
      })
      .catch((error) => {
        console.error("Error while signing up:", error);
        setShow(true);
        return;
      });
  };
  
    return (
    <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign Up</title>
        <link rel="stylesheet" href="../Design/Auction/css/SignUp.css" />
        <div className="container">
            <form className="login-form">
            <h2>Signup</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setLocalUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                type="password"
                id="password"
                name="password"
                placeholder="Re-enter your password"
                onChange={(e) => setPassword2(e.target.value)}
                />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleSignUp}>Sign Up</button>
            </div>
            { (show) ?
            (<div className="show-error">
              <p>Could not sign in. Please change the username or try again later.</p>
            </div>) : (<p></p>)
            }
            <div className="form-group signup-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
            </form>
        </div>
    </div>
    );
};

export const LogIn = () =>  {
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  socket.on("loggedIn", (user) => {
    console.log("logIn response received from server");
    dispatch(setUsername(user));
    window.location.href = '/home';
  })

  const handleLogIn = () => {
    socket.emit("setUsername", { user: username, pass: password });
    console.log("Sent login request");
    setShow(true);
  };

    return (
    <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
        <link rel="stylesheet" href="../Design/Auction/css/SignUp.css" />
        <div className="container">
          <form className="login-form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setLocalUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
            <button onClick={handleLogIn}>Log in</button>
            </div>
            { (show) ?
            (<div className="show-error">
              <p>Could not sign in. Please change the username or try again later.</p>
            </div>) : (<p></p>)
            }
            <div className="form-group signup-link">
              Don't have an account? <Link to="/">Signup</Link>
            </div>
          </form>
        </div>
    </div>
    );
};
