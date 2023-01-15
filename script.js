const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');

// Play & Pause

function showPlayIcon(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Pause');
    }else{
        video.pause();
        showPlayIcon();
    }
}
// Calculate display time format
function displayTime(time){
    const minutes  = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}
// Update Progress Bar as Video Plays
function udpateProgress(){
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)}/`;
    duration.textContent = `${displayTime(video.duration)}`;
}
// CLick to seek within the video
function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls
let lastVolume =1;

// Volume Bar
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if(volume<0.1){
        volume=0;

    }
    if(volume>0.9){
        volume =1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // Chnage icon depending on volume
    volumeIcon.className = '';
    if(volume > 0.7){
        volumeIcon.classList.add('fa-solid','fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }else if(volume < 0.7 && volume >0){
        volumeIcon.classList.add('fa-solid','fa-volume-down');
        volumeIcon.setAttribute('title', 'Mute');
    }else if(volume ===0){
        volumeIcon.classList.add('fa-solid','fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }
    lastVolume = volume;
}

// Mute / Unmute

function toggleMute(){
    volumeIcon.className = '';
    if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid','fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fa-solid','fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Speed
function changeSpeed(){
   video.playbackRate = speed.value; 
}

// Full Screen

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullScreen = false;

// Toggle Full Screen
function toggleFullScreen(){
    if(!fullScreen){
        openFullscreen(player);

    }else{
        closeFullscreen();
    }
    fullScreen = !fullScreen;
}
// Event Listeners
playBtn.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('ended',showPlayIcon);
video.addEventListener('timeupdate',udpateProgress);
video.addEventListener('canplay',udpateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click',toggleFullScreen);