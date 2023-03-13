const { fetch } = require('../utils');
const baseURL = 'https://www.youtube.com';

async function search(query) {
  if (!query || query == '')
    return console.error('[YT-GETVIDEOS]\x1b[31m Invalid query \x1b[0m');

  const html = await fetch(
    baseURL + '/results?search_query=' + encodeURIComponent(query)
  );
  const match = html.match(/var ytInitialData = (.*);<\/script>/)?.[1];

  if (!match) return [];

  const parsedMatch = JSON.parse(match);

  const videos =
    parsedMatch.contents.twoColumnSearchResultsRenderer.primaryContents
      .sectionListRenderer.contents[0].itemSectionRenderer.contents;

  const results = [];

  try {
    for (const data of videos) {
      const video = data?.videoRenderer;

      if (!video) continue;

      results.push({
        title: video.title.runs[0].text,
        id: video.videoId,
        description:
          video.detailedMetadataSnippets[0].snippetText.runs
            .map(({ text }) => text)
            .join('') || '',
        publishedAt: video.publishedTimeText?.simpleText || '',
        views: video.shortViewCountText.simpleText || '',
        thumbnails: video.thumbnail.thumbnails,
        channel: {
          name: video.ownerText.runs[0].text,
          thumbnails:
            video.channelThumbnailSupportedRenderers
              .channelThumbnailWithLinkRenderer.thumbnail.thumbnails
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

  return results;
}

module.exports = search;
