import React from "react";

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
    };
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }
  validateEmail(email) {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateFields(fields) {
    return fields.length === 0 ? true : false;
  }
  firstNameChange(e) {
    const firstName = e.target.value;
    const validateFirstName = this.validateFields(firstName);

    this.setState({
      firstName: e.target.value,
      firstNameValid: validateFirstName,
    });
  }
  lastNameChange(e) {
    console.log(e.target.value);
    const lastName = e.target.value;
    const validateLastName = this.validateFields(lastName);

    this.setState({
      lastName: e.target.value,
      lastNameValid: validateLastName,
    });
  }
  emailChange(e) {
    const email = e.target.value;
    const emailValid = this.validateEmail(email);

    this.setState({
      email: e.target.value,
      emailValid: emailValid,
    });
  }
  passwordChange(e) {
    const password = e.target.value;
    const passwordValid = this.validateFields(password);

    this.setState({
      password: e.target.value,
      passwordValid: passwordValid,
    });
  }
  onSubmitForm(e){
      e.preventDefault();
  }
  render() {
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
          {!this.state.emailValid && (
            <label className="error">Please enter password</label>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmitForm}>
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <span href="#">sign in?</span>
        </p>
      </form>
    );
  }
}
