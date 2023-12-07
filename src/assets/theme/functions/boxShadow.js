 

/**
  The boxShadow() function helps you to create a box shadow for an element
 */

import pxToRem from "./pxToRem";
import rgba from "./rgba";

// Soft UI Dashboard React helper functions

function boxShadow(offset = [], radius = [], color, opacity, inset = "") {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;
