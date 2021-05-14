const { loadElements, formatString } = require("../utils");

/*
 * Searching for videos
 *
 * @param {String} Query
 * @return {Array} or {Object} in case of error
 */

// This code follows the same logic as 'ChannelVideos'

module.exports = (query) => {
  if (!query || query == "") return { error: "Invalid query" };

  const htmlText = loadElements(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
  );
  const htmlMatch = [...htmlText.matchAll(/{"videoRenderer":(.*?)}]}}}]}}/g)];

  const toClean = [];
  htmlMatch.forEach((r) => toClean.push(r[0]));

  const videos = [];

  toClean.forEach((item) => {
    const parsed = JSON.parse(item).videoRenderer;

    if (parsed && parsed.lengthText) {
      const {
        videoId,
        title: {
          runs: [{ text: title }],
        },
        thumbnail: { thumbnails },
        shortViewCountText: { simpleText: views },
        publishedTimeText: { simpleText: publishedTime },
        lengthText: { simpleText: videoTime },
      } = parsed;

      let video = {
        videoId,
        title: formatString(title),
        thumbnails,
        views,
        publishedTime,
        videoTime,
      };

      if (parsed.descriptionSnippet)
        video.shortDescription = parsed.descriptionSnippet.runs[0].text;

      if (parsed.channelThumbnailSupportedRenderers) {
        video.channel = {
          name: parsed.ownerText.runs[0].text,
          thumbnails:
            parsed.channelThumbnailSupportedRenderers
              .channelThumbnailWithLinkRenderer.thumbnail.thumbnails,
        };
      }
      videos.push(video);
    }
  });

  return videos[0] ? videos : { error: "No search results" };
};
