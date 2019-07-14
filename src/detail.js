const config = require("./config");
const request = require("request");
const { getJSON, getHtml } = require("./util");
const cheerio = require("cheerio-without-node-native");

async function getDetail(url) {
  const html = await getHtml(url);
  const $ = cheerio.load(html);
  const imdbUrl = $(".imdb").attr("href");
  const poster = $(".poster > img").attr("src");
  const title = removeUnwantedStringFromTitle($(".header > h2").text());
  let imdbData = undefined;
  if (imdbUrl) {
    const imdbId = imdbUrl.split("/").reverse()[0];
    imdbData = await getImdbData(imdbId);
  }
  return { poster, title, imdbUrl, imdbData };
}

async function getImdbData(imdbId) {
  if (!imdbId) {
    throw new Error("imdbId wajib di isi");
  }

  let imdbData = null;

  const imdb = imdbId.includes("tt") ? imdbId : `tt${imdbId}`;
  const url = `https://api.themoviedb.org/3/find/${imdb}?api_key=${
    config.tmdbApiKey
  }&language=en-US&external_source=imdb_id`;
  const response = await getJSON(url);

  for (key in response) {
    if (response[key].length > 0) imdbData = response[key][0];
  }

  if (!imdbData) return null;
  if (imdbData.backdrop_path) imdbData.backdrop_path = `http://image.tmdb.org/t/p/w780${imdbData.backdrop_path}`;
  if (imdbData.poster_path) imdbData.poster_path = `http://image.tmdb.org/t/p/w185${imdbData.poster_path}`;
  return imdbData;
}

function removeUnwantedStringFromTitle(title) {
  return title
    .replace("\n                    ", "")
    .replace("\n                        Imdb", "")
    .replace("\n                    Flag\n\n                ", "");
}

// getImdbData(`tt2274648`).then(console.log);
// getDetail(`https://subscene.com/subtitles/alita-battle-angel`).then(console.log);

module.exports = { getDetail };
