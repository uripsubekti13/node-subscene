const cheerio = require("cheerio-without-node-native");
const _ = require("lodash");
const { getHtmlFromSearch } = require("./util");
const config = require("./config");

async function search(query) {
  const html = await getHtmlFromSearch(query);
  const $ = cheerio.load(html);
  const titles = [];
  const urls = [];
  const counts = [];
  $("ul > li > .title > a").each((i, e) => {
    titles.push($(e).text());
    urls.push($(e).attr("href"));
  });
  $("ul > li > .count").each((i, e) => {
    counts.push(removeUnwantedString($(e).text()));
  });
  const result = titles.map((title, index) => {
    return {
      title,
      url: config.baseUrl + urls[index],
      count: counts[index]
    };
  });
  return _.uniqBy(result, "url");
}

function removeUnwantedString(string) {
  return string.replace("\n\n\t\t", "").replace("\n\t", "");
}

module.exports = { search };
