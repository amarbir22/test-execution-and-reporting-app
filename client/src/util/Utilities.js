const helpers = {
  capitalize(str) {
    if (!str) {
      return str;
    }

    return str.substring(0, 1)
      .toUpperCase() + str.substring(1);
  }
};


export default helpers;
