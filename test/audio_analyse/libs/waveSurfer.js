! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.WaveSurfer = e() : t.WaveSurfer = e()
}(this, (() => (() => {
    "use strict";
    var t = {
            d: (e, i) => {
                for (var s in i) t.o(i, s) && !t.o(e, s) && Object.defineProperty(e, s, {
                    enumerable: !0,
                    get: i[s]
                })
            },
            o: (t, e) => Object.prototype.hasOwnProperty.call(t, e)
        },
        e = {};
    t.d(e, {
        default: () => d
    });
    const i = {
            decode: async function (t, e) {
                const i = new AudioContext({
                        sampleRate: e
                    }),
                    s = i.decodeAudioData(t);
                return s.finally((() => i.close())), s
            },
            createBuffer: function (t, e) {
                return "number" == typeof t[0] && (t = [t]),
                    function (t) {
                        const e = t[0];
                        if (e.some((t => t > 1 || t < -1))) {
                            const i = e.length;
                            let s = 0;
                            for (let t = 0; t < i; t++) {
                                const i = Math.abs(e[t]);
                                i > s && (s = i)
                            }
                            for (const e of t)
                                for (let t = 0; t < i; t++) e[t] /= s
                        }
                    }(t), {
                        duration: e,
                        length: t[0].length,
                        sampleRate: t[0].length / e,
                        numberOfChannels: t.length,
                        getChannelData: e => t?. [e],
                        copyFromChannel: AudioBuffer.prototype.copyFromChannel,
                        copyToChannel: AudioBuffer.prototype.copyToChannel
                    }
            }
        },
        s = async function (t) {
            return fetch(t).then((t => t.blob()))
        }, r = class {
            constructor() {
                this.listeners = {}
            }
            on(t, e) {
                return this.listeners[t] || (this.listeners[t] = new Set), this.listeners[t].add(e), () => this.un(t, e)
            }
            once(t, e) {
                const i = this.on(t, e),
                    s = this.on(t, (() => {
                        i(), s()
                    }));
                return i
            }
            un(t, e) {
                this.listeners[t] && (e ? this.listeners[t].delete(e) : delete this.listeners[t])
            }
            unAll() {
                this.listeners = {}
            }
            emit(t, ...e) {
                this.listeners[t] && this.listeners[t].forEach((t => t(...e)))
            }
        }, n = class extends r {
            constructor(t) {
                super(), this.isExternalMedia = !1, t.media ? (this.media = t.media, this.isExternalMedia = !0) : this.media = document.createElement("audio"), t.autoplay && (this.media.autoplay = !0), null != t.playbackRate && (this.media.playbackRate = t.playbackRate)
            }
            onMediaEvent(t, e, i) {
                return this.media.addEventListener(t, e, i), () => this.media.removeEventListener(t, e)
            }
            onceMediaEvent(t, e) {
                return this.onMediaEvent(t, e, {
                    once: !0
                })
            }
            revokeSrc() {
                (this.media.currentSrc || this.media.src || "").startsWith("blob:") && URL.revokeObjectURL(this.media.currentSrc)
            }
            setSrc(t, e) {
                if ((this.media.currentSrc || this.media.src || "") === t) return;
                this.revokeSrc();
                const i = e instanceof Blob ? URL.createObjectURL(e) : t;
                this.media.src = i
            }
            destroy() {
                this.media.pause(), this.revokeSrc(), this.isExternalMedia || this.media.remove()
            }
            play() {
                return this.media.play()
            }
            pause() {
                this.media.pause()
            }
            isPlaying() {
                return this.media.currentTime > 0 && !this.media.paused && !this.media.ended
            }
            setTime(t) {
                this.media.currentTime = t
            }
            getDuration() {
                return this.media.duration
            }
            getCurrentTime() {
                return this.media.currentTime
            }
            getVolume() {
                return this.media.volume
            }
            setVolume(t) {
                this.media.volume = t
            }
            getMuted() {
                return this.media.muted
            }
            setMuted(t) {
                this.media.muted = t
            }
            getPlaybackRate() {
                return this.media.playbackRate
            }
            setPlaybackRate(t, e) {
                null != e && (this.media.preservesPitch = e), this.media.playbackRate = t
            }
            getMediaElement() {
                return this.media
            }
            setSinkId(t) {
                return this.media.setSinkId(t)
            }
        };
    class o extends r {
        constructor(t) {
            let e;
            if (super(), this.timeouts = [], this.isScrolling = !1, this.audioData = null, this.resizeObserver = null, this.isDragging = !1, this.options = t, "string" == typeof t.container ? e = document.querySelector(t.container) : t.container instanceof HTMLElement && (e = t.container), !e) throw new Error("Container not found");
            this.parent = e;
            const [i, s] = this.initHtml();
            e.appendChild(i), this.container = i, this.scrollContainer = s.querySelector(".scroll"), this.wrapper = s.querySelector(".wrapper"), this.canvasWrapper = s.querySelector(".canvases"), this.progressWrapper = s.querySelector(".progress"), this.cursor = s.querySelector(".cursor"), this.initEvents()
        }
        initEvents() {
            this.wrapper.addEventListener("click", (t => {
                const e = this.wrapper.getBoundingClientRect(),
                    i = (t.clientX - e.left) / e.width;
                this.emit("click", i)
            })), this.initDrag(), this.scrollContainer.addEventListener("scroll", (() => {
                const {
                    scrollLeft: t,
                    scrollWidth: e,
                    clientWidth: i
                } = this.scrollContainer, s = t / e, r = (t + i) / e;
                this.emit("scroll", s, r)
            }));
            const t = this.createDelay(100);
            this.resizeObserver = new ResizeObserver((() => {
                t((() => this.reRender()))
            })), this.resizeObserver.observe(this.scrollContainer)
        }
        initDrag() {
            ! function (t, e, i, s, r = 5) {
                let n = () => {};
                if (!t) return n;
                t.addEventListener("pointerdown", (o => {
                    o.preventDefault(), o.stopPropagation();
                    let a = o.clientX,
                        h = o.clientY,
                        l = !1;
                    const c = s => {
                            s.preventDefault(), s.stopPropagation();
                            const n = s.clientX,
                                o = s.clientY;
                            if (l || Math.abs(n - a) >= r || Math.abs(o - h) >= r) {
                                l || (l = !0, i?.(a, h));
                                const {
                                    left: s,
                                    top: r
                                } = t.getBoundingClientRect();
                                e(n - a, o - h, n - s, o - r), a = n, h = o
                            }
                        },
                        d = t => {
                            l && (t.preventDefault(), t.stopPropagation())
                        },
                        u = () => {
                            l && s?.(), n()
                        };
                    n = () => {
                        document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", u), document.removeEventListener("pointerleave", u), setTimeout((() => {
                            document.removeEventListener("click", d, !0)
                        }), 10)
                    }, document.addEventListener("pointermove", c), document.addEventListener("pointerup", u), document.addEventListener("pointerleave", u), document.addEventListener("click", d, !0)
                }))
            }(this.wrapper, ((t, e, i) => {
                this.emit("drag", Math.max(0, Math.min(1, i / this.wrapper.clientWidth)))
            }), (() => this.isDragging = !0), (() => this.isDragging = !1))
        }
        getHeight() {
            return null == this.options.height ? 128 : isNaN(Number(this.options.height)) ? "auto" === this.options.height && this.parent.clientHeight || 128 : Number(this.options.height)
        }
        initHtml() {
            const t = document.createElement("div"),
                e = t.attachShadow({
                    mode: "open"
                });
            return e.innerHTML = `\n      <style>\n        :host {\n          user-select: none;\n        }\n        :host .scroll {\n          overflow-x: auto;\n          overflow-y: hidden;\n          width: 100%;\n          position: relative;\n        }\n        :host .noScrollbar {\n          scrollbar-color: transparent;\n          scrollbar-width: none;\n        }\n        :host .noScrollbar::-webkit-scrollbar {\n          display: none;\n          -webkit-appearance: none;\n        }\n        :host .wrapper {\n          position: relative;\n          overflow: visible;\n          z-index: 2;\n        }\n        :host .canvases {\n          min-height: ${this.getHeight()}px;\n        }\n        :host .canvases > div {\n          position: relative;\n        }\n        :host canvas {\n          display: block;\n          position: absolute;\n          top: 0;\n          image-rendering: pixelated;\n        }\n        :host .progress {\n          pointer-events: none;\n          position: absolute;\n          z-index: 2;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          overflow: hidden;\n        }\n        :host .progress > div {\n          position: relative;\n        }\n        :host .cursor {\n          pointer-events: none;\n          position: absolute;\n          z-index: 5;\n          top: 0;\n          left: 0;\n          height: 100%;\n          border-radius: 2px;\n        }\n      </style>\n\n      <div class="scroll" part="scroll">\n        <div class="wrapper">\n          <div class="canvases"></div>\n          <div class="progress" part="progress"></div>\n          <div class="cursor" part="cursor"></div>\n        </div>\n      </div>\n    `, [t, e]
        }
        setOptions(t) {
            this.options = t, this.reRender()
        }
        getWrapper() {
            return this.wrapper
        }
        getScroll() {
            return this.scrollContainer.scrollLeft
        }
        destroy() {
            this.container.remove(), this.resizeObserver?.disconnect()
        }
        createDelay(t = 10) {
            const e = {};
            return this.timeouts.push(e), i => {
                e.timeout && clearTimeout(e.timeout), e.timeout = setTimeout(i, t)
            }
        }
        convertColorValues(t) {
            if (!Array.isArray(t)) return t || "";
            if (t.length < 2) return t[0] || "";
            const e = document.createElement("canvas"),
                i = e.getContext("2d").createLinearGradient(0, 0, 0, e.height),
                s = 1 / (t.length - 1);
            return t.forEach(((t, e) => {
                const r = e * s;
                i.addColorStop(r, t)
            })), i
        }
        renderBars(t, e, i) {
            if (i.fillStyle = this.convertColorValues(e.waveColor), e.renderFunction) return void e.renderFunction(t, i);
            const s = t[0],
                r = t[1] || t[0],
                n = s.length,
                o = window.devicePixelRatio || 1,
                {
                    width: a,
                    height: h
                } = i.canvas,
                l = h / 2,
                c = e.barHeight || 1,
                d = e.barWidth ? e.barWidth * o : 1,
                u = e.barGap ? e.barGap * o : e.barWidth ? d / 2 : 0,
                p = e.barRadius || 0,
                m = a / (d + u) / n;
            let g = 1;
            if (e.normalize) {
                g = 0;
                for (let t = 0; t < n; t++) {
                    const e = Math.abs(s[t]);
                    e > g && (g = e)
                }
            }
            const v = l / g * c;
            i.beginPath();
            let f = 0,
                b = 0,
                y = 0;
            for (let t = 0; t <= n; t++) {
                const n = Math.round(t * m);
                if (n > f) {
                    const t = Math.round(b * v),
                        s = t + Math.round(y * v) || 1;
                    let r = l - t;
                    "top" === e.barAlign ? r = 0 : "bottom" === e.barAlign && (r = h - s), i.roundRect(f * (d + u), r, d, s, p), f = n, b = 0, y = 0
                }
                const o = Math.abs(s[t] || 0),
                    a = Math.abs(r[t] || 0);
                o > b && (b = o), a > y && (y = a)
            }
            i.fill(), i.closePath()
        }
        renderSingleCanvas(t, e, i, s, r, n, o, a) {
            const h = window.devicePixelRatio || 1,
                l = document.createElement("canvas"),
                c = t[0].length;
            l.width = Math.round(i * (n - r) / c), l.height = s * h, l.style.width = `${Math.floor(l.width/h)}px`, l.style.height = `${s}px`, l.style.left = `${Math.floor(r*i/h/c)}px`, o.appendChild(l);
            const d = l.getContext("2d");
            this.renderBars(t.map((t => t.slice(r, n))), e, d);
            const u = l.cloneNode();
            a.appendChild(u);
            const p = u.getContext("2d");
            l.width > 0 && l.height > 0 && p.drawImage(l, 0, 0), p.globalCompositeOperation = "source-in", p.fillStyle = this.convertColorValues(e.progressColor), p.fillRect(0, 0, l.width, l.height)
        }
        renderWaveform(t, e, i) {
            const s = document.createElement("div"),
                r = this.getHeight();
            s.style.height = `${r}px`, this.canvasWrapper.style.minHeight = `${r}px`, this.canvasWrapper.appendChild(s);
            const n = s.cloneNode();
            this.progressWrapper.appendChild(n);
            const {
                scrollLeft: a,
                scrollWidth: h,
                clientWidth: l
            } = this.scrollContainer, c = t[0].length, d = c / h;
            let u = Math.min(o.MAX_CANVAS_WIDTH, l);
            if (e.barWidth || e.barGap) {
                const t = e.barWidth || .5,
                    i = t + (e.barGap || t / 2);
                u % i != 0 && (u = Math.floor(u / i) * i)
            }
            const p = Math.floor(Math.abs(a) * d),
                m = Math.floor(p + u * d),
                g = m - p,
                v = (o, a) => {
                    this.renderSingleCanvas(t, e, i, r, Math.max(0, o), Math.min(a, c), s, n)
                },
                f = this.createDelay(),
                b = this.createDelay(),
                y = (t, e) => {
                    v(t, e), t > 0 && f((() => {
                        y(t - g, e - g)
                    }))
                },
                C = (t, e) => {
                    v(t, e), e < c && b((() => {
                        C(t + g, e + g)
                    }))
                };
            y(p, m), m < c && C(m, m + g)
        }
        render(t) {
            this.timeouts.forEach((t => t.timeout && clearTimeout(t.timeout))), this.timeouts = [];
            const e = window.devicePixelRatio || 1,
                i = this.scrollContainer.clientWidth,
                s = Math.ceil(t.duration * (this.options.minPxPerSec || 0));
            this.isScrolling = s > i;
            const r = this.options.fillParent && !this.isScrolling,
                n = (r ? i : s) * e;
            if (this.wrapper.style.width = r ? "100%" : `${s}px`, this.scrollContainer.style.overflowX = this.isScrolling ? "auto" : "hidden", this.scrollContainer.classList.toggle("noScrollbar", !!this.options.hideScrollbar), this.cursor.style.backgroundColor = `${this.options.cursorColor||this.options.progressColor}`, this.cursor.style.width = `${this.options.cursorWidth}px`, this.canvasWrapper.innerHTML = "", this.progressWrapper.innerHTML = "", this.options.splitChannels)
                for (let e = 0; e < t.numberOfChannels; e++) {
                    const i = {
                        ...this.options,
                        ...this.options.splitChannels[e]
                    };
                    this.renderWaveform([t.getChannelData(e)], i, n)
                } else {
                    const e = [t.getChannelData(0)];
                    t.numberOfChannels > 1 && e.push(t.getChannelData(1)), this.renderWaveform(e, this.options, n)
                }
            this.audioData = t, this.emit("render")
        }
        reRender() {
            if (!this.audioData) return;
            const t = this.progressWrapper.clientWidth;
            this.render(this.audioData);
            const e = this.progressWrapper.clientWidth;
            this.scrollContainer.scrollLeft += e - t
        }
        zoom(t) {
            this.options.minPxPerSec = t, this.reRender()
        }
        scrollIntoView(t, e = !1) {
            const {
                clientWidth: i,
                scrollLeft: s,
                scrollWidth: r
            } = this.scrollContainer, n = r * t, o = i / 2;
            if (n > s + (e && this.options.autoCenter && !this.isDragging ? o : i) || n < s)
                if (this.options.autoCenter && !this.isDragging) {
                    const t = o / 20;
                    n - (s + o) >= t && n < s + i ? this.scrollContainer.scrollLeft += t : this.scrollContainer.scrollLeft = n - o
                } else if (this.isDragging) {
                const t = 10;
                this.scrollContainer.scrollLeft = n < s ? n - t : n - i + t
            } else this.scrollContainer.scrollLeft = n; {
                const {
                    scrollLeft: t
                } = this.scrollContainer, e = t / r, s = (t + i) / r;
                this.emit("scroll", e, s)
            }
        }
        renderProgress(t, e) {
            isNaN(t) || (this.progressWrapper.style.width = 100 * t + "%", this.cursor.style.left = 100 * t + "%", this.cursor.style.marginLeft = 100 === Math.round(100 * t) ? `-${this.options.cursorWidth}px` : "", this.isScrolling && this.options.autoScroll && this.scrollIntoView(t, e))
        }
    }
    o.MAX_CANVAS_WIDTH = 4e3;
    const a = o,
        h = class extends r {
            constructor() {
                super(...arguments), this.unsubscribe = () => {}
            }
            start() {
                this.unsubscribe = this.on("tick", (() => {
                    requestAnimationFrame((() => {
                        this.emit("tick")
                    }))
                })), this.emit("tick")
            }
            stop() {
                this.unsubscribe()
            }
            destroy() {
                this.unsubscribe()
            }
        },
        l = {
            waveColor: "#999",
            progressColor: "#555",
            cursorWidth: 1,
            minPxPerSec: 0,
            fillParent: !0,
            interact: !0,
            autoScroll: !0,
            autoCenter: !0,
            sampleRate: 8e3
        };
    class c extends n {
        static create(t) {
            return new c(t)
        }
        constructor(t) {
            super({
                media: t.media,
                autoplay: t.autoplay,
                playbackRate: t.audioRate
            }), this.plugins = [], this.decodedData = null, this.duration = null, this.subscriptions = [], this.options = Object.assign({}, l, t), this.timer = new h, this.renderer = new a(this.options), this.initPlayerEvents(), this.initRendererEvents(), this.initTimerEvents(), this.initPlugins();
            const e = this.options.url || this.options.media?.currentSrc || this.options.media?.src;
            e && this.load(e, this.options.peaks, this.options.duration)
        }
        setOptions(t) {
            this.options = Object.assign({}, this.options, t), this.renderer.setOptions(this.options), t.audioRate && this.setPlaybackRate(t.audioRate)
        }
        initTimerEvents() {
            this.subscriptions.push(this.timer.on("tick", (() => {
                const t = this.getCurrentTime();
                this.renderer.renderProgress(t / this.getDuration(), !0), this.emit("timeupdate", t), this.emit("audioprocess", t)
            })))
        }
        initPlayerEvents() {
            this.subscriptions.push(this.onMediaEvent("timeupdate", (() => {
                const t = this.getCurrentTime();
                this.renderer.renderProgress(t / this.getDuration(), this.isPlaying()), this.emit("timeupdate", t)
            })), this.onMediaEvent("play", (() => {
                this.emit("play"), this.timer.start()
            })), this.onMediaEvent("pause", (() => {
                this.emit("pause"), this.timer.stop()
            })), this.onMediaEvent("ended", (() => {
                this.emit("finish")
            })), this.onMediaEvent("seeking", (() => {
                this.emit("seeking", this.getCurrentTime())
            })))
        }
        initRendererEvents() {
            this.subscriptions.push(this.renderer.on("click", (t => {
                this.options.interact && (this.seekTo(t), this.emit("interaction", this.getCurrentTime()), this.emit("click", t))
            })), this.renderer.on("scroll", ((t, e) => {
                const i = this.getDuration();
                this.emit("scroll", t * i, e * i)
            })), this.renderer.on("render", (() => {
                this.emit("redraw")
            }))); {
                let t;
                this.subscriptions.push(this.renderer.on("drag", (e => {
                    this.options.interact && (this.renderer.renderProgress(e), clearTimeout(t), t = setTimeout((() => {
                        this.seekTo(e)
                    }), this.isPlaying() ? 0 : 200), this.emit("interaction", e * this.getDuration()), this.emit("drag", e))
                })))
            }
        }
        initPlugins() {
            this.options.plugins?.length && this.options.plugins.forEach((t => {
                this.registerPlugin(t)
            }))
        }
        registerPlugin(t) {
            return t.init(this), this.plugins.push(t), t
        }
        getWrapper() {
            return this.renderer.getWrapper()
        }
        getScroll() {
            return this.renderer.getScroll()
        }
        getActivePlugins() {
            return this.plugins
        }
        async load(t, e, r) {
            this.decodedData = null, this.duration = null, this.emit("load", t);
            const n = e ? void 0 : await s(t);
            if (this.setSrc(t, n), this.duration = r || this.getDuration() || await new Promise((t => {
                    this.onceMediaEvent("loadedmetadata", (() => t(this.getDuration())))
                })) || 0, e) this.decodedData = i.createBuffer(e, this.duration);
            else if (n) {
                const t = await n.arrayBuffer();
                this.decodedData = await i.decode(t, this.options.sampleRate), 0 !== this.duration && this.duration !== 1 / 0 || (this.duration = this.decodedData.duration)
            }
            this.emit("decode", this.duration), this.decodedData && this.renderer.render(this.decodedData), this.emit("ready", this.duration)
        }
        zoom(t) {
            if (!this.decodedData) throw new Error("No audio loaded");
            this.renderer.zoom(t), this.emit("zoom", t)
        }
        getDecodedData() {
            return this.decodedData
        }
        getDuration() {
            return null !== this.duration ? this.duration : super.getDuration()
        }
        toggleInteraction(t) {
            this.options.interact = t
        }
        seekTo(t) {
            const e = this.getDuration() * t;
            this.setTime(e)
        }
        async playPause() {
            return this.isPlaying() ? this.pause() : this.play()
        }
        stop() {
            this.pause(), this.setTime(0)
        }
        skip(t) {
            this.setTime(this.getCurrentTime() + t)
        }
        empty() {
            this.load("", [
                [0]
            ], .001)
        }
        destroy() {
            this.emit("destroy"), this.subscriptions.forEach((t => t())), this.plugins.forEach((t => t.destroy())), this.timer.destroy(), this.renderer.destroy(), super.destroy()
        }
    }
    const d = c;
    return e.default
})()));