// Each component my have one or more animations for each animation we difine an object that contains:
// 1-initial property which tells the initial state of element at the begining of the animation
// 2-final property which tells the final state of the element at the end of the animation
// 3-exit property which tells the exit state of the element when it is removed from the VDOM
// both final and exit properties has a transition property as well to give more detailed info about the animation
// Note: initial, final and exit properties' names are arbitrary
const sliderAnimation = {
  initial: {
    opacity: 0
  },
  final: {
    opacity: 1,
    transition: {
      duration: 1.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 1,
      duration: 0.2
    }
  },

}

export { sliderAnimation };
