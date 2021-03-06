import { extend, mobileCheck, q, color2Hex } from "./helpers.js";
// const DEBUGMODE = window.location.toString().indexOf('VANTADEBUG') !== -1

const win = typeof window == "object";
const THREE = (win && window.THREE) || {};
if (win && !window.VANTA) window.VANTA = {};
const VANTA = (win && window.VANTA) || {};
VANTA.register = (name, Effect) => {
  return (VANTA[name] = opts => new Effect(opts));
};
VANTA.version = "0.5.1";

export { VANTA };

// const ORBITCONTROLS = {
//   enableZoom: false,
//   userPanSpeed: 3,
//   userRotateSpeed: 2.0,
//   maxPolarAngle: Math.PI * 0.8, // (pi/2 is pure horizontal)
//   mouseButtons: {
//     ORBIT: THREE.MOUSE.LEFT,
//     ZOOM: null,
//     PAN: null
//   }
// }
// if (DEBUGMODE) {
//   extend(ORBITCONTROLS, {
//     enableZoom: true,
//     zoomSpeed: 4,
//     minDistance: 100,
//     maxDistance: 4500
//   })
// }

// Namespace for errors
var error = function() {
  Array.prototype.unshift.call(arguments, "[VANTA]");
  return console.error.apply(this, arguments);
};

