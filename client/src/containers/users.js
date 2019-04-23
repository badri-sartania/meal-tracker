import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteUser, deleteUsers } from "../actions/user";
import DataTable from "../components/data-table";
import PageLayout from "../components/page-layout";

const rows = [
  { id: "id", numeric: false, label: "Id" },
  { id: "fullname", numeric: false, label: "Full Name" },
  { id: "goal", numeric: true, label: "Calorie Goal" },
  { id: "email", numeric: false, label: "Email" },
  { id: "role", numeric: false, label: "Role" }
];

class Users extends Component {
  handleDeleteClick = (e, id) => {
    e.preventDefault();
    this.props.deleteUser(id);
  };

  handleMultiDeleteClick = (e, ids) => {
    e.preventDefault();
    this.props.deleteUsers(ids);
  };

  render() {
    const { users, isFetching } = this.props.userState;

    return (
      <>
        {!users && isFetching && (
          <PageLayout>
            <p>Loading users....</p>
          </PageLayout>
        )}
        {users && !isFetching && (
          <DataTable
            title="Users"
            rows={rows}
            data={users}
            onDeleteClick={this.handleDeleteClick}
            onMultiDeleteClick={this.handleMultiDeleteClick}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.user
});

export default connect(
  mapStateToProps,
  { deleteUser, deleteUsers }
)(Users);
