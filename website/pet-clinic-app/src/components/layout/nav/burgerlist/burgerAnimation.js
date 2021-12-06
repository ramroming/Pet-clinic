const burgerMenu = {

  initial: { opacity: 1, scale: 0 },
  final: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
}

const burgerItem = {
  initial: { y: 20, opacity: 0 },
  final: {
    y: 0,
    opacity: 1
  }
}


export { burgerMenu, burgerItem };
