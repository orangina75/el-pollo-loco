class Sounds {
    constructor() {
        this.soundsMuted = localStorage.getItem("muted") === "true";
        this.sounds = [];
    }

    /**
    * Adds a sound to the list of sounds and sets its muted state.
    * 
    * @param {Sound} sound - The sound object to be added.
    * 
    */
    addSound(sound) {
        this.sounds.push(sound);
        sound.muted = this.soundsMuted;
    }

    /**
     * Toggles the mute state of all sounds and updates the local storage.
     * 
     * This method toggles the `soundsMuted` state, updates it in `localStorage`, and applies the muted state to all sounds in the `sounds` array. 
     * It also updates the sound button to reflect the current mute state.
     * 
     */
    toggleSoundMute() {
        this.soundsMuted = !this.soundsMuted;
        localStorage.setItem("muted", this.soundsMuted);
        this.sounds.forEach(sound => sound.muted = this.soundsMuted);
        this.updateSoundButton();
        syncSoundButtons();
    }

    /**
     * Updates the sound button's muted state visually.
     * 
     * This method updates the class of all sound buttons to reflect the current mute state.
     * If the sound is muted, it adds the `muted` class to the button, otherwise, it removes it.
     * 
     */
    updateSoundButton() {
        let soundButtons = document.querySelectorAll('.sound-buttons');
        soundButtons.forEach(button => {
            button.classList.toggle("muted", this.soundsMuted);
        });
    }

    /**
     * Stops all sounds by pausing them and resetting their playback time.
     * 
     * This method iterates over all the sounds stored in the `sounds` array, 
     * pauses each sound, and resets its `currentTime` to `0`, effectively 
     * stopping the sound from continuing to play.
     * 
     */
    stopAllSounds() {
        this.sounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}

const sounds = new Sounds();
sounds.updateSoundButton();

class BackgroundMusic {
    constructor() {
        this.music = new Audio('audio/background.mp3');
        this.music.loop = true;
        this.music.volume = 0.5;
        this.musicMuted = JSON.parse(localStorage.getItem('musicMuted')) ?? true;
        this.music.muted = this.musicMuted;
    }

    /**
    * Toggles the mute state for the background music.
    * 
    * This method switches the mute state of the background music, saves the
    * current state to `localStorage`, and updates the music player accordingly. 
    * It also updates the music button state and the music playback state.
    * 
    */
    toggleMusicMute() {
        this.musicMuted = !this.musicMuted;
        localStorage.setItem('musicMuted', JSON.stringify(this.musicMuted));
        this.music.muted = this.musicMuted;
        this.updateMusicButton();
        this.updateMusicState();
        syncMusicButtons(); 
    }

    /**
     * Updates the state of music control buttons based on the current music mute status.
     * 
     * This method iterates over all elements with the class `.music-buttons` and toggles
     * the `muted` class based on the current music mute state. This provides a visual 
     * indication of whether the music is muted or not.
     * 
     */
    updateMusicButton() {
        let musicButtons = document.querySelectorAll('.music-buttons');
        musicButtons.forEach(button => {
            button.classList.toggle("muted", this.musicMuted);
        });
    }

    /**
     * Plays the music if it is not muted.
     * 
     * This method attempts to play the music only if the music is not muted. If the music
     * is muted, the method does nothing. If there is an error during playback (e.g., due to
     * network issues), it will be caught and logged to the console.
     * 
     */
    play() {
        if (!this.musicMuted) {
            this.music.play().catch(error => console.error("Fehler beim Abspielen der Musik:", error));
        }
    }

    /**
    * Pauses the music and resets the playback time to the beginning.
    * 
    * This method pauses the music playback and resets the `currentTime` of the music
    * to `0`, effectively starting the track from the beginning once it is played again.
    * 
    */
    pause() {
        this.music.pause();
        this.music.currentTime = 0;
    }

    /**
     * Updates the music playback state based on the `musicMuted` flag.
     * 
     * If the music is muted (`musicMuted` is `true`), the music will be paused.
     * If the music is not muted (`musicMuted` is `false`), the music will start playing.
     * 
     */
    updateMusicState() {
        if (this.musicMuted) {
            this.pause();
        } else {
            this.play();
        }
    }
}

const backgroundMusic = new BackgroundMusic();