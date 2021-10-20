import React from "react";
import { Redirect } from "react-router";
import API from "../API/API";
export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      passwordValid: true,
      disableSubmit: true,
      redirect: false,
    };
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  validateEmail(email) {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateFields(fields) {
    return fields.length !== 0 ? true : false;
  }
  submitEnable() {
    if (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.email.length > 0 &&
      this.validateEmail(this.state.email) &&
      this.state.password.length > 0
    ) {
      this.setState({ disableSubmit: false });
    } else {
      this.setState({ disableSubmit: true });
    }
  }
  firstNameChange(e) {
    const firstName = e.target.value;
    const validateFirstName = this.validateFields(firstName);
    this.setState({
      firstName: e.target.value,
      firstNameValid: validateFirstName,
    });
    this.submitEnable();
  }
  lastNameChange(e) {
    const lastName = e.target.value;
    const validateLastName = this.validateFields(lastName);

    this.setState({
      lastName: e.target.value,
      lastNameValid: validateLastName,
    });
    this.submitEnable();
  }
  emailChange(e) {
    const email = e.target.value;
    const emailValid = this.validateEmail(email);

    this.setState({
      email: e.target.value,
      emailValid: emailValid,
    });
    this.submitEnable();
  }
  passwordChange(e) {
    const password = e.target.value;
    const passwordValid = this.validateFields(password);

    this.setState({
      password: e.target.value,
      passwordValid: passwordValid,
    });
    this.submitEnable();
  }
  onSubmitForm(e) {
    e.preventDefault();
    const userData = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };
    fetch(API.API_URL + API.ADD_USER, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ redirect: true }));
  }
  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/sign-in" />;
    return (
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            onChange={this.firstNameChange}
            className="form-control"
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          {!this.state.firstNameValid && (
            <label className="error">Please enter first name</label>
          )}
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={this.lastNameChange}
          />
        </div>

        <div className="form-group">
          {!this.state.lastNameValid && (
            <label className="error">Please enter Last name</label>
          )}
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={this.emailChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          {!this.state.emailValid && (
            <label className="error">Please enter email</label>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={this.passwordChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          {!this.state.passwordValid && (
            <label className="error">Please enter password</label>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          disabled={this.state.disableSubmit}
          onClick={this.onSubmitForm}
        >
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <span href="#">sign in?</span>
        </p>
      </form>
    );
  }
}
