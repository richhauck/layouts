const body = document.body;
const pages = document.querySelectorAll(".page");
const tiles = document.querySelectorAll(".tile");
const links = document.querySelectorAll('#main-links li a');
let pageId = -1;

const goToPage = (id) => {
  animateFromTo(pages[pageId], tiles[pageId], function(){
    pageId = id;
    animateFromTo(tiles[pageId], pages[pageId]);
  });
}
// Home
document.getElementById('home-link').addEventListener('click', () => {
  if(pageId !== -1){
    animateFromTo(pages[pageId], tiles[pageId])
    pageId = -1;
  }
})

for (var i = 0; i < links.length; i++) {

  tiles[i].addEventListener('click', (event) => {
    pageId = [].slice.call(event.target.parentNode.children).indexOf(event.target);
    animateFromTo(tiles[pageId], pages[pageId]);
  });

  links[i].addEventListener('click', (event) => {
    event.preventDefault()
    let id = [].slice.call(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
    if(pageId !== id){
      if(pageId !== -1){
        goToPage(id)
      }else{
        pageId = id;
        animateFromTo(tiles[pageId], pages[pageId])
      }
    } else{
      animateFromTo(pages[pageId], tiles[pageId])
      pageId = -1;
    }
  })
}
const calculatePosition = element => {
  const root = document.documentElement;
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
  const scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
  const clientTop = root.clientTop || body.clientTop || 0;
  const clientLeft = root.clientLeft || body.clientLeft || 0;

  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width };
}
const animateFromTo = (oldTarget, newTarget, cb) => {
  var clone = oldTarget.cloneNode(true);
  var from = calculatePosition(oldTarget);
  var to = calculatePosition(newTarget);

  TweenLite.set([oldTarget, newTarget], { visibility: "hidden" });
  TweenLite.set(clone, { position: "absolute", margin: 0 });

  body.appendChild(clone);

  var style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    rotation: 180,
    ease: Power1.easeIn,
    onComplete: function(){
      onComplete(cb)
    } };

  TweenLite.set(clone, from);
  TweenLite.to(clone, 0.4, style);

  function onComplete(cb) {
    TweenLite.set(newTarget, { visibility: "visible" });
    body.removeChild(clone);

    if(typeof cb === 'function'){
      cb()
    }
  }
}