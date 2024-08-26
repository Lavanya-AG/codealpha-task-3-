const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const progressBall = document.querySelector('.progress-ball');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlist = document.getElementById('playlist');
const playlistItems = document.querySelectorAll('#playlist li');

const songs = [
    {title: 'Believer', artist: 'Imagine Dragons', src: 'audio1.mp3'},
    {title: 'Unstoppable', artist: 'Sia', src: 'audio2.mp3'},
    {title: 'Life goes on', artist: ' BTS', src: 'audio3.mp3'},
    {title: 'Lover', artist: ' Taylor Swift', src: 'audio4.mp3'},
];
let currentSongIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    updateActivePlaylistItem();
}

function playSong() {
    audio.play();
    playBtn.innerText='PAUSE';
}

function pauseSong() {
    audio.pause();
    playBtn.innerText='PLAY';
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    progressBall.style.left = `${progressPercent}%`;

    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = duration ? formatTime(duration) : '0:00';
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function updateActivePlaylistItem() {
    playlistItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

playlistItems.forEach((item) => {
    item.addEventListener('click', () => {
        currentSongIndex = parseInt(item.getAttribute('data-index'));
        loadSong(songs[currentSongIndex]);
        playSong();
    });
});

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.innerText==='PAUSE';
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);

// Initial load
loadSong(songs[currentSongIndex]);