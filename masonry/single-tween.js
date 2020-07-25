const tween = gsap.to(".link1 > img", {
    duration: 1, 
    scale: 4,
    ease: Quad.easeOut,
    x: 0,
    y: 0,
    paused: true
});


// click handlers for controlling the tween instance...
document.querySelector('#test').onclick = () => tween.play();