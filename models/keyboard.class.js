class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    Q = false;

    constructor() {
        this.bindBtsPressEvents();
    }

    /**
     * Binds touch events to the on-screen control buttons.
     * 
     * This method adds touch event listeners to the "left", "right", "jump", and "throw" buttons. 
     * The events are used to control the corresponding actions, setting boolean flags to indicate whether the respective button is pressed or not.
     * 
     * - The `btnLeft` button sets the `LEFT` flag.
     * - The `btnRight` button sets the `RIGHT` flag.
     * - The `btnJump` button sets the `SPACE` flag.
     * - The `btnThrow` button sets the `Q` flag.
     * 
     * Each button has `touchstart` and `touchend` events that toggle the flags accordingly.
     *
     */
    bindBtsPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.Q = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.Q = false;
        });
    }
}