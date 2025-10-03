import React, { Fragment } from "react"
import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import './App.css';


const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        {/* Landing should take the full screen */}
        <Route path="/" element={<Landing />} />

        {/* Register and Login should be centered in container */}
        <Route
          path="/register"
          element={
            <section className="container">
              <Register />
            </section>
          }
        />
        <Route
          path="/login"
          element={
            <section className="container">
              <Login />
            </section>
          }
        />
      </Routes>
    </Fragment>
  </Router>
);


// const App = () => (
//   <Router>
//     <Fragment>
//       <Navbar />
//       <section > 
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route <section className="container"> path="/register" element={<Register />} />
//           <Route className="container" path="/login" element={<Login />} />
//         </Routes>
//       </section>
//     </Fragment>
//   </Router>
// );
  
    

export default App;


/* <Router>
    <Fragment>
      <Navbar />
      <Route exact path ='/' compnent = {Landing}/>
      <section className = "container">
        <Routes>
          <Route exact path = "/register" component = {Register} />
          <Route exact path = "login" component = {Login} />
        </Routes>
      </section>
      <Landing />
    </Fragment>
  </Router> */
















