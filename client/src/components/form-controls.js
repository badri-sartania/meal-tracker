import React from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

import { Role } from "../config";

// see http://redux-form.com/6.4.3/examples/material-ui/
export const FormInput = ({
  meta: { touched, error } = {}, // eslint-disable-line react/prop-types
  input: { ...inputProps }, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export const FormDatePicker = ({
  meta: { touched, error } = {}, // eslint-disable-line react/prop-types
  input: { ...inputProps }, // eslint-disable-line react/prop-types
  ...props
}) => {
  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      {...inputProps}
      {...props}
      fullWidth
      type="date"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

export const FormTimePicker = ({
  meta: { touched, error } = {}, // eslint-disable-line react/prop-types
  input: { ...inputProps }, // eslint-disable-line react/prop-types
  ...props
}) => {
  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      {...inputProps}
      {...props}
      fullWidth
      type="time"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

export const FormRoleSelect = ({
  meta: { touched, error } = {}, // eslint-disable-line react/prop-types
  input: { ...inputProps }, // eslint-disable-line react/prop-types
  ...props
}) => (
  <FormControl error={!!(touched && error)} {...props} fullWidth>
    <InputLabel htmlFor="role-helper">Role</InputLabel>
    <Select {...inputProps} input={<Input name="role" id="role-helper" />}>
      <MenuItem value={Role.Admin}>Admin</MenuItem>
      <MenuItem value={Role.Manager}>User Manager</MenuItem>
      <MenuItem value={Role.User}>User</MenuItem>
    </Select>
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);
