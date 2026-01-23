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

    getGapPx() {
        const styles = getComputedStyle(this.track);
        const gap = parseFloat(styles.columnGap || styles.gap || '0');

        return Number.isFinite(gap) ? gap : 0;
    };

    step = (ts) => { // timestamp
        if (this.lastTs == null) {
            this.lastTs = ts;
        };

        const dt = (ts - this.lastTs) / 1000; // delta time
        this.lastTs = ts;
        
        // Move left:
        this.x -= this.speed * dt;

        // Recycle if the first item fully exits the left boundary:
        const first = this.track.firstElementChild;

        if (first) {
            const gap = this.getGapPx();
            const w = first.getBoundingClientRect().width; // width

            if (-this.x >= w + gap) {
                this.x += w + gap;
                this.track.appendChild(first);
            };
        };

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