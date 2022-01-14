const init = () => {
    const node = document.createElement('section')
    node.classList.add('gui-toast-group')

    document.firstElementChild.insertBefore(node, document.body)
    return node
}

const createToast = text => {
    const node = document.createElement('output')


    node.innerHTML = `
      <div class="icon">
        <svg class="svg-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" >
          <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
        </svg>
      </div>
      ${text}
  `
    node.classList.add('gui-toast')
    node.setAttribute('role', 'status')

    return node
}

const addToast = toast => {
    const { matches: motionOK } = window.matchMedia(
        '(prefers-reduced-motion: no-preference)'
    )

    Toaster.children.length && motionOK ?
        flipToast(toast) :
        Toaster.appendChild(toast)
}

const Toast = text => {
    let toast = createToast(text)
    addToast(toast)

    return new Promise(async(resolve, reject) => {
        await Promise.allSettled(
            toast.getAnimations().map(animation =>
                animation.finished
            )
        )
        Toaster.removeChild(toast)
        resolve()
    })
}

// https://aerotwist.com/blog/flip-your-animations/
const flipToast = toast => {
    // FIRST
    const first = Toaster.offsetHeight

    // add new child to change container size
    Toaster.appendChild(toast)

    // LAST
    const last = Toaster.offsetHeight

    // INVERT
    const invert = last - first

    // PLAY
    const animation = Toaster.animate([
        { transform: `translateY(${invert}px)` },
        { transform: 'translateY(0)' }
    ], {
        duration: 150,
        easing: 'ease-out',
    })

    animation.startTime = document.timeline.currentTime
}

const Toaster = init()
export default Toast