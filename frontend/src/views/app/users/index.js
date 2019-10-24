import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";
import DataListView from "./DataListView";
import ListPageHeading from "./ListPageHeading";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      items: [],
    };
  };

  componentDidMount = async () => {
    this.dataListRender();
  };

  handleFirestoreInputChange = (value, currentUser) => {
    const items = this.state.items.map((user) => {
      if (user.id === currentUser.id) return { ...user, firestoreValue: value };
      else return { ...user };
    })
    this.setState({ items });
  };

  handleDatabaseInputChange = (value, currentUser) => {
    const items = this.state.items.map((user) => {
      if (user.id === currentUser.id) return { ...user, databaseValue: value };
      else return { ...user };
    })
    this.setState({ items });
  };

  sendFirestore = (user) => {
    console.log('Sending to Firestore...', user);
  };

  sendDatabase = (user) => {
    console.log('Sending to Database...', user);
  };

  dataListRender() {
    axios
      .get(
        `${process.env.REACT_APP_BASE_API}/v1/users/`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          items: data.rows,
          isLoading: true
        });
      });
  };

  render() {
    const {
      items,
    } = this.state;
    const { match } = this.props;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeading
              heading="menu.users"
              match={match}
            />
            <Row>
              {items && items.map(user => {
                return (
                  <DataListView
                    key={user.id}
                    user={user}
                    handleFirestoreInputChange={this.handleFirestoreInputChange}
                    handleDatabaseInputChange={this.handleDatabaseInputChange}
                    sendFirestore={this.sendFirestore}
                    sendDatabase={this.sendDatabase}
                  />
                );
              })}
            </Row>
          </div>
        </Fragment>
      );
  }
}

export default Users;
