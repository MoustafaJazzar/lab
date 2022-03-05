import './style.css'

interface Options {
  /** The nav element. */
  elem: HTMLElement;
  /** How many pixels to scroll before initial hiding */
  breakPoint: number;
  /** How many pixels to scroll before showing / hiding the navigation bar */
  threshold: number;
  /** Time in milliseconds for the animation. */
  animationSpeed: number;
}

class AutoHideNavigation {
  /** The nav element. */
  private elem!: HTMLElement;
  /** The nav element height in pixels */
  private navHeight!: number;
  /** Store the current scroll position */
  private scrollPos: number = window.screenY;

  private options: Options;

  constructor(options: Options) {
    this.options = {
      elem: options.elem,
      breakPoint: options.breakPoint || 50,
      threshold: options.threshold || 10,
      animationSpeed: options.animationSpeed || 300,
    };
  }

  init() {
    this.navHeight = this.options.elem.offsetHeight;

    /** Store the nav element for easier accessability. */
    this.elem = this.options.elem;

    /** Hide the nav element if the initial scroll position is bigger than the break point */
    if (window.scrollY > this.options.breakPoint) {
      this.elem.style.transform = `translateY(${this.navHeight * -1}px)`;
    }

    this._attachEvents();
  }
  private _attachEvents() {
    window.addEventListener('scroll', this._onScroll.bind(this));
  }

  private _onScroll() {
    /** scrolling down */
    if (
      window.scrollY - this.options.threshold > this.scrollPos &&
      window.scrollY > this.options.breakPoint
    ) {
      this._addStyles('down');
      this.scrollPos = window.scrollY;
    }

    /** scrolling up */
    if (window.scrollY + this.options.threshold < this.scrollPos) {
      this._addStyles('up');
      this.scrollPos = window.scrollY;
    }
  }
  private _addStyles(dir: string) {
    let transY: number;
    if (dir === 'up') {
      transY = 0;
    } else {
      transY = this.navHeight * -1;
    }

    this.elem.style.cssText = `
            transition: ${this.options.animationSpeed}ms ease-in-out all;
            transform: translateY(${transY}px)
        `;
  }
}

const options: Options = {
  elem: document.querySelector('nav') as HTMLElement,
  breakPoint: 50,
  animationSpeed: 300,
  threshold: 10
}

let navigation = new AutoHideNavigation(options);
navigation.init();