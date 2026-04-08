import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
  render() {
    const { onRegister, onLogin } = this.props;

    return (
      <div className="landing-container">
        <div className="landing-content">
          <div className="landing-header">
            <h1>Queue Seva</h1>
            <p>Streamline Your Queue Management</p>
          </div>

          <div className="landing-description">
            <p>
              Welcome to Queue Seva, your efficient queue management system.
              Get started by creating an account or logging in.
            </p>
          </div>

          <div className="landing-buttons">
            <button className="btn btn-primary" onClick={onRegister}>
              Register Now
            </button>
            <button className="btn btn-secondary" onClick={onLogin}>
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
