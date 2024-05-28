// import { useState } from 'react'
import './App.css'
import { LogIn, SignUp } from './userAuthR'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Browse, CreateAuction, Profile, SpecificAuction, ChangePassword } from './BrowseR';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';



function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/home" element={<Home />}/>
            <Route path="/browse" element={<Browse />}></Route>
            <Route path="/specificauction" element={<SpecificAuction />} />
            <Route path="/createauction" element={<CreateAuction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updatepassword" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}


export default App
