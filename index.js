let timegeth = document.getElementById("hours")
let timegetm = document.getElementById("minutes")
let timegets = document.getElementById("seconds")
let timeDisplay = document.getElementById("timeDisplay");
let mc = document.getElementsByClassName("container")[0]
let h1d = document.getElementsByClassName("h1d")
let btn = document.getElementById("setbtn1")


timegeth.addEventListener("click",()=>{
    timegeth.contentEditable = true
    timegeth.focus()
   
   
})
timegetm.addEventListener("click",()=>{
    timegetm.contentEditable = true
    timegetm.focus()
    
   
})
timegets.addEventListener("click",()=>{
    timegets.contentEditable = true
    timegets.focus()
   
   
})




btn.addEventListener("click", (e) => {
    // Get the values from the time elements
    let h = timegeth.textContent.trim();
    let m = timegetm.textContent.trim();
    let s = timegets.textContent.trim();

    // Log the values
    console.log("Captured Time: ", h, m, s);

    // Check if the values are valid numbers and within valid ranges
    let hour = parseInt(h);
    let minute = parseInt(m);
    let second = parseInt(s);

    if (!isNaN(hour) && !isNaN(minute) && !isNaN(second) &&
        hour >= 0 && hour <= 23 &&
        minute >= 0 && minute <= 59 &&
        second >= 0 && second <= 59) {
        console.log("Valid time input.");
        // Call the timer logic function
        timerLogic(hour, minute, second);
    } else {
        console.log("Invalid time input.");
    }
});

// Timer Logic: Countdown based on the provided hour, minute, and second
function timerLogic(hour, minute, second) {
    let totalSeconds = (hour * 3600) + (minute * 60) + second;

    const container = document.createElement('div');
    container.classList.add('containerr');
    
    // Create "Set Time" label
    const labelDiv = document.createElement('div');
    const label = document.createElement('span');
    label.id = 'set_time';
    label.textContent = 'timer :';
    labelDiv.appendChild(label);
    
    // Create time container div (to hold hours, minutes, and seconds)
    const timeContainer = document.createElement('div');
    timeContainer.classList.add('timec');
    
    // Create the hours div
    const hoursDiv = document.createElement('div');
    hoursDiv.classList.add('timd');
    hoursDiv.id = 'hours';
    hoursDiv.textContent = 'hh'; // default text
    
    // Create the minutes div
    const minutesDiv = document.createElement('div');
    minutesDiv.classList.add('timd');
    minutesDiv.id = 'minutes';
    minutesDiv.textContent = 'mm'; // default text
    
    // Create the seconds div
    const secondsDiv = document.createElement('div');
    secondsDiv.classList.add('timd');
    secondsDiv.id = 'seconds';
    secondsDiv.textContent = 'ss'; // default text
    
    // Add time elements to the time container
    const separator1 = document.createElement('span');
    separator1.classList.add('timd', 'timd2');
    separator1.textContent = ':';
    const separator2 = document.createElement('span');
    separator2.classList.add('timd', 'timd2');
    separator2.textContent = ':';
    
    timeContainer.appendChild(hoursDiv);
    timeContainer.appendChild(separator1);
    timeContainer.appendChild(minutesDiv);
    timeContainer.appendChild(separator2);
    timeContainer.appendChild(secondsDiv);
    
    // Create the button
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.id = 'setbtn1';
    button.classList.add('setbtn');
    button.textContent = 'Stop';
    
    // Add all elements to the container
    container.appendChild(labelDiv);
    container.appendChild(timeContainer);
    container.appendChild(buttonDiv);
    buttonDiv.appendChild(button);
    
    // Append the entire container to the body
    mc.appendChild(container)
 
    // Function to update the time display
    function updateTimeDisplay() {
        let h1d = document.getElementsByClassName("h1d");

        // Clear the content of h1d
        h1d.textContent = "";
    
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;


         // Format to always show two digits (e.g., 09:05:03)
         hoursDiv.textContent = padZero(hours);
         minutesDiv.textContent = padZero(minutes);
         secondsDiv.textContent = padZero(seconds);
    }

    // Function to add leading zero for single digit numbers
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    // Update display initially
    updateTimeDisplay();

    // Recursive countdown function using setTimeout
    function countdown() {
        if (totalSeconds <= 0) {
            console.log("Timer finished.");
            timeDisplay.textContent = "Time's up!";
        } else {
            totalSeconds--; // Decrease the total seconds by 1
            updateTimeDisplay(); // Update the display
            setTimeout(countdown, 1000); // Call countdown again after 1 second
        }
    }

    // Start the countdown
    setTimeout(countdown, 1000);
}
