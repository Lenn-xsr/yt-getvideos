const router = require('express').Router(),
      XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.get('/', (req, res) => {
  
const channelVideos = (playlistId) => {
  const loadElements = (url) => {
    const xhr = new XMLHttpRequest();
    try{
      xhr.open("GET", url, false);
      xhr.send(null);
    }catch(error){
      console.log(error)
    }
    return xhr.responseText;
  }

  const toClean = []
  const htmlText = loadElements(`https://www.youtube.com/playlist?list=${playlistId}&index=1`)
  const htmlMatch = htmlText.match(/video(.*?)>/g)
  const list = [...htmlMatch[0].matchAll('\"videoId\\\":\\\"(.*?)\"')]

  list.forEach(r => toClean.push(r[1]))

  const videosIdList = [...new Set(toClean)]

  const title = [...htmlMatch[0].matchAll('{\\\"text\\\":\\\"(.*?)\\\"}')][0][1]
  const videoId = videosIdList[0]
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  
  const toClean2 = []
  const allVideos = [...htmlMatch[0].matchAll('{\\\"playlistVideoRenderer\\\":(.*?)]}}}')]
  
  allVideos.forEach(r => toClean2.push(r[0]+']}}'))
  
  const channelVideos = []
  toClean2.forEach(r => {
    const {
      title: {
        runs: [
          { text }
        ]
      },
      lengthText: {
        simpleText
      },
      videoId,
      thumbnail: {
        thumbnails
      }
    } = JSON.parse(r).playlistVideoRenderer
    const video = {
      title: text,
      duration: simpleText,
      videoId
    }
    if (req.query.reduce == 'false' || !req.query.reduce) {
      video.thumbnails = thumbnails
    }
    else {
      video.thumbnail = thumbnails[3].url
    }
    channelVideos.push(
      video
    )
  })
  
  return toClean2[0] ? {
    channelInfo: {
      name: JSON.parse(toClean2[0]).playlistVideoRenderer.shortBylineText.runs[0].text,
      baseUrl: JSON.parse(toClean2[0]).playlistVideoRenderer.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl
    },
    lastVideo: {
      title,
      videoId,
      thumbnail
    },
    channelVideos
  } : {'error': 'Playlist id is invalid.' }
}

if(!req.query.list)
  return res.status(400).json({ 'error': 'Insert the playlist id.'})
  
res.json(channelVideos(req.query.list))
})

module.exports = router;