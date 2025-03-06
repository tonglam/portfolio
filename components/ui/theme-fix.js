/**
 * This file contains a fix for the Framer Motion animation issue with dark mode
 *
 * The error "You are trying to animate dark from "0" to "[object Object]"" occurs
 * when Framer Motion tries to animate between incompatible values for the "dark" property.
 *
 * This utility helps prevent that error by ensuring proper animation values.
 */

// Apply this to any component that's experiencing the dark mode animation issue
export const fixDarkAnimation = (props) => {
  // If the component has a style prop with a dark property that's a number
  if (props.style && typeof props.style.dark === "number") {
    // Create a new style object without the dark property
    const { dark, ...restStyle } = props.style;
    return {
      ...props,
      style: restStyle,
    };
  }
  return props;
};

// Use this as a higher-order component for motion components with dark mode issues
export const withFixedDarkAnimation = (Component) => {
  return (props) => {
    const fixedProps = fixDarkAnimation(props);
    return <Component {...fixedProps} />;
  };
};
