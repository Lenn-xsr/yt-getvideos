const https = require("https");

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    const request = https.request(url, (response) => {
      let text = "";

      response.setEncoding("utf-8");

      response.on("data", (data) => (text += data));
      response.on("end", () => resolve(text));
    });

    request.on("error", (error) => reject(error));
    request.end();
  });
};

const formatString = (str) => {
  return str.replace(/\\u([\d\w]{4})/gi, (match, grp) =>
    String.fromCharCode(parseInt(grp, 16))
  );
};

module.exports = { fetch, formatString };
