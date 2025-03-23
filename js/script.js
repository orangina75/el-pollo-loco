/**
 * Initializes the game by setting up music, the start button, and the "How to Play" overlay 
 * when the DOM content is loaded.
 * 
 * @param {function} setupMusicAndSound - The function to initialize music and sound settings.
 * @param {function} setupStartButtonGo - The function to set up the start button functionality.
 * @param {function} setupHowToPlayOverlay - The function to set up the "How to Play" overlay.
 */
document.addEventListener('DOMContentLoaded', () => {
    setupMusicAndSound();
    setupStartButtonGo();
    setupHowToPlayOverlay();
});

/**
 * Sets up event listeners for music and sound control buttons.
 * Updates the state of background music and sound buttons.
 * Handles keydown events to toggle music and sound mute states.
 * 
 * @param {NodeListOf<Element>} musicButtons - A collection of music control buttons.
 * @param {NodeListOf<Element>} soundButtons - A collection of sound control buttons.
 * @param {Object} backgroundMusic - The background music handler object.
 * @param {Object} sounds - The sound handler object.
 * @param {function} handleKeydown - A function that handles keydown events for toggling mute states.
 */
function setupMusicAndSound() {
    let musicButtons = document.querySelectorAll('.music-buttons');
    let soundButtons = document.querySelectorAll('.sound-buttons');
    backgroundMusic.updateMusicState();
    backgroundMusic.updateMusicButton();
    sounds.updateSoundButton();
    window.addEventListener("keydown", handleKeydown);
    musicButtons.forEach(button => button.addEventListener("click", () => backgroundMusic.toggleMusicMute()));
    soundButtons.forEach(button => button.addEventListener("click", () => {
        sounds.toggleSoundMute();
        sounds.updateSoundButton();
    }));
}

/**
 * Handles keydown events to toggle music and sound mute states.
 * If the 'M' or 'S' keys are pressed, the function prevents the default behavior
 * and toggles the mute state of music or sound accordingly.
 * 
 * @param {KeyboardEvent} event - The keydown event triggered by a key press.
 * @param {Object} backgroundMusic - The background music handler object used to toggle the music mute state.
 * @param {Object} sounds - The sound handler object used to toggle the sound mute state and update the sound button.
 */
function handleKeydown(event) {
    if (event.code === "KeyM" || event.code === "KeyS") {
        event.preventDefault();
        if (event.code === "KeyM") {
            backgroundMusic.toggleMusicMute();
        } else if (event.code === "KeyS") {
            sounds.toggleSoundMute();
            sounds.updateSoundButton();
        }
    }
}

/**
 * Sets up the start button functionality. When the start button is clicked, 
 * the start screen will have a 'fly-out' animation, and after 1 second, 
 * the `startGame` function is triggered.
 * 
 */
function setupStartButtonGo() {
    let startScreen = document.getElementById('start-screen');
    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        startScreen.classList.add('fly-out');
        setTimeout(startGame, 1000);
    });
}

/**
 * Initializes the game by hiding the start screen, showing the game title 
 * and canvas, and starting the level and game setup. Also, it updates the 
 * background music state.
 * 
 */
function startGame() {
    let startScreen = document.getElementById('start-screen');
    let gameTitle = document.getElementById('game-title');
    let canvas = document.getElementById('canvas');
    startScreen.style.display = 'none';
    gameTitle.style.display = 'block';
    canvas.style.display = 'block';
    initLevel();
    init();
    backgroundMusic.updateMusicState();
}

/**
 * Sets up the "How to Play" overlay and its event listeners.
 * When the "How to Play" button is clicked, the overlay is displayed.
 * The overlay can be closed by clicking the close button or anywhere outside the overlay.
 *
 * @param {string} howToPlayButtonSelector - The selector for the "How to Play" button.
 * @param {string} overlayId - The ID of the overlay element.
 * @param {string} closeButtonSelector - The selector for the close button inside the overlay.
 */
function setupHowToPlayOverlay() {
    let howToPlayButton = document.querySelector('.howToPlay');
    let overlay = document.getElementById('howToPlayOverlay');
    let closeButton = overlay.querySelector('.close-btn');
    howToPlayButton.addEventListener('click', () => overlay.style.display = 'flex');
    closeButton.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
}

/**
 * Hides the audio controls by fading out and then hiding the element.
 * The audio controls element will first fade out and then be hidden after a timeout.
 *
 * @param {string} audioControlsId - The ID of the audio controls element to hide.
 */
function hideAudio() {
    let audioControls = document.getElementById("audio-controls");

    if (audioControls) {
        audioControls.style.opacity = "0";
        setTimeout(() => {
            audioControls.style.display = "none";
        }, 1000);
    }
}

/**
 * Displays the end screen and hides the audio controls by fading them out.
 * The end screen will be displayed, and the audio controls will fade out and then be hidden after a timeout.
 *
 * @param {string} endScreenId - The ID of the end screen element to show.
 * @param {string} audioControlsId - The ID of the audio controls element to hide.
 */
function showEndButtons() {
    let endScreen = document.getElementById("end-screen");
    let audioControls = document.getElementById("audio-controls");
    if (endScreen && audioControls) {
        endScreen.style.display = "block";
        audioControls.style.opacity = "0";
        setTimeout(() => {
            audioControls.style.display = "none";
        }, 500);
    }
}

/**
 * Restarts the game by reinitializing the level, resetting the game state, and showing the audio controls.
 * The end screen is hidden, and the audio controls are displayed with a fade-in effect.
 *
 * @param {string} endScreenId - The ID of the end screen element to hide.
 * @param {string} audioControlsId - The ID of the audio controls element to show.
 */
