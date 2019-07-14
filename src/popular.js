const cheerio = require("cheerio-without-node-native");
const { getHtml, getHtmlFromSearch } = require("./util");
const config = require("./config");

async function getPopular() {
  try {
    const html = await getHtml(config.baseUrl);
    const $ = cheerio.load(html);
    const popular = await getFilmFromBox(".popular-films", $);
    return popular;
  } catch (error) {
    throw error;
  }
}

async function getFilmFromBox(querySelector, $) {
  try {
    const titles = [];
    const urls = [];
    const imdbUrls = [];
    const posters = [];
    $(querySelector)
      .find(".poster > img")
      .each((i, e1) => {
        posters.push($(e1).attr("src"));
      });
    $(querySelector)
      .find(".title > a")
      .each((i, e1) => {
        if (
          !$(e1)
            .text()
            .toLowerCase()
            .includes("imdb")
        ) {
          titles.push($(e1).text());
          urls.push($(e1).attr("href"));
        } else imdbUrls.push($(e1).attr("href"));
      });
    const result = titles.map((title, index) => {
      return {
        title,
        url: `${config.baseUrl}${urls[index]}`,
        poster: posters[index],
        imdbUrl: imdbUrls[index]
      };
    });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getPopular };
