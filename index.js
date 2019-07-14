const { getPopular } = require("./src/popular");
const { search } = require("./src/search");
const { getDetail } = require("./src/detail");
const { getList } = require("./src/subtitle");
const { getDownloadLink } = require("./src/download");

module.exports = {
  getPopular,
  search,
  getDetail,
  getList,
  getDownloadLink
};
