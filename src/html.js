const request = require("request");
const config = require("./config");

async function getHtml(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

async function getHtmlFromSearch(query) {
  const url = `${config.baseUrl}/subtitles/searchbytitle`;
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  };
  return new Promise((resolve, reject) => {
    request.post(url, options, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

module.exports = { getHtml, getHtmlFromSearch };
