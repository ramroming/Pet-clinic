const adoptionMotion = {
    initial: { opacity: 0 },
    final: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 0.8
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.7
        }
    }
}

export { adoptionMotion }