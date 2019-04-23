import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";

import { DataTableContext } from "./data-table-context";

const ITEM_HEIGHT = 48;

export class FilterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickHiddenFilter = id => e => {
    this.handleClose();

    const { filter } = this.context;
    filter.props.showFilter(id);
  };

  getHiddenFilterElements = () => {
    const { filter } = this.context;
    if (filter) {
      const filterElements = React.Children.toArray(filter.props.children);

      return filterElements.filter(
        filterElement =>
          !filter.props.displayedFilters[filterElement.props.name]
      );
    }
    return [];
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const hiddenFilterElements = this.getHiddenFilterElements();

    return (
      hiddenFilterElements.length > 0 && (
        <>
          <IconButton
            aria-label="Filter list"
            aria-owns={open ? "filter-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <FilterListIcon />
          </IconButton>

          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5
              }
            }}
          >
            {hiddenFilterElements.map(filterElement => (
              <MenuItem
                key={filterElement.props.name}
                onClick={this.handleClickHiddenFilter(filterElement.props.name)}
              >
                {filterElement.props.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )
    );
  }
}

FilterButton.contextType = DataTableContext;

export default FilterButton;
