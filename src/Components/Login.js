import React from "react";
import API from "../API/API";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passsword: "",
      emailError: true,
      passswordError: true,
      disableSubmit: true,
      userCredencials:{}
    };
    this.passswordChange = this.passswordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  submitEnable() {
    if (
      this.validateEmail(this.state.email) &&
      this.validatePassword(this.state.passsword)
    ) {
      this.setState({ disableSubmit: false });
    }
  }
  validateEmail(email) {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validatePassword(password) {
    return password.length === 0 ? false : true;
  }
  emailChange(e) {
    const email = e.target.value;
    const emailValid = this.validateEmail(email);

    this.setState({
      email: e.target.value,
      emailError: emailValid,
    });
    this.submitEnable();
  }
  passswordChange(e) {
    const passsword = e.target.value;
    const passswordValid = this.validatePassword(passsword);
    this.setState({
      passsword: e.target.value,
      passswordError: passswordValid,
    });
    this.submitEnable();
  }
  onSubmitForm(e) {
    e.preventDefault();
    // console.log(this.state.passsword)
    const userData = {
      email: this.state.email,
      password: this.state.passsword,
    };
    console.log(userData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    fetch(API.API_URL + API.LOG_IN, requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.parentCallback(data));
    // this.props.parentCallback(this.state.email, this.state.passsword);
  }
  render() {
    return (
      <form>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.emailChange}
          />
        </div>
        <div className="form-group">
          {!this.state.emailError && (
            <label className="error">Please enter email address</label>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.passswordChange}
          />
        </div>

        <div className="form-group">
          {!this.state.passswordError && (
            <label className="error">Please enter password</label>
          )}
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={this.onSubmitForm}
          disabled={this.state.disableSubmit}
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <span href="#">password?</span>
        </p>
      </form>
    );
  }
}
