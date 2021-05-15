[![npm](https://img.shields.io/npm/v/yt-getvideos.svg?maxAge=3600)](https://www.npmjs.com/package/yt-getvideos)
[![npm](https://img.shields.io/npm/dm/yt-getvideos.svg?maxAge=3600)](https://www.npmjs.com/package/yt-getvideos)
[![npm](https://img.shields.io/npm/l/yt-getvideos.svg?maxAge=3600)](https://www.npmjs.com/package/yt-getvideos)

# yt-getvideos

Simple and complete youtube search API

## Installation

```bash
npm install yt-getvideos
```

## Easy to use

#### Searching for videos

```javascript
/*
 * @param {String} Query
 * @return {Array} or {Object} in case of error
 */

const { search } = require("yt-getvideos");
var videos = search("Something you want to research");

console.log(videos);
```

###### output

```javascript
[
  {
    title: String,
    publishedTime: String,
    viewsCount: String,
    thumbnails: [ Object, ... ],
    videoId: String
  },
  ...
]
```

#### Channel videos

```javascript
/*
 * @param {String} channel videos link
 * @param {Boolean} only ids - shows only the ids of the videos in the return (optional)
 * @return {Array}
 */

const { channelVideos } = require("yt-getvideos");

/* 
  Examples of links that are accepted:
    - https://www.youtube.com/AngularFirebase/videos
    - https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA/videos
*/

// case 1
var videos = channelVideos("https://www.youtube.com/AngularFirebase/videos");

// case 2 ( only ids )
var videos = channelVideos(
  "https://www.youtube.com/AngularFirebase/videos",
  true
);

console.log(videos);
```

###### output

```javascript
// case 1
[
{
  title: String,
  publishedTime: String,
  viewsCount: String,
  thumbnails: [ Object, ... ],
  videoId: String
},
...
]
// case 2 ( only ids )
[String, String, ...]
```

#### Single video info

```javascript
/*
 * @param {String} video hash id
 * @return {Object}
 */

/* 
  Example:
    Link: https://www.youtube.com/watch?v=WBwfRBdaRiC
    The video hash id is `WBwfRBdaRiC`
*/

const { videoInfo } = require("yt-getvideos");
var video = videoInfo("VIDEO-HASH-ID");

console.log(video);
```

###### output

```javascript
{
  title: String,
  thumbnails: [ Object, ... ]
  ],
  viewCount: String,
  publishDate: String,
  uploadDate: String,
  category: String,
  channel: {
    name: String,
    id: String,
    url: String
  },
  embed: {
    iframeUrl: String,
    flashUrl: String,
    width: Number,
    height: Number,
    flashSecureUrl: String
  },
  description: String
}

```

## About

Simple functions to get video information, list videos from a channel and search.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
