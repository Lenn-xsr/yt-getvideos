const { fetch } = require('../utils');

async function channelVideos(channelVideosURL) {
  if (!channelVideosURL.match(/videos|channel|\/c\//g))
    return console.error(
      "[YT-GETVIDEOS]\x1b[31m Invalid url, try to copy the link to the channel 'videos' page \x1b[0m"
    );

  const html = await fetch(channelVideosURL);
  const match = html.match(/var ytInitialData = (.*)]}}};/)?.[1];

  if (!match) return [];

  const parsedMatch = JSON.parse(match + ']}}}');
  const videosTab =
    parsedMatch.contents.twoColumnBrowseResultsRenderer.tabs.find(tab =>
      tab?.tabRenderer?.title?.match(/vídeos|videos/i)
    );

  const videos = videosTab.tabRenderer.content.richGridRenderer.contents;

  const results = [];

  try {
    for (const data of videos) {
      const video = data?.richItemRenderer?.content?.videoRenderer;

      if (!video) continue;

      results.push({
        title: video.title.runs[0].text,
        id: video.videoId,
        publishedAt: video.publishedTimeText?.simpleText || '',
        views: video.shortViewCountText.simpleText || '',
        thumbnails: video.thumbnail.thumbnails
      });
    }
  } catch (err) {
    console.log(err);
  }

  return results;
}

module.exports = channelVideos;
