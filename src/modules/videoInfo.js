const { loadElements, formatString } = require("../utils");

/*
 * Getting video info
 *
 * @param {String} video hash id
 * @return {Object}
 */

// This code follows the same logic as 'ChannelVideos'

module.exports = (hash_id) => {
  if (!hash_id || hash_id == "")
    return console.error("[YT-GETVIDEOS]\x1b[31m Invalid hash id \x1b[0m");

  const htmlText = loadElements(`https://www.youtube.com/watch?v=${hash_id}`);
  const htmlMatch = [
    ...htmlText.matchAll(/{"playerMicroformatRenderer":(.*?)}}/g),
  ];

  const parsed = JSON.parse(htmlMatch[0][1] + "}");
  let video = null;

  if (parsed) {
    const {
      title: { simpleText: title },
      thumbnail: { thumbnails },
      embed,
      ownerProfileUrl: url,
      viewCount,
      category,
      publishDate,
      ownerChannelName: name,
      externalChannelId: id,
      uploadDate,
    } = parsed;

    video = {
      title: formatString(title),
      thumbnails,
      viewCount,
      publishDate,
      uploadDate,
      category,
      channel: {
        name,
        id,
        url,
      },
      embed,
    };

    if (parsed.description) {
      video.description = parsed.description.simpleText;
    }
  }

  return video ? video : { error: "No results" };
};
