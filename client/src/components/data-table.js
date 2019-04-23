import React, { Component } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { DataTableContext } from "./data-table-context";
import DataTableHead from "./data-table-head";
import DataTableToolbar from "./data-table-toolbar";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 600
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tableCellIcon: {
    width: 44
  }
});

class DataTable extends Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({ selected: this.props.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleEditClick = (event, id) => {
    this.props.history.push(this.props.match.path + "/" + id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleMultiDeleteClick = e => {
    const { onMultiDeleteClick } = this.props;
    const { selected } = this.state;

    onMultiDeleteClick && onMultiDeleteClick(e, selected);

    this.setState({
      selected: []
    });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {
      classes,
      title,
      rows,
      data,
      filter,
      hasEdit,
      hasDelete,
      onDeleteClick
    } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <DataTableContext.Provider
        value={{ title, rows, data, filter, hasEdit, hasDelete }}
      >
        <Paper className={classes.root}>
          <DataTableToolbar
            numSelected={selected.length}
            onMultiDeleteClick={this.handleMultiDeleteClick}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <DataTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={event => this.handleClick(event, n.id)}
                        >
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        {rows.map(row => (
                          <TableCell
                            key={`${n.id}_${row.id}`}
                            align={row.numeric ? "right" : "left"}
                            style={{ color: n.color || "black" }}
                          >
                            {n[row.id]}
                          </TableCell>
                        ))}
                        {hasEdit && (
                          <TableCell
                            padding="none"
                            className={classes.tableCellIcon}
                          >
                            <IconButton
                              aria-label="Edit"
                              color="primary"
                              onClick={e => this.handleEditClick(e, n.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        )}
                        {hasDelete && (
                          <TableCell
                            padding="checkbox"
                            className={classes.tableCellIcon}
                          >
                            <IconButton
                              aria-label="Delete"
                              color="secondary"
                              onClick={e =>
                                onDeleteClick && onDeleteClick(e, n.id)
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={rows.length + 3} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </DataTableContext.Provider>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filter: PropTypes.node,
  hasEdit: PropTypes.bool,
  hasDelete: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  onMultiDeleteClick: PropTypes.func
};

DataTable.defaultProps = {
  hasEdit: true,
  hasDelete: true
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(DataTable);
