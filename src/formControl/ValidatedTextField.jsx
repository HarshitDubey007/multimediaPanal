import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

function ValidatedTextField({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  validate,
  fullWidth,
  ...props
}) {
  const [isValid, setIsValid] = React.useState(true);


  const handleValidation = (inputValue) => {
    if (validate) {
      setIsValid(validate(inputValue));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    handleValidation(inputValue);

    if (onChange) {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <TextField
      style={{ margin: "10px" }}
      fullWidth={fullWidth ? fullWidth : false}
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!isValid || error}
      helperText={!isValid ? "Invalid input" : helperText}
      {...props}
    />
  );
}

ValidatedTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  validate: PropTypes.func,
};

export default ValidatedTextField;
