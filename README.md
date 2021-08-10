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
const { search } = require("yt-getvideos");

search("Something you want to research").then((result) => {
  console.log(result);
});
```

#### Channel videos

```javascript
const { channelVideos } = require("yt-getvideos");

/* 
  Examples of links that are accepted:
    - https://www.youtube.com/AngularFirebase/videos
    - https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA/videos
*/

channelVideos("https://www.youtube.com/AngularFirebase/videos").then(
  (result) => {
    console.log(result);
  }
);
```

#### Single video info

```javascript
/* 
  Example:
    Link: https://www.youtube.com/watch?v=WBwfRBdaRiC
    The video hash id is `WBwfRBdaRiC`
*/

const { videoInfo } = require("yt-getvideos");

videoInfo("VIDEO-HASH-ID").then((result) => {
  console.log(result);
});
```

## About

Simple functions to get video information, list videos from a channel and search.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
