const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
// audio element id
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play");
const backBtn = document.getElementById("prev");
const forwBtn = document.getElementById("next");
const currentTimeL = document.getElementById("current-time");
const durationTimeR = document.getElementById("duration");
//  music array
const song = [
  {
    name: "jacinto-1",
    displayName: "Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Design",
  },
  {
    name: "jacinto-3",
    displayName: "Song-3",
    artist: "One-direction",
  },
  {
    name: "metric-1",
    displayName: "Song-4",
    artist: "jain-malik",
  },
];
// checking
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}
// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

//  load song fun
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
// current song
let songIndex = 0;

// next song
function nextSong() {
  songIndex++;
  if (songIndex > song.length - 1) {
    songIndex = 0;
  }
  loadSong(song[songIndex]);

  playSong();
}

// previous
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = song.length - 1;
  }
  loadSong(song[songIndex]);
  playSong();
}

// on load-select first song when we hit first time play button
loadSong(song[songIndex]);

// update progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    //destructuring
    // const { duration, currentTime } = e.srcElement;

    // this elemnet is used to pull variable from src element
    const duration = this.duration;
    const currentTime = this.currentTime;

    //  creating dynamic width for progress bar
    //  we get the unit of time in sec in interger

    const progressPercent = (currentTime / duration) * 100;
    // updating progress bar width dynamicaly
    progress.style.width = `${progressPercent}%`;

    //calculate display for duration

    // it contain float so we will use math floor function
    const durationMinutes = Math.floor(duration / 60);

    //  we are using let duration second we will modify it
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    //  to avoid NaN
    if (durationSecond) {
      durationTimeR.textContent = `${durationMinutes}:${durationSecond}`;
    }

    //calculate display for current time

    // it contain float so we will use math floor function
    const currentMinutes = Math.floor(currentTime / 60);

    //  we are using let current second we will modify it
    let currentSecond = Math.floor(currentTime % 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    //  to avoid NaN
    if (currentSecond) {
      currentTimeL.textContent = `${currentMinutes}:${currentSecond}`;
    }
  }
}

// set progressbar on random clicking at progess bar
function setprogressBar(e) {
  // total width
  const width = this.clientWidth;
  // width when we click to bar
  const clickX = e.offsetX;
  // destructring for click we donot look at src only for timeupdate in this project
  const { duration } = music;
  // current time is used to change the plackback time of audio directly
  music.currentTime = (clickX / width) * duration;
  progress.style.width = `${(music.currentTime / duration) * 100}%`;
  if (isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
}

// event Listner
// play or pause event listner
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
backBtn.addEventListener("click", prevSong);
forwBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setprogressBar);
music.addEventListener("ended", nextSong);
