import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const localStorageKey = 'videoplayer-current-time';
// Restore current playback position
const positionJSON = localStorage.getItem(localStorageKey);
if (positionJSON) {
  try {
    const position = JSON.parse(positionJSON);
    player.setCurrentTime(position.seconds);
  } catch (error) {
    console.error('Get state error: ', error.message);
    localStorage.removeItem(localStorageKey);
  }
}

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  throttle(function (currentPlaybackPosition) {
    console.log(currentPlaybackPosition);
    // Backup current playback position
    try {
      const positionJSON = JSON.stringify(currentPlaybackPosition);
      localStorage.setItem(localStorageKey, positionJSON);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, 1000)
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
