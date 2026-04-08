import React, { Component } from "react";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import "./App.scss";

class App extends Component {
  constructor(){
    super();
    this.state = {
      name: "Queue Seva",
      currentPage: "landing",
      isLoggedIn: false,
      user: null
    };
  }
 // Check if user is already logged in when the component mounts
  componentDidMount() {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) { // If user data exists in localStorage, set the state to logged in
      this.setState({ isLoggedIn: true, user, currentPage: "dashboard" });
    }
  }
// Function to change the current page based on user interaction
  setPage = (page) => {
    this.setState({ currentPage: page });
  }

  handleRegistration = (userData) => {
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage for persistence
    this.setState({ isLoggedIn: true, user: userData, currentPage: "dashboard" }); // Update state to reflect that the user is now logged in and navigate to the dashboard
  }

  handleLogin = (department) => { // Handle user login by checking localStorage for user data and updating the state accordingly
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
    if (user) { // If user data exists, update the department and set the state to logged in
      user.department = department;
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({ isLoggedIn: true, user, currentPage: "dashboard" });
    }
  }

  handleLogout = () => { // Handle user logout by clearing localStorage and resetting the state
    localStorage.removeItem('user');
    this.setState({ isLoggedIn: false, user: null, currentPage: "landing" });
  }

  render() { // extract state values for use in rendering the component
    const { currentPage, name, isLoggedIn, user } = this.state;

    return (
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">{name}</div>
          <div className="navbar-buttons">
            {!isLoggedIn ? ( 
              <>
                <button className="nav-btn" onClick={() => this.setPage("landing")}>Home</button>
                <button className="nav-btn" onClick={() => this.setPage("about")}>About</button>
                <button className="nav-btn" onClick={() => this.setPage("contact")}>Contact</button>
              </>
            ) : (
              <>
                <button className="nav-btn" onClick={() => this.setPage("dashboard")}>Dashboard</button>
                <button className="nav-btn logout-btn" onClick={this.handleLogout}>Logout</button>
              </>
            )}
          </div>
        </nav>
        <div className="content">
          {currentPage === "landing" && !isLoggedIn && (
            <Landing 
              onRegister={() => this.setPage("registration")}
              onLogin={() => this.setPage("login")}
            />
          )}
          {currentPage === "registration" && ( // Show the registration page only if the user is not logged in
            <Registration onRegister={this.handleRegistration} />
          )}
          {currentPage === "login" && ( // Show the login page only if the user is not logged in
            <Login onLogin={this.handleLogin} />
          )}
          {currentPage === "dashboard" && isLoggedIn && ( // Show the dashboard only if the user is logged in
            <Dashboard user={user} />
          )}
          {currentPage === "about" && ( // Show the about page content when the "About" button is clicked
            <div className="page-content">
              <h1>About Us</h1>
              <p>Learn more about {name} and our mission.</p>
              <p>Queue Seva is designed to make queue management efficient and seamless.</p>
            </div>
          )}
          {currentPage === "contact" && (
            <div className="page-content">
              <h1>Contact Us</h1>
              <p>Get in touch with us for any inquiries.</p>
              <p>Email: info@queueseva.com</p>
              <p>Phone: +1-800-123-4567</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;


/* NOTES: 
Manages navigation using state (currentPage)
Stores user login data in localStorage
Implements login, registration, logout
Uses conditional rendering instead of routing
Passes data/functions to child components via props
*/
