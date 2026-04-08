import React, { Component } from "react";
import "./Registration.css";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      phone: "",
      age: "",
      department: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, gender, phone, age, department } = this.state;
    if (name && gender && phone && age && department) {
      this.props.onRegister({ name, gender, phone, age, department });
    } else {
      alert("Please fill in all fields");
    }
  }

  render() {
    const { name, gender, phone, age, department } = this.state;

    return (
      <div className="registration-container">
        <div className="registration-content">
          <h2>User Registration</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select name="gender" value={gender} onChange={this.handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={this.handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={this.handleChange}
                min="1"
                max="120"
                placeholder="Enter your age"
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
            <button type="submit" className="form-submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;