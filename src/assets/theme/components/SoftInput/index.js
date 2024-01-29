import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SoftInputWithIconRoot from "./SoftInputWithIconRoot";
import SoftInputIconBoxRoot from "./SoftInputIconBoxRoot";
import SoftInputIconRoot from "./SoftInputIconRoot";
import SoftInputRoot from "./SoftInputRoot";
import { useSoftUIController } from "../../../../context";

const SoftInput = forwardRef(({ size, icon, error, success, disabled, value, onChange, ...rest }, ref) => {
  const [inputValue, setInputValue] = useState(value || ''); // Use state to manage the input value

  useEffect(() => {
    // Update the internal state when the external value prop changes
    setInputValue(value || '');
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // Call the external onChange callback if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  let template;
  const [controller] = useSoftUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    template = (
      <SoftInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SoftInputIconBoxRoot ownerState={{ size }}>
          <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftInputIconRoot>
        </SoftInputIconBoxRoot>
        <SoftInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
          value={inputValue} // Use the internal state as the input value
          onChange={handleChange} // Pass the custom onChange handler
        />
      </SoftInputWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <SoftInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SoftInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
          value={inputValue} // Use the internal state as the input value
          onChange={handleChange} // Pass the custom onChange handler
        />
        <SoftInputIconBoxRoot ownerState={{ size }}>
          <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftInputIconRoot>
        </SoftInputIconBoxRoot>
      </SoftInputWithIconRoot>
    );
  } else {
    template = (
      <SoftInputRoot
        {...rest}
        ref={ref}
        ownerState={{ size, error, success, disabled }}
        value={inputValue} // Use the internal state as the input value
        onChange={handleChange} // Pass the custom onChange handler
      />
    );
  }

  return template;
});

// Setting default values for the props of SoftInput
SoftInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
  value: '', // Provide a default value prop
  onChange: undefined, // Provide a default onChange prop
};

// Typechecking props for the SoftInput
SoftInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string, // Adjust the prop type based on your use case
  onChange: PropTypes.func, // Adjust the prop type based on your use case
};

export default SoftInput;
