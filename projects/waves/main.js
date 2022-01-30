import './style.css'
class Wave {
    constructor(config) {
        this.phase = 0;
        this.run = false;
        this.ratio = window.devicePixelRatio || 1;
        this.circleProgress = 0;
        this.GATF_cache = {};
        this.waves = config.waves;
        this.container = config.container;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.width_2 = this.width / 2;
        this.height_2 = this.height / 2;
        this.MAX = this.height_2 - 4;
        this.speed = config.speed || 0.02;
        this.onLoaded = config.onLoaded;
        this.speedChange = config.speedChange || false;
        this.setup();
    }
    _map(n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    }
    setup() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this._getRadius();
        this._creatGradient();
        this._attachEvents();
    }
    _creatGradient() {
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, 2 * this.radius);
        this.gradient.addColorStop(0, "rgb(171,123,65)");
        this.gradient.addColorStop(1, "rgb(62,47,91)");
    }
    _getRadius() {
        this.radius = .3 * this.height;
        this.squareSide = Math.sqrt(Math.pow(2 * this.radius, 2) / 2);
    }
    _drawBase() {
        this.ctx.strokeStyle = this.gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.width_2, this.height_2, this.radius, 0, (Math.PI / 180) * this.circleProgress);
        this.ctx.stroke();
    }
    _updateBase() {
        this.circleProgress += 5;
    }
    _globAttFunc(x) {
        if (this.GATF_cache[x] == null) {
            this.GATF_cache[x] = Math.pow(4 / (4 + Math.pow(x, 4)), 4);
        }
        return this.GATF_cache[x];
    }
    _color(opacity) {
        opacity = opacity || 1;
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        return (gradient.addColorStop(0, `rgba(171,123,65,${opacity})`),
            gradient.addColorStop(1, `rgba(62,47,91,${opacity})`),
            gradient);
    }
    _xPos(t) {
        return this.width_2 + this.radius * Math.sin(t);
    }
    _yPos(i, attenuation, frequency, amplitude) {
        const att = (this.MAX * amplitude) / attenuation;
        return (this.height_2 +
            this.radius * Math.cos(i) +
            (this._globAttFunc(i) + att * Math.sin(frequency * i + this.phase)));
    }
    _drawLine(attenuation, color, frequency, amplitude, thickness) {
        this.ctx.moveTo(0, 0);
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = thickness / this.ratio;
        for (let s = 0.09;
            (s += 0.01) <= Math.PI * 2;) {
            const a = this._yPos(s, attenuation, frequency, amplitude);
            const r = this._xPos(s);
            this.ctx.lineTo(r, a);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }
    _clear() {
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalCompositeOperation = "source-over";
    }
    _draw() {
        if (this.run === false)
            return;
        this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI);
        this._clear();
        if (this.circleProgress < 360) {
            this._updateBase();
            this._drawBase();
        } else {
            for (let i = 0, len = this.waves.length; i < len; i++) {
                const wave = this.waves[i];
                if (wave.startAmplitude < wave.amplitude) {
                    wave.startAmplitude += 0.001;
                }
                this._drawLine(wave.attenuation, this._color(wave.opacity), wave.frequency, wave.startAmplitude, wave.thickness);
            }
        }
        requestAnimationFrame(this._draw.bind(this));
    }
    _attachEvents() {
        window.addEventListener("resize", this._onResize.bind(this));
        window.addEventListener("mousemove", this._onHover.bind(this));
    }
    _onHover(e) {
        if (this.speedChange) {
            this.speed = this._map(e.clientX, 0, innerWidth, 0.02, -0.02);
        }
    }
    _onResize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.width_2 = this.width / 2;
        this.height_2 = this.height / 2;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this._getRadius();
    }
    start() {
        this.run = true;
        this._draw();
    }
    stop() {
        this.run = false;
    }
}

const intro = new Wave({
    container: document.querySelector("#app"),
    speedChange: true,
    waves: [{
            frequency: 9,
            startAmplitude: 0,
            amplitude: 0.04,
            opacity: 0.4,
            attenuation: -2
        },
        {
            frequency: 3,
            startAmplitude: 0,
            amplitude: 0.04,
            opacity: 1,
            attenuation: -6
        },
        {
            frequency: 4,
            startAmplitude: 0,
            amplitude: 0.04,
            opacity: 0.3,
            attenuation: 0.4
        },
        {
            frequency: 4,
            startAmplitude: 0,
            amplitude: 0.04,
            opacity: 0.2,
            attenuation: 2
        },
        {
            frequency: 4,
            startAmplitude: 0,
            amplitude: 0.04,
            opacity: 1,
            attenuation: 0.8
        },

    ]
});
intro.start();