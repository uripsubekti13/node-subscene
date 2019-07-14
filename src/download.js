const { getHtml } = require("./util");
const cheerio = require("cheerio-without-node-native");
const config = require("./config");

async function getDownloadLink(url) {
  const html = await getHtml(url);
  const $ = cheerio.load(html);
  return config.baseUrl + $(".download > a").attr("href");
}

// getDownloadLink('https://subscene.com/subtitles/spider-man-homecoming/albanian/1667801').then(console.log)
module.exports = {
  getDownloadLink
};
