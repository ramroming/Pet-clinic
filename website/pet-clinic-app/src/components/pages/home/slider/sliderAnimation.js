const contentSlider = {
    initial: { 
        x: '97vw',
        y: 0,
        // zIndex: 3,
    },
    final: {
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      x:'-97vw',
    //   zIndex: 1,
      transition: {
        duration: 0.5
      }
    },
    
  }
  
//   const burgerItem = {
//     initial: { y: 20, opacity: 0 },
//     final: {
//       y: 0,
//       opacity: 1
//     }
//   }
  
  
  export { contentSlider };
  