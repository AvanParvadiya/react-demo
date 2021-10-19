import React from "react";
// import Table from 'react-bootstrap/Table'
import Table from 'react-bootstrap/Table'
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeData: "",
    };
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
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
              <td>564896464</td>
            </tr>
          </tbody>
        </Table>
      </div>
      </>
    );
  }
}
