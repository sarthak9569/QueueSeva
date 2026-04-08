import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "", // phone or name to identify user
      department: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { identifier, department } = this.state;
    if (identifier && department) {
      // Check if user exists
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && (user.phone === identifier || user.name === identifier)) {
        this.props.onLogin(department);
      } else {
        alert("User not found. Please register first.");
      }
    } else {
      alert("Please fill in all fields");
    }
  }

  render() {
    const { identifier, department } = this.state;

    return (
      <div className="login-container">
        <div className="login-content">
          <h2>User Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Phone Number or Name:</label>
              <input
                type="text"
                name="identifier"
                value={identifier}
                onChange={this.handleChange}
                placeholder="Enter your phone number or name"
                required
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <select name="department" value={department} onChange={this.handleChange} required>
                <option value="">Select Department</option>
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <button type="submit" className="form-submit">Login</button>
          </form>
          <div className="login-hint">
            <p>Don't have an account? Register first to get started.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;