function restartGame() {
    numCoins = Math.round(10 + Math.random() * 10);
    numCoinsTotal = numCoins + 15;
    numBottles = Math.round(1 + Math.random() * 10);
    numBottlesTotal = numBottles + 3;
    initLevel();
    init();
    document.getElementById("end-screen").style.display = "none";
    let audioControls = document.getElementById("audio-controls");
    audioControls.style.display = "flex";
    setTimeout(() => {
        audioControls.style.opacity = "1";
    }, 500);
}

/**
 * Reloads the current page, effectively taking the user back to the home screen or restarting the game.
 *
 * @param {boolean} forceReload - If true, forces a reload even if the page is already at the home screen.
 */
function backToHome() {
    location.reload();
}

/**
 * Checks the device orientation and adjusts the display accordingly for mobile and desktop views.
 * If the window is in portrait mode on mobile, a warning is shown.
 * Otherwise, it displays the appropriate view based on the device orientation and screen size.
 *
 * @param {Object} elements - The elements to be updated based on the orientation and screen size.
 * @param {HTMLElement} elements.mobileView - The element to display for mobile view.
 * @param {HTMLElement} elements.desktopView - The element to display for desktop view.
 * @param {HTMLElement} elements.orientationWarning - The element to display when the orientation is incorrect.
 */
function checkOrientation() {
    let elements = getElements();
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 800) {
        if (window.innerHeight < window.innerWidth) {
            showMobile(elements);
        } else {
            showOrientationWarning(elements);
        }
    } else {
        showDesktop(elements);
    }
}

/**
 * Retrieves a set of HTML elements that are used throughout the game interface.
 * These elements are needed to control visibility and interactions depending on the screen state or game progress.
 *
 * @returns {Object} An object containing key HTML elements.
 * @returns {HTMLElement} return.mobileControls - The element for mobile control buttons.
 * @returns {HTMLElement} return.orientationWarning - The element for the orientation warning message.
 * @returns {HTMLElement} return.startScreen - The element for the start screen.
 * @returns {HTMLElement} return.endScreen - The element for the end screen.
 * @returns {HTMLElement} return.canvas - The canvas element where the game is rendered.
 * @returns {HTMLElement} return.howToPlayOverlay - The overlay that shows how to play the game.
 */
function getElements() {
    return {
        mobileControls: document.getElementById("mobile-controls"),
        orientationWarning: document.getElementById("orientation-warning"),
        startScreen: document.getElementById("start-screen"),
        endScreen: document.getElementById("end-screen"),
        canvas: document.getElementById("canvas"),
        howToPlayOverlay: document.getElementById("howToPlayOverlay")
    };
}

/**
 * Displays the mobile controls and relevant screens for mobile users.
 * It ensures that the orientation warning is hidden, the start screen is visible, 
 * and the end screen is hidden. The canvas is displayed for gameplay.
 * 
 * @param {Object} elements - An object containing the necessary HTML elements.
 * @param {HTMLElement} elements.mobileControls - The mobile control buttons element.
 * @param {HTMLElement} elements.orientationWarning - The orientation warning element.
 * @param {HTMLElement} elements.startScreen - The start screen element.
 * @param {HTMLElement} elements.endScreen - The end screen element.
 * @param {HTMLElement} elements.canvas - The canvas element for the game.
 */
function showMobile(elements) {
    setTimeout(() => {
        elements.mobileControls.style.display = "flex";
    }, 1500);
    elements.orientationWarning.style.display = "none";
    elements.startScreen.style.display = "block";
    elements.endScreen.style.display = "none";
    elements.canvas.style.display = "block";
}

/**
 * Displays the orientation warning and hides the relevant screens and controls.
 * It ensures that the mobile controls are hidden, the orientation warning is visible, 
 * and the start screen, canvas, and how-to-play overlay are hidden.
 * 
 * @param {Object} elements - An object containing the necessary HTML elements.
 * @param {HTMLElement} elements.mobileControls - The mobile control buttons element.
 * @param {HTMLElement} elements.orientationWarning - The orientation warning element.
 * @param {HTMLElement} elements.startScreen - The start screen element.
 * @param {HTMLElement} elements.canvas - The canvas element for the game.
 * @param {HTMLElement} elements.howToPlayOverlay - The how-to-play overlay element.
 */
function showOrientationWarning(elements) {
    elements.mobileControls.style.display = "none";
    elements.orientationWarning.style.display = "block";
    elements.startScreen.style.display = "none";
    elements.canvas.style.display = "none";
    elements.howToPlayOverlay.style.display = "none";
}

/**
 * Displays the desktop layout by showing the start screen and canvas,
 * and hiding the mobile controls and orientation warning.
 * 
 * @param {Object} elements - An object containing the necessary HTML elements.
 * @param {HTMLElement} elements.mobileControls - The mobile control buttons element.
 * @param {HTMLElement} elements.orientationWarning - The orientation warning element.
 * @param {HTMLElement} elements.startScreen - The start screen element.
 * @param {HTMLElement} elements.canvas - The canvas element for the game.
 */
function showDesktop(elements) {
    elements.mobileControls.style.display = "none";
    elements.orientationWarning.style.display = "none";
    elements.startScreen.style.display = "block";
    elements.canvas.style.display = "block";
}

/**
 * Sets up event listeners for the document and window to check the orientation 
 * of the device and adjust the layout accordingly.
 * 
 * - When the DOM content is fully loaded, the `checkOrientation` function is called 
 *   to adjust the layout based on the screen size.
 * - When the window is resized, the `checkOrientation` function is called again 
 *   to update the layout in case of changes.
 * 
 * @listens document#DOMContentLoaded - Listens for when the DOM content is fully loaded.
 * @listens window#resize - Listens for the resize event to check if the screen dimensions change.
 */
document.addEventListener("DOMContentLoaded", function () {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
});