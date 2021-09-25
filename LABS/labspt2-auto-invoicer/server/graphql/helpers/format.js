const formatData = document => {
  Object.keys(document).forEach(key => {
    if (typeof document[key] === 'string') {
      document[key] = document[key].toLowerCase();
    }
  });
  if (document.phoneNumber) {
    const regx = /\D+/g;
    document.phoneNumber = document.phoneNumber.replace(regx, '');
  }
  return document;
};

module.exports = {
  formatData
};
