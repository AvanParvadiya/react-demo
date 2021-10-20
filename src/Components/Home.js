import React from "react";
import Table from "react-bootstrap/Table";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      filterData: [],
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:8080/api/demo/")
      .then((res) => res.json())
      .then((res) => this.setState({ usersData: res, filterData: res }));
  }
  search(e) {
    const filter = this.state.usersData.filter(
      (data) =>
        data.firstname.toUpperCase().includes(e.target.value.toUpperCase()) ||
        data.lastname.toUpperCase().includes(e.target.value.toUpperCase()) ||
        data.email.toUpperCase().includes(e.target.value.toUpperCase())
    );
    this.setState({ filterData: filter });
  }
  render() {
    return (
      <>
        <div className="home">
          <div className="search">
            <input type="text" onChange={this.search} placeholder="Search" />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filterData.length === 0 && (
                <tr>
                  <td colSpan="5">No records found</td>
                </tr>
              )}
              {this.state.filterData.map((res, index) => (
                <tr key={res.id}>
                  <td>{index + 1}</td>
                  <td>{res.firstname}</td>
                  <td>{res.lastname}</td>
                  <td>{res.email}</td>
                  <td>{res.password}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
