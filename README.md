# YT-VIDEOS-API
This Open-Source API provides the free list of videos of a channel.


### URL base: https://yt-videos-api.glitch.me/



> Available endpoints:

|  EndPoint        | Description |
| ---------------  |:-------------:|
| /                | Displays all information |




> Available parameters:

|  Parameter      | Description |
| --------------- |:-------------:|
| list=            | Receives the channel list id to be displayed ( required ) |
| reduce=         | Receives < **true** *or* **false** ( not required )>; Reduces the amount of information received |


Obs.: 
- The api is recursive, so you can pass more than one parameter in the endpoint



# How to get a playlist id

- Go to the desired channel and then to the VIDEOS tab, after that leave the filter in UPLOADS and click on play all.

<img src="https://i.imgur.com/qSBz80c.png?1">

- After that just get the list id in the link that you were redirected, example:

- https://www.youtube.com/playlist?list=**UU4BRTvhKkBADF23Az5AQgi**&playnext=1&index=1
- The link id is: **UU4BRTvhKkBADF23Az5AQgi**



# Examples of requests using Axios

```js
const axios = require('axios')

// Getting the last video from the channel

axios.get('https://yt-videos-api.glitch.me/?list={CHANNEL_VIDEO_LIST_ID}')
.then(function (response) {
  console.log(response.data.lastVideo);
})


// Doing a search for videos using a keyword

axios.get('https://yt-videos-api.glitch.me/?list={CHANNEL_VIDEO_LIST_ID}&reduce=true')
.then(function (response) {
  console.log(
    response.data.channelVideos.filter(video => {
      video.title.toLowerCase().includes('keyword')
    })
  )
})

```
