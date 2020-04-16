export const isHalfWidth = (str: string) => {
  if (str.match(/^[A-Za-z0-9]*$/)) return true;
  return false;
};

export const isMailAddress = (str: string) => {
  if (
    str.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return true;
  }
  return false;
};
