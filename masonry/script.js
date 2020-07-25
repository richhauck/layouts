let clone;
const detailPic = document.querySelector('#detail-pic')

const onReverseCB = () => {
    console.log('reverse cb')
    detailPic.removeChild(clone);
}

const tl = gsap.timeline({paused: true, onReverseComplete:onReverseCB, defaults: {duration: 0.5}});

const playTL = (targ) => {
    const targImg = document.querySelector(targ + ' img');
    const mBounds = document.querySelector('.masonry').getBoundingClientRect();
    const bounds = targImg.getBoundingClientRect();
    const boundsTop = bounds.top - mBounds.top;
    const boundsLeft = bounds.left - mBounds.left;
    const boundsW = bounds.width;
    const boundsH = bounds.height;

    // Create and attach clone
    //clone = targImg.cloneNode(true);
    //detailPic.appendChild(clone);

    // Load larger image 
    if (tl.reversed()) {
        console.log('reversed');
    }else{
        console.log('forwards');
    }
    clone = document.createElement('img'); 
    clone.src = '../images/02.jpg'; 
    detailPic.appendChild(clone); 
    clone.onload = () => {
        console.log('loaded!')
    }
 
    gsap.set(detailPic, {left: boundsLeft, top: boundsTop, width: boundsW, height: boundsH})
    //gsap.set(clone, {left: boundsLeft, top: boundsTop, width: boundsW, height: boundsH, display: 'block', position: 'absolute'})

    tl.to('.masonry a:not('+targ+')', {scale: 0})
    //tl.to('.masonry a', {scale: 0})
    .to(detail, {opacity: 1})
    //.to('#detail-desc', {opacity: 1})
    .to('#content', {backgroundColor: '#333'}, 0)
    .to(detailPic, {width: '100%', height: '100%', left: 0, top: 0, duration: 0.4, onComplete: onComplete})

    function onComplete(){
        // load larger image


        // remove clone
        //detailPic.removeChild(clone);
    }
}
document.querySelector('#home').addEventListener('click', () => {
    tl.reverse();
})

document.querySelector('#link1').addEventListener('click', (event) => {
    playTL('.link1')
    tl.play();
})