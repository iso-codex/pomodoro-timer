// Date Display
const currentDateElement = document.getElementById('current-date');
const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
currentDateElement.textContent = currentDate;

// Timer Functionality
let timer;
let isTimerRunning = false;
let currentTimerType = 'pomodoro'; // Default
let timeInSeconds = 25 * 60; // Default time for pomodoro

let originalTimeMap = {
    'pomodoro': 25 * 60,
    'short': 5 * 60,
    'long': 15 * 60
};

function pomodoroTimer() {
    currentTimerType = 'pomodoro';
    timeInSeconds = originalTimeMap['pomodoro'];
    resetTimer();
}

function shortBreakTimer() {
    currentTimerType = 'short';
    timeInSeconds = originalTimeMap['short'];
    resetTimer();
}

function longBreakTimer() {
    currentTimerType = 'long';
    timeInSeconds = originalTimeMap['long'];
    resetTimer();
}

function startPauseFunction() {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
    } else {
        timer = setInterval(updateTimer, 1000);
        isTimerRunning = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timeInSeconds = originalTimeMap[currentTimerType];
    updateTimerDisplay();
}

function updateTimer() {
    if (timeInSeconds > 0) {
        timeInSeconds--;
        updateTimerDisplay();
    } else {
        clearInterval(timer);
        isTimerRunning = false;
        // Add completion or break logic here
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const timerDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.querySelector('.timer').textContent = timerDisplay;
}

// Reset Button Functionality
function resetButton() {
    timeInSeconds = originalTimeMap[currentTimerType];
    updateTimerDisplay();
}

// Music Player Functionality
const songs = [
    {
        title: 'Nice',
        artist: 'Brianna Castro',
        src: 'song/Brianna Castro - Nice.mp3',
        thumbnail: 'songs-thumbnails/Nice - Brianna Castro.jpeg'
    },
    {
        title: 'Superpowers',
        artist: 'Danieal Caesar',
        src: 'song/Daniel Caesar - Superpowers.mp3',
        thumbnail: 'songs-thumbnails/superpowers-daniel caesar.jpeg'
    },
    {
        title: 'No Idea',
        artist: 'Don Toliver',
        src: 'song/Don Toliver - No Idea.mp3',
        thumbnail: 'songs-thumbnails/no idea don toliver.jpeg'
    },
    {
        title: 'Shiloh rain + thunder',
        artist: 'Shiloh Mix',
        src: 'song/shiloh rain + thunder.mp3',
        thumbnail: 'songs-thumbnails/shiloh rain + thunder.png'  
    }

    // Add more songs
];

let currentSongIndex = 0;
let audio = new Audio();

function loadSong(index) {
    const songTitleElement = document.querySelector('.song-title');
    const songArtistElement = document.querySelector('.song-artist');
    const songThumbnailElement = document.querySelector('.song-thumb');

    const { title, artist, thumbnail, src } = songs[index];
    songTitleElement.textContent = title;
    songArtistElement.textContent = artist;
    songThumbnailElement.src = thumbnail;

    audio.src = src;
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play(); // Ensure audio plays after changing song
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play(); // Ensure audio plays after changing song
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

audio.addEventListener('timeupdate', () => {
    const progress = document.querySelector('.progress');
    const currentTimeElement = document.querySelector('.current-time');
    const durationElement = document.querySelector('.duration');

    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// To-Do List Functions
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const todoList = document.getElementById('todoList');
        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = deleteTodo;

        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
        todoInput.value = '';
        updateProgress();
    }
}

function deleteTodo() {
    this.parentNode.remove();
    updateProgress();
}

function updateProgress() {
    const todoList = document.getElementById('todoList');
    const todos = todoList.getElementsByTagName('li');
    const totalTodos = todos.length;
    const completedTodos = Array.from(todos).filter(todo => todo.classList.contains('completed')).length;

    const progressPercent = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progressPercent}%`;
    document.getElementById('progressPercentage').textContent = `${Math.round(progressPercent)}%`;
}

// Event listeners for task completion and deletion
document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todoList');
    todoList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            updateProgress();
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('delete-button')) {
            event.target.parentNode.remove();
            updateProgress();
        }
    });
});

// Settings Modal Functionality
function openSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'block';
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'none';
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

// Initial Setup
loadSong(currentSongIndex);
pomodoroTimer(); // Start with Pomodoro timer
