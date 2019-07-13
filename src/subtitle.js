const { getHtml, getHtmlFromSearch } = require("./html");
const cheerio = require("cheerio-without-node-native");
const config = require("./config");

async function getList(url) {
  const html = await getHtml(url);
  const $ = cheerio.load(html);
  const titles = [];
  const urls = [];
  const languages = [];
  $("tr > td.a1 > a").each((i, e) => {
    const aText = $(e)
      .text()
      .split("\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t");
    urls.push($(e).attr("href"));
    titles.push(aText[1].replace(" \n\t\t\t\t\t\n\t\t\t\t", ""));
    languages.push(aText[0].replace("\n\t\t\t\t\t\n\t\t\t\t\t\t", ""));
  });
  const result = titles.map((title, index) => {
    return {
      title,
      url: config.baseUrl + urls[index],
      language: languages[index]
    };
  });
  return result;
}

// getList("https://subscene.com/subtitles/spider-man-homecoming").then(console.log);
module.exports = { getList };
