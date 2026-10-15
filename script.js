// ===============================
// SONG LIST
// ===============================

const songs = [

    {
        title: "Dreams",
        artist: "Sample Artist",
        audio: "audio/song1.mp3",
        image: "images/song1.jpg"
    },

    {
        title: "Midnight",
        artist: "Sample Artist",
        audio: "audio/song2.mp3",
        image: "images/song2.jpg"
    },

    {
        title: "Sunset",
        artist: "Sample Artist",
        audio: "audio/song3.mp3",
        image: "images/song3.jpg"
    }

];


// ===============================
// VARIABLES
// ===============================

let currentSong = 0;

let isPlaying = false;


// ===============================
// AUDIO
// ===============================

const audio = new Audio();


// ===============================
// HTML ELEMENTS
// ===============================

const songTitle =
    document.getElementById("song-title");

const artistName =
    document.getElementById("artist-name");

const albumImage =
    document.getElementById("album-image");

const playButton =
    document.getElementById("play");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const progressBar =
    document.getElementById("progress-bar");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const volumeControl =
    document.getElementById("volume");


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    const song = songs[index];

    // Update title
    songTitle.textContent = song.title;

    // Update artist
    artistName.textContent = song.artist;

    // Update album image
    albumImage.src = song.image;

    // Update audio
    audio.src = song.audio;

    // Reset progress
    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    // Update active playlist item

    document
        .querySelectorAll(".song")
        .forEach(songElement => {

            songElement.classList.remove("active");

        });


    const activeSong =
        document.querySelector(
            `.song[data-index="${index}"]`
        );


    if (activeSong) {

        activeSong.classList.add("active");

    }

}


// ===============================
// PLAY SONG
// ===============================

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playButton.textContent = "⏸";

        })
        .catch(error => {

            console.log(
                "Audio could not be played:",
                error
            );

        });

}


// ===============================
// PAUSE SONG
// ===============================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playButton.textContent = "▶";

}


// ===============================
// PLAY / PAUSE BUTTON
// ===============================

playButton.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


// ===============================
// NEXT SONG
// ===============================

nextButton.addEventListener(
    "click",
    () => {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


// ===============================
// PREVIOUS SONG
// ===============================

previousButton.addEventListener(
    "click",
    () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong = songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }
);


// ===============================
// PLAYLIST SONG CLICK
// ===============================

document
    .querySelectorAll(".song")
    .forEach(song => {

        song.addEventListener(
            "click",
            () => {

                currentSong =
                    Number(song.dataset.index);

                loadSong(currentSong);

                playSong();

            }
        );

    });


// ===============================
// AUDIO METADATA
// ===============================

audio.addEventListener(
    "loadedmetadata",
    () => {

        progressBar.max =
            audio.duration;

        duration.textContent =
            formatTime(audio.duration);

    }
);


// ===============================
// AUDIO TIME UPDATE
// ===============================

audio.addEventListener(
    "timeupdate",
    () => {

        progressBar.value =
            audio.currentTime;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


// ===============================
// PROGRESS BAR
// ===============================

progressBar.addEventListener(
    "input",
    () => {

        audio.currentTime =
            progressBar.value;

    }
);


// ===============================
// VOLUME
// ===============================

volumeControl.addEventListener(
    "input",
    () => {

        audio.volume =
            volumeControl.value;

    }
);


// ===============================
// WHEN SONG ENDS
// ===============================

audio.addEventListener(
    "ended",
    () => {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


// ===============================
// FORMAT TIME
// ===============================

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${seconds}`;

}


// ===============================
// INITIAL SETTINGS
// ===============================

audio.volume = 1;


// Load first song

loadSong(currentSong);