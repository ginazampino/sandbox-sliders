class Ticker {
    constructor(root) {
        this.root = root;
        this.track = root.querySelector('.ticker__track');

        this.x = 0; // horizontal
        this.speed = 60; // pixels per second
        this.lastTs = null; // last timestamp
        this.raf = null; // request animation frame

        this.start();
    };

    step = (ts) => { // timestamp
        if (this.lastTs == null) {
            this.lastTs = ts;
        };

        const dt = (ts - this.lastTs) / 1000; // delta time

        this.lastTs = ts;
        this.x -= this.speed * dt;
        this.track.style.transform = `translate(${this.x}px)`;
        this.raf = requestAnimationFrame(this.step);
    };

    start() {
        if (!this.raf) {
            this.lastTs = null;
            this.raf = requestAnimationFrame(this.step);
        };
    };

    stop() {
        cancelAnimationFrame(this.raf);
        this.raf = null;
    };
};

window.Ticker = Ticker;