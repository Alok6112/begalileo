export const getParamNavigationV5 = (props, paramName, defaultValue) => {
  if (props.route) {
    if (props.route.params) {
      return props?.route?.params[paramName] || defaultValue;
    }
    // React Navigation v5 or later
  }
  return null;
};
