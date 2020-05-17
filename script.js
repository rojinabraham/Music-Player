const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ["hey", "summer", "ukulele"];

//keep track of song
let songIndex = 1; //3songs

//initially load song details to DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  const isPlay = musicContainer.classList.contains("play");
  if (isPlay) {
    playSong();
  } else {
    pauseSong();
  }
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  const isPlay = musicContainer.classList.contains("play");
  if (isPlay) {
    playSong();
  } else {
    pauseSong();
  }
}

function progressSong(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
playBtn.addEventListener("click", () => {
  const isPlay = musicContainer.classList.contains("play");
  if (isPlay) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//progress/ song update
audio.addEventListener("timeupdate", progressSong);

//click on progress

progressContainer.addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", nextSong);
