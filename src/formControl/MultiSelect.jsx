import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function MultiSelect(props) {
  const {
    size,
    options,
    label,
    placeholder,
    onChange,
    multiple,
    ...autocompleteProps
  } = props;

  return (
    <div style={{ margin: "10px" }}>
      <Autocomplete
        fullWidth
        id="size-small-outlined"
        size={size}
        options={options}
        onChange={onChange}
        multiple={multiple}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
        {...autocompleteProps}
      />
    </div>
  );
}

MultiSelect.propTypes = {
  size: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      // Add other properties as needed
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool, // Prop to control single or multi-select
};

// Additional validation for non-empty options array
MultiSelect.propTypes.options.validate = (options) => {
  if (options.length === 0) {
    return new Error("Options array must not be empty.");
  }
};

export default MultiSelect;
