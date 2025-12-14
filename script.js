// Select all necessary elements from the DOM
const video = document.querySelector('.player__video');
const playerButton = document.querySelector('.player__button.toggle');
const volumeInput = document.querySelector('input[name="volume"]');
const speedInput = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play/pause button icon (► or ❚ ❚)
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  playerButton.textContent = icon;
}

// Function to handle volume and speed changes
function handleSliderUpdate() {
  // 'this' refers to the input element that triggered the event
  video[this.name] = this.value; 
}

// Function to skip forward/backward
function skip() {
  // The dataset.skip attribute holds the number of seconds to skip
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to update the progress bar display as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Function to allow clicking/scrubbing the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// --- Event Listeners ---
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // Updates progress bar every ~250ms

playerButton.addEventListener('click', togglePlay);

volumeInput.addEventListener('change', handleSliderUpdate);
volumeInput.addEventListener('mousemove', handleSliderUpdate); // Update volume dynamically
speedInput.addEventListener('change', handleSliderUpdate);
speedInput.addEventListener('mousemove', handleSliderUpdate); // Update speed dynamically

skipButtons.forEach(button => button.addEventListener('click', skip));

// Scrubbing functionality for the progress bar
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false);
