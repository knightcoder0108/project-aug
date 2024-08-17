// script.js
document.getElementById('set-timer').addEventListener('click', startNewTimer);

let timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalTime = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTime > 0) {
        createTimer(totalTime);
    }
}

function createTimer(duration) {
    if (timers.length === 0) {
        document.getElementById('no-timers-message').style.display = 'none';
    }

    const timerId = timers.length;
    const timerElement = document.createElement('div');
    timerElement.className = 'timer-display';
    timerElement.id = `timer-${timerId}`;

    const timeLeftLabel = document.createElement('span');
    timeLeftLabel.className = 'time-left-label';
    timeLeftLabel.textContent = 'Time Left:';

    const timeDisplay = document.createElement('span');
    timeDisplay.className = 'time-remaining';
    timeDisplay.textContent = formatTime(duration);

    const stopButton = document.createElement('button');
    stopButton.className = 'stop-timer-button';
    stopButton.textContent = 'Stop';
    stopButton.style.display = 'none'; // Initially hidden
    stopButton.addEventListener('click', () => stopTimer(timerId));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-timer-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTimer(timerId));

    timerElement.appendChild(timeLeftLabel);
    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(stopButton);
    timerElement.appendChild(deleteButton);
    document.getElementById('timers-display').appendChild(timerElement);

    const timer = {
        id: timerId,
        duration: duration,
        element: timerElement,
        interval: setInterval(() => updateTimer(timerId), 1000)
    };

    timers.push(timer);
}

function updateTimer(timerId) {
    const timer = timers[timerId];
    timer.duration--;

    const timeDisplay = timer.element.querySelector('.time-remaining');
    const timeLeftLabel = timer.element.querySelector('.time-left-label');
    timeDisplay.textContent = formatTime(timer.duration);

    if (timer.duration <= 0) {
        clearInterval(timer.interval);
        timer.element.classList.add('yellow');
        timeLeftLabel.textContent = 'Timer Is Up!'; // Change the label
        timeDisplay.textContent = ''; // Clear the remaining time
        timer.element.querySelector('.delete-timer-button').style.display = 'none';
        timer.element.querySelector('.stop-timer-button').style.display = 'inline-block'; // Show the stop button
        playAlert();
    }
}

function stopTimer(timerId) {
    const timer = timers[timerId];
    clearInterval(timer.interval);
    timer.element.remove();
    timers.splice(timerId, 1);

    if (timers.length === 0) {
        document.getElementById('no-timers-message').style.display = 'block';
    }
}

function deleteTimer(timerId) {
    const timer = timers[timerId];
    clearInterval(timer.interval);
    timer.element.remove();
    timers.splice(timerId, 1);

    if (timers.length === 0) {
        document.getElementById('no-timers-message').style.display = 'block';
    }
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function playAlert() {
    const alertSound = new Audio('alert.mp3');
    alertSound.play();
}
