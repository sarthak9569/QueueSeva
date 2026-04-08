import React, { Component } from "react";
import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return <div>Please log in to view your dashboard.</div>;
    }

    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2>Dashboard</h2>
            <p className="dashboard-welcome">Welcome back, <strong>{user.name}</strong>!</p>
          </div>

          <div className="user-info">
            <div className="info-card">
              <strong>Full Name</strong>
              <p>{user.name}</p>
            </div>
            <div className="info-card">
              <strong>Gender</strong>
              <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
            </div>
            <div className="info-card">
              <strong>Phone Number</strong>
              <p>{user.phone}</p>
            </div>
            <div className="info-card">
              <strong>Age</strong>
              <p>{user.age} years</p>
            </div>
            <div className="info-card">
              <strong>Department</strong>
              <p>{user.department.toUpperCase()}</p>
            </div>
          </div>

          <div className="dashboard-section">
            <h4>Queue Services</h4>
            <p>
              Welcome to your Queue Seva dashboard! Here you can manage and track your queue requests for the <strong>{user.department.toUpperCase()}</strong> department. 
              Use the options below to access various queue-related services and manage your tasks efficiently.
            </p>
          </div>

          <div className="dashboard-section">
            <h4>Quick Actions</h4>
            <p>Click the buttons below to access common functions:</p>
            <div className="action-buttons">
              <button className="action-btn">Join Queue</button>
              <button className="action-btn">View Queue Status</button>
              <button className="action-btn secondary">My History</button>
              <button className="action-btn secondary">Settings</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;