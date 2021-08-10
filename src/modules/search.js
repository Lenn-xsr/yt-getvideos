const { fetch } = require("../utils");
const baseURL = "https://www.youtube.com";

async function search(query) {
  if (!query || query == "")
    return console.error("[YT-GETVIDEOS]\x1b[31m Invalid query \x1b[0m");

  const html = await fetch(
    baseURL + "/results?search_query=" + encodeURIComponent(query)
  );
  const match = html.match(/{"videoRenderer":(.+?)false}]}}/g);

  const results = [];

  try {
    for (const data of match) {
      const { videoRenderer: video } = JSON.parse(data);

      results.push({
        title: video.title.runs[0].text,
        id: video.videoId,
        description:
          video.detailedMetadataSnippets[0].snippetText.runs
            .map(({ text }) => text)
            .join("") || "",
        publishedAt: video.publishedTimeText?.simpleText || "",
        views: video.shortViewCountText.simpleText || "",
        thumbnails: video.thumbnail.thumbnails,
        channel: {
          name: video.ownerText.runs[0].text,
          thumbnails:
            video.channelThumbnailSupportedRenderers
              .channelThumbnailWithLinkRenderer.thumbnail.thumbnails,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }

  return results[0] ? results : { error: "No search results" };
}

module.exports = search;
