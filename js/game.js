let canvas;
let world;
let keyboard;
let pressedQ = false;

/**
 * Initializes the game by setting up the keyboard, retrieving the canvas element,
 * and creating a new instance of the World with necessary parameters.
 * It also binds keyboard button press events.
 * 
 */
function init() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, numCoins, numCoinsTotal, numBottles, numBottlesTotal);
    keyboard.bindBtsPressEvents();
}

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowRight":
            keyboard.RIGHT = true;
            break;
        case "ArrowLeft":
            keyboard.LEFT = true;
            break;
        case "ArrowUp":
            keyboard.UP = true;
            break;
        case "ArrowDown":
            keyboard.DOWN = true;
            break;
        case "Space":
            keyboard.SPACE = true;
            break;
        case "KeyD":
            keyboard.D = true;
            break;
        case "KeyQ":
            keyboard.Q = true;
            if (!pressedQ) {
                pressedQ = true;
            }
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowRight":
            keyboard.RIGHT = false;
            break;
        case "ArrowLeft":
            keyboard.LEFT = false;
            break;
        case "ArrowUp":
            keyboard.UP = false;
            break;
        case "ArrowDown":
            keyboard.DOWN = false;
            break;
        case "Space":
            keyboard.SPACE = false;
            break;
        case "KeyD":
            keyboard.D = false;
            break;
        case "KeyQ":
            keyboard.Q = false;
            pressedQ = false;
            break;
    }
});

/**
 * Listens for the "DOMContentLoaded" event and calls the `start` function when the event is fired.
 * 
 * @param {function} start - The function to execute once the DOM content is fully loaded.
 */
document.addEventListener("DOMContentLoaded", start);

/**
 * Initializes the game setup by configuring mobile controls, 
 * the start button, and menu buttons.
 * This function is called once the DOM content is fully loaded.
 */
function start() {
    setupMobileControls();
    setupStartButton();
    setupMenuButtons();
}

/**
 * Initializes mobile control buttons and binds keyboard events.
 * 
 * @param {string} leftId - The ID of the left movement button.
 * @param {string} rightId - The ID of the right movement button.
 * @param {string} jumpId - The ID of the jump button.
 * @param {string} throwId - The ID of the throw button.
 */
function setupMobileControls() {
    let btnLeft = document.getElementById('btnLeft');
    let btnRight = document.getElementById('btnRight');
    let btnJump = document.getElementById('btnJump');
    let btnThrow = document.getElementById('btnThrow');

    if (btnLeft && btnRight && btnJump && btnThrow) {
        keyboard = new Keyboard();
        keyboard.bindBtsPressEvents();
    } else {
        console.error("Mobile Buttons nicht gefunden!");
    }
}


/**
 * Sets up the start button functionality.
 * Displays audio controls and fades them in when the start button is clicked.
 *
 * @param {string} startButtonId - The ID of the start button element.
 * @param {string} audioControlsId - The ID of the audio controls element.
 * @param {string} startScreenId - The ID of the start screen element.
 */
function setupStartButton() {
    let startButton = document.getElementById("start-button");
    let audioControls = document.getElementById("audio-controls");
    let startScreen = document.getElementById("start-screen");

    if (startButton && audioControls && startScreen) {
        startButton.addEventListener("click", function () {
            audioControls.style.display = "flex";
            setTimeout(() => {
                audioControls.style.opacity = "1";
            }, 2000);
        });
    }
}

/**
 * Sets up the menu buttons with click event listeners for restart and home.
 * 
 * @param {string} restartButtonId - The ID of the restart button element.
 * @param {string} homeButtonId - The ID of the home button element.
 * @param {function} restartGame - The function to call when the restart button is clicked.
 * @param {function} backToHome - The function to call when the home button is clicked.
 */
function setupMenuButtons() {
    document.getElementById("restart-button").addEventListener("click", restartGame);
    document.getElementById("home-button").addEventListener("click", backToHome);
}
