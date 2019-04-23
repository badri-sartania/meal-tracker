import React from "react";

const defaultValue = {
  title: "",
  rows: [],
  data: [],
  filter: null,
  hasEdit: false,
  hasDelete: false
};

export const DataTableContext = React.createContext(defaultValue);
