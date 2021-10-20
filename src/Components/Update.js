import React from "react";
import API from "../API/API";

export default class Update extends React.Component {
  id;
  constructor(props) {
    super(props);
    const component = window.location.pathname;
    this.id = component.split("/")[2];
    this.state = {
      updateUserInfo: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        firstNameValid: true,
        lastNameValid: true,
        emailValid: true,
        passwordValid: true,
        disableSubmit: true,
      },
    };
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onupdateUser = this.onupdateUser.bind(this);
  }
  validateFields(fields) {
    return fields.length !== 0 ? true : false;
  }
  submitEnable() {
    if (
      this.state.updateUserInfo.firstname > 0 &&
      this.state.updateUserInfo.lastName.length > 0 &&
      this.state.updateUserInfo.email.length > 0 &&
      this.validateEmail(this.state.updateUserInfo.email) &&
      this.state.updateUserInfo.password.length > 0
    ) {
      this.setState({ disableSubmit: false });
    } else {
      this.setState({ disableSubmit: true });
    }
  }
  componentDidMount() {
    fetch(API.API_URL + API.GET_USER_WITH_ID + this.id)
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          updateUserInfo: {
            firstname: json.firstname,
            lastname: json.lastname,
            email: json.email,
            password: json.password,
          },
        })
      );
  }
  validateEmail(email) {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  firstNameChange(e) {
    console.log(this.state.updateUserInfo);
    const firstname = e.target.value;
    const validateFirstName = this.validateFields(firstname);
    this.setState({
      updateUserInfo: { firstname: e.target.value },
      firstNameValid: validateFirstName,
    });
    this.submitEnable();
  }
  lastNameChange(e) {
    const lastName = e.target.value;
    const validateLastName = this.validateFields(lastName);

    this.setState({
      updateUserInfo: { lastName: e.target.value },
      lastNameValid: validateLastName,
    });
    this.submitEnable();
  }
  emailChange(e) {
    const email = e.target.value;
    const emailValid = this.validateEmail(email);

    this.setState({
      updateUserInfo: { email: e.target.value },
      emailValid: emailValid,
    });
    this.submitEnable();
  }
  passwordChange(e) {
    const password = e.target.value;
    const passwordValid = this.validateFields(password);

    this.setState({
      updateUserInfo: { password: e.target.value },
      passwordValid: passwordValid,
    });
    this.submitEnable();
  }
  onupdateUser(e) {
    e.preventDefault();
    console.log(this.state.updateUserInfo);
  }
  render() {
    return (
      <>
        {console.log(this.state.updateUserInfo)}
        <form>
          <h3>Update info</h3>
          <div className="form-group">
            <label>firstName</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              defaultValue={this.state.updateUserInfo.firstname}
              onChange={this.firstNameChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              defaultValue={this.state.updateUserInfo.lastname}
              onChange={this.lastNameChange}
            />
          </div>

          <div className="form-group">
            <label>email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              defaultValue={this.state.updateUserInfo.email}
              onChange={this.emailChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              defaultValue={this.state.updateUserInfo.password}
              onChange={this.passwordChange}
            />
          </div>

          <div className="form-group mt-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onupdateUser}
            >
              Update
            </button>
          </div>
        </form>
      </>
    );
  }
}
