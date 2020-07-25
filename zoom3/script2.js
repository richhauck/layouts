const root = document.documentElement;
const body = document.body;
const pages = document.querySelectorAll(".page");
const tiles = document.querySelectorAll(".tile");
const links = document.querySelectorAll("#main-links li a");
let pageid = -1;

for (var i = 0; i < tiles.length; i++) {
  addListeners(tiles[i], pages[i]);
}

links[1].addEventListener("click", function () {
  animateFromTo(pages[0], tiles[0])
  animateFromTo(tiles[1], pages[1])

  /*
  if(pageid === 0){
    animateFromTo(pages[0], tiles[0]);
  }else{
    animateFromTo(tiles[0], pages[0]);
  }
  */
  pageid = 0;
});

function addListeners (tile, page) {

  tile.addEventListener("click", function () {
    animateFromTo(tile, page);
  });
/*
  page.addEventListener("click", function () {
    animateFromTo(page, tile);
  });
  */
}

const animateFromTo = (oldTarget, newTarget) => {
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
    ease: Power1.easeOut,
    onComplete: function(){
      onComplete()
    } };

  TweenLite.set(clone, from);
  TweenLite.to(clone, 0.3, style);

  function onComplete() {
    TweenLite.set(newTarget, { visibility: "visible" });
    body.removeChild(clone);
  }
}

function calculatePosition(element) {

  var rect = element.getBoundingClientRect();

  var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

  var clientTop = root.clientTop || body.clientTop || 0;
  var clientLeft = root.clientLeft || body.clientLeft || 0;

  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width };

}