const { fetch, formatString } = require('../utils');
const baseURL = 'https://www.youtube.com';

async function videoInfo(videoId) {
  if (!videoId || videoId == '')
    return console.error('[YT-GETVIDEOS]\x1b[31m Invalid hash id \x1b[0m');

  const html = await fetch(`${baseURL}/watch?v=${videoId}`);
  const match = html.match(/{"playerMicroformatRenderer":(.+?)}}/g);

  let result = null;

  try {
    const { playerMicroformatRenderer: video } = JSON.parse(match[0]);

    result = {
      title: formatString(video.title.simpleText),
      description: video.description.simpleText,
      category: video.category,
      publishedAt: video?.publishDate || video?.uploadDate,
      views: video.viewCount || '',
      thumbnails: video.thumbnail.thumbnails,
      channel: {
        name: video.ownerChannelName,
        id: video.externalChannelId,
        url: video.ownerProfileUrl
      },
      embed: video.embed
    };
  } catch (err) {
    console.log(err);
  }

  return result;
}

module.exports = videoInfo;
