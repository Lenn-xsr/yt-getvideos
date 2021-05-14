const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const loadElements = (url) => {
  const xhr = new XMLHttpRequest();
  try {
    xhr.open("GET", url, false);
    xhr.send(null);
  } catch (error) {
    console.log(error);
  }
  return xhr.responseText;
};

const formatString = (str) => {
  return str.replace(/\\u([\d\w]{4})/gi, (match, grp) =>
    String.fromCharCode(parseInt(grp, 16))
  );
};

module.exports = { formatString, loadElements };
