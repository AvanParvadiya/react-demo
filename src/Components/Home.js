import React from "react";
import Table from "react-bootstrap/Table";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/api/demo/")
      .then((res) => res.json())
      .then((res) => this.setState({ usersData: res }));
      // this.setState({ usersData: res })
    // console.log( this.state.usersData);
  }
  render() {
    return (
      <>
        <div className="home">
          Hellow {this.props.email}
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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>564896464</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>564896464</td>
              </tr>
              {this.state.usersData.map((res) => (
                <tr key={res.id}>
                  <td>3</td>
                  <td >{res.firstname}</td>
                  <td>{res.firstname}</td>
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
