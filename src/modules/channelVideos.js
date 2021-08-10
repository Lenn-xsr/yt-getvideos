const { fetch } = require("../utils");

async function channelVideos(channelVideosURL) {
  if (!channelVideosURL.match(/videos|channel|\/c\//g))
    return console.error(
      "[YT-GETVIDEOS]\x1b[31m Invalid url, try to copy the link to the channel 'videos' page \x1b[0m"
    );

  const html = await fetch(channelVideosURL);
  const match = html.match(/{"gridVideoRenderer":(.+?)]}}}]}}/g);
  const results = [];
  try {
    for (const data of match) {
      const { gridVideoRenderer: video } = JSON.parse(data);

      results.push({
        title: video.title.runs[0].text,
        id: video.videoId,
        publishedAt: video.publishedTimeText?.simpleText || "",
        views: video.shortViewCountText.simpleText || "",
        thumbnails: video.thumbnail.thumbnails,
      });
    }
  } catch (err) {
    console.log(err);
  }

  return results;
}

module.exports = channelVideos;