VANTA.VantaBase = class VantaBase {
  constructor(userOptions = {}) {
    if (!win) return false;
    VANTA.current = this;
    var child, e, i, selector;
    this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this);
    this.windowTouchWrapper = this.windowTouchWrapper.bind(this);
    this.resize = this.resize.bind(this);
    this.animationLoop = this.animationLoop.bind(this);
    this.restart = this.restart.bind(this);
    this.options = extend({}, this.defaultOptions);
    if (userOptions instanceof HTMLElement || typeof userOptions === "string") {
      extend(this.options, {
        el: userOptions
      });
    } else {
      extend(this.options, userOptions);
    }
    // Set element
    this.el = this.options.el;
    if (this.el == null) {
      error('Instance needs "el" param!');
    } else if (!(this.options.el instanceof HTMLElement)) {
      selector = this.el;
      this.el = q(selector);
      if (!this.el) {
        error("Cannot find element", selector);
        return;
      }
    }

    // Set foreground elements
    for (i = 0; i < this.el.children.length; i++) {
      child = this.el.children[i];
      if (getComputedStyle(child).position === "static") {
        child.style.position = "relative";
      }
      if (getComputedStyle(child).zIndex === "auto") {
        child.style.zIndex = 1;
      }
    }
    // Set canvas and container style
    if (getComputedStyle(this.el).position === "static") {
      this.el.style.position = "relative";
    }

    this.initThree();
    this.setSize(); // Init needs size

    // TODO: move this to ShaderBase
    this.uniforms = {
      u_time: {
        type: "f",
        value: 1.0
      },
      u_resolution: {
        type: "v2",
        value: new THREE.Vector2(1, 1)
      },
      u_mouse: {
        type: "v2",
        value: new THREE.Vector2(0, 0)
      }
    };

    try {
      this.init();
    } catch (error1) {
      e = error1;
      // FALLBACK - just use color
      error("Init error");
      error(e);
      this.el.removeChild(this.renderer.domElement);
      if (this.options.backgroundColor) {
        console.log("[VANTA] Falling back to backgroundColor");
        this.el.style.background = color2Hex(this.options.backgroundColor);
      }
      return;
    }

    window.addEventListener("resize", this.resize);
    this.resize();
    this.animationLoop();

    // Add event listeners on window, because this element may be below other elements, which would block the element's own mousemove event
    window.addEventListener("scroll", this.windowMouseMoveWrapper);
    window.addEventListener("mousemove", this.windowMouseMoveWrapper);
    window.addEventListener("touchstart", this.windowTouchWrapper);
    window.addEventListener("touchmove", this.windowTouchWrapper);
  }

  applyCanvasStyles(canvasEl, opts = {}) {
    extend(canvasEl.style, {
      position: "absolute",
      zIndex: 0,
      top: 0,
      left: 0,
      background: ""
    });
    extend(canvasEl.style, opts);
    canvasEl.classList.add("vanta-canvas");
  }

  initThree() {
    if (!THREE.WebGLRenderer) {
      console.warn("[VANTA] No THREE defined on window");
      return;
    }
    // Set renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.el.appendChild(this.renderer.domElement);
    this.applyCanvasStyles(this.renderer.domElement);
    if (isNaN(this.options.backgroundAlpha)) {
      this.options.backgroundAlpha = 1;
    }

    this.scene = new THREE.Scene();
  }

  windowMouseMoveWrapper(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      this.mouseX = x;
      this.mouseY = y;
      if (!this.options.mouseEase) this.triggerMouseMove(x, y);
    }
  }
  windowTouchWrapper(e) {
    if (e.touches.length === 1) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        this.mouseX = x;
        this.mouseY = y;
        if (!this.options.mouseEase) this.triggerMouseMove(x, y);
      }
    }
  }

  triggerMouseMove(x, y) {
    if (this.uniforms) {
      this.uniforms.u_mouse.value.x = x / this.scale; // pixel values
      this.uniforms.u_mouse.value.y = y / this.scale; // pixel values
    }
    const xNorm = x / this.width; // 0 to 1
    const yNorm = y / this.height; // 0 to 1
    typeof this.onMouseMove === "function"
      ? this.onMouseMove(xNorm, yNorm)
      : void 0;
  }

  setSize() {
    this.scale || (this.scale = 1);
    if (mobileCheck() && this.options.scaleMobile) {
      this.scale = this.options.scaleMobile;
    } else if (this.options.scale) {
      this.scale = this.options.scale;
    }
    this.width = this.el.offsetWidth || window.innerWidth;
    this.height = this.el.offsetHeight || window.innerHeight;
  }

  resize() {
    var ref, ref1;
    this.setSize();
    if ((ref = this.camera) != null) {
      ref.aspect = this.width / this.height;
    }
    if ((ref1 = this.camera) != null) {
      if (typeof ref1.updateProjectionMatrix === "function") {
        ref1.updateProjectionMatrix();
      }
    }
    if (this.renderer) {
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(window.devicePixelRatio / this.scale);
    }
    typeof this.onResize === "function" ? this.onResize() : void 0;
  }

  animationLoop() {
    var elHeight, elRect, maxScrollTop, minScrollTop, offsetTop, scrollTop;
    // Step time
    this.t || (this.t = 0);
    this.t += 1;
    // Uniform time
    this.t2 || (this.t2 = 0);
    this.t2 += this.options.speed || 1;
    if (this.uniforms) this.uniforms.u_time.value = this.t2 * 0.016667; // u_time is in seconds

    elHeight = this.el.offsetHeight;
    elRect = this.el.getBoundingClientRect();
    scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    offsetTop = elRect.top + scrollTop;
    minScrollTop = offsetTop - window.innerHeight;
    maxScrollTop = offsetTop + elHeight;

    if (this.options.mouseEase) {
      this.mouseEaseX = this.mouseEaseX || this.mouseX || 0;
      this.mouseEaseY = this.mouseEaseY || this.mouseY || 0;
      if (
        Math.abs(this.mouseEaseX - this.mouseX) +
          Math.abs(this.mouseEaseY - this.mouseY) >
        0.1
      ) {
        this.mouseEaseX =
          this.mouseEaseX + (this.mouseX - this.mouseEaseX) * 0.05;
        this.mouseEaseY =
          this.mouseEaseY + (this.mouseY - this.mouseEaseY) * 0.05;
        this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY);
      }
    }

    // Only animate if element is within view
    if (minScrollTop <= scrollTop && scrollTop <= maxScrollTop) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate();
      }
      if (this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
        this.renderer.setClearColor(
          this.options.backgroundColor,
          this.options.backgroundAlpha
        );
      }
      // @stats?.update()
      // @renderStats?.update(@renderer)
      if (this.fps && this.fps.update) this.fps.update();
    }
    return (this.req = window.requestAnimationFrame(this.animationLoop));
  }

  // setupControls() {
  //   if (DEBUGMODE && THREE.OrbitControls) {
  //     this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
  //     extend(this.controls, ORBITCONTROLS)
  //     return this.scene.add(new THREE.AxisHelper(100))
  //   }
  // }

  restart() {
    // Restart the effect without destroying the renderer
    if (this.scene) {
      while (this.scene.children.length) {
        this.scene.remove(this.scene.children[0]);
      }
    }
    if (typeof this.onRestart === "function") {
      this.onRestart();
    }
    this.init();
  }

  init() {
    if (typeof this.onInit === "function") {
      this.onInit();
    }
    // this.setupControls()
  }

  destroy() {
    if (typeof this.onDestroy === "function") {
      this.onDestroy();
    }

    window.removeEventListener("touchstart", this.windowTouchWrapper);
    window.removeEventListener("touchmove", this.windowTouchWrapper);
    window.removeEventListener("scroll", this.windowMouseMoveWrapper);
    window.removeEventListener("mousemove", this.windowMouseMoveWrapper);
    window.removeEventListener("resize", this.resize);

    window.cancelAnimationFrame(this.req);
    if (this.renderer) {
      this.el.removeChild(this.renderer.domElement);
      this.renderer = null;
      this.scene = null;
    }
  }
};

export default VANTA.VantaBase;
