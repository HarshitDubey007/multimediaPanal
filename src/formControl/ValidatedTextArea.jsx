import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function ValidatedTextArea({ label, value, onChange, onBlur, error, helperText, validate, ...props }) {
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
      style={{ margin: '10px' }}
      multiline
      rows={4} // Set the number of rows you want for the TextArea
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!isValid || error}
      helperText={!isValid ? 'Invalid input' : helperText}
      {...props}
    />
  );
}

ValidatedTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  validate: PropTypes.func,
};

export default ValidatedTextArea;
