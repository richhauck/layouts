let clone;
const detail = document.querySelector('#detail')
const detailPic = document.querySelector('#detail-pic')

const onReverseCB = () => {
    console.log('reverse cb')

    // remove clone
    detailPic.removeChild(clone);
    detail.style.zIndex = '0';
    detail.style.pointerEvents = 'none';

    tl.pause(0);
    tl.clear();
}
const onComplete = () => {
    console.log('animation complete');
    //detailPic.removeChild(clone);
}

// Initialize timeline
const tl = gsap.timeline({paused: true, ease: "sine.out", onReverseComplete:onReverseCB, onComplete: onComplete, defaults: {duration: 0.5}});

/**
 * playTL - plays transition from home to slide
 * @param {int} id - index of link node
 * @param {string} imgPath - URL to larger image
 */
const playTL = (id, imgPath) => {

    detail.style.zIndex = '100'; 
    detail.style.pointerEvents = 'all';

    // TODO - recalculate if browser resizes
    const targImg = document.querySelector('.masonry a:nth-child('+id+')' + ' img');
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
    /*
    if (tl.reversed()) {
        console.log('reversed');
    }else{
        console.log('forwards');
    }
    */

    // Load larger image and append to detail screen
    clone = document.createElement('img'); 
    clone.src = imgPath;
    detailPic.appendChild(clone);
    
    /*
    clone.onload = () => {
        console.log('loaded!')
    }
    */

    gsap.set(detailPic, {left: boundsLeft, top: boundsTop, width: boundsW, height: boundsH})

    tl.to('.masonry a:not(:nth-child('+id+'))', {scale: 0})

    .to(detail, {opacity: 1})
    .to('.masonry a', {scale: 0})
    //.to('#detail-desc', {opacity: 1})
    .to('.masonry a:nth-child('+id+')', {scale: 0})
    .to('#content', {backgroundColor: '#333'}, 0)
    .to(detailPic, {width: '100%', height: '100%', left: 0, top: 0, duration: 0.4}, '-=0.5')
}

// Assign behaviors
document.querySelector('#home').addEventListener('click', () => {
    tl.reverse();
})
document.querySelector('#close-btn').addEventListener('click', () => {
    tl.reverse();
})
// Assign behaviors to thumbnails
const thumblinks = document.querySelectorAll('.masonry > a');

[].forEach.call(thumblinks, (link, path) => {

    link.addEventListener('click', (event) => {
        // retrieve index of thumbnail link and increment to match
        let id = [].slice.call(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
        id++;
        let mySrc = event.target.src;
        let imgPath = mySrc.replace('thumbs/', '');

        playTL(id, imgPath);
        tl.play();
    })


});