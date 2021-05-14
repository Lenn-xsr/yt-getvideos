const { loadElements, formatString } = require("../utils");

/*
 * List the last 30 videos of a channel
 *
 * @param {String} channelName
 * @param {Boolean} onlyIds - shows only the ids of the videos in the return (optional)
 * @param {Boolean} getLives (optional)
 * @return {Array} or {Object} in case of error
 */

module.exports = (channelName, onlyIds = false, getLive = false) => {
  // Getting all the code returned from youtube
  const htmlText = loadElements(
    getLive
      ? `https://www.youtube.com/user/${channelName}/videos?view=2&live_view=502`
      : `https://www.youtube.com/c/${channelName}/videos?view=57`
  );
  const htmlMatch = htmlText.match(/video(.*?)>/g);

  if (!htmlMatch) return { error: "Channel name is invalid." };

  // Making an id list of all videos
  const list = [...htmlMatch[0].matchAll('"videoId\\":\\"(.*?)"')];

  // Cleaning the object to take out repeated items
  const toClean = [];
  list.forEach((r) => toClean.push(r[1]));
  const videosId = [...new Set(toClean)];

  // Getting all videos from the channel
  const allVideos = [
    ...htmlMatch[0].matchAll('{\\"gridVideoRenderer\\":(.*?)]}}}'),
  ];

  const toClean2 = [];
  allVideos.forEach((r) => toClean2.push(r[0] + "]}}"));

  const videos = [];

  // Separating the information that will be used later
  toClean2.forEach((r) => {
    const {
      title: {
        runs: [{ text }],
      },
      publishedTimeText: { simpleText: publishedTime },
      viewCountText: { simpleText: viewsCount },
      videoId,
      thumbnail: { thumbnails },
    } = JSON.parse(r).gridVideoRenderer;

    const video = {
      title: formatString(text),
      publishedTime,
      viewsCount,
      thumbnails,
      videoId,
    };

    videos.push(video);
  });

  return onlyIds ? videosId : videos;
};
