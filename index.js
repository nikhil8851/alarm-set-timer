let timers = []; // Store timers

// Event listeners for the editable time fields
document.getElementById('hours').addEventListener('click', () => makeEditable('hours'));
document.getElementById('minutes').addEventListener('click', () => makeEditable('minutes'));
document.getElementById('seconds').addEventListener('click', () => makeEditable('seconds'));

// Event listener for setting the timer
document.getElementById('setbtn1').addEventListener('click', setTimer);

// Event listener for stopping the timer
document.getElementById('setbtn2').addEventListener('click', stopAllTimers);

function makeEditable(id) {
    const element = document.getElementById(id);
    element.contentEditable = true;
    element.focus();
    element.addEventListener('blur', () => {
        element.contentEditable = false;
    });
}

function setTimer() {
    const hours = parseInt(document.getElementById('hours').innerText) || 0;
    const minutes = parseInt(document.getElementById('minutes').innerText) || 0;
    const seconds = parseInt(document.getElementById('seconds').innerText) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        const timer = {
            id: Date.now(),
            timeLeft: totalSeconds,
            interval: null
        };
        timers.push(timer);
        startTimer(timer);
        renderTimers();
    }
}

function startTimer(timer) {
    timer.interval = setInterval(() => {
        timer.timeLeft--;
        if (timer.timeLeft <= 0) {
            clearInterval(timer.interval);
            alert('Timer is up!');
        }
        renderTimers();
    }, 1000);
}

function stopAllTimers() {
    // Stop all running timers
    timers.forEach(timer => {
        clearInterval(timer.interval);
    });
    timers = []; // Clear all timers
    renderTimers(); // Re-render the list (which will show no timers)
}

// Stop a specific timer
function stopTimerById(timerId) {
    const timer = timers.find(t => t.id === timerId);
    if (timer) {
        clearInterval(timer.interval); // Stop the specific timer
        timers = timers.filter(t => t.id !== timerId); // Remove the timer from the list
        renderTimers(); // Re-render the list
    }
}

// Render the list of timers
function renderTimers() {
    const timersList = document.getElementById('timers-list');
    timersList.innerHTML = ''; // Clear current list

    if (timers.length === 0) {
        timersList.innerHTML = 'You have no timers currently!';
    } else {
        timers.forEach(timer => {
            const timerElement = document.createElement('div');
            timerElement.className = 'time left';

            // Format time as hh:mm:ss
            const time = new Date(timer.timeLeft * 1000).toISOString().substr(11, 8);
            timerElement.innerText = `Timer: ${time}`;

            // Add Stop Button for each timer
            const stopButton = document.createElement('button');
            stopButton.className ='setbtn';
            stopButton.innerText = 'Stop';
            stopButton.addEventListener('click', () => stopTimerById(timer.id));

            timerElement.appendChild(stopButton);
            timersList.appendChild(timerElement);
        });
    }
}
