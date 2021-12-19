// Each component my have one or more animations for each animation we difine an object that contains:
// 1-initial property which tells the initial state of element at the begining of the animation
// 2-final property which tells the final state of the element at the end of the animation
// 3-exit property which tells the exit state of the element when it is removed from the VDOM
// both final and exit properties has a transition property as well to give more detailed info about the animation
// Note: initial, final and exit properties' names are arbitrary
const container = {
    hidden: {
        opacity: 1
    },
    show: {
        transition: {
            staggerChildren: 0.5,
        }
    }

}


const item = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.8
        }
    }
}


export { container, item };
