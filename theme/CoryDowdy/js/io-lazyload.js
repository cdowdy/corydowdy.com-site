if ('IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
  !('isIntersecting' in IntersectionObserverEntry.prototype)) {

  Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
    get: function () {
      return this.intersectionRatio > 0
    }
  })
}


// create our observer
let observer = new IntersectionObserver(onChange, {
  threshold: [.15],
});


function onChange(changes) {
  // for each element that becomes visible
  changes.forEach(change => {

    if (change.isIntersecting) {
      change.target.classList.add('visible');
      console.log('.visible added to ' + change.target);
      change.target.src = change.target.dataset.src;
      console.log(change.target.src + ' is ' + change.intersectionRatio + ' visible');
      // stop observing this element
      observer.unobserve(change.target);
    }
  });
}

let imgContainer = [...document.querySelectorAll('.lazyload')];

const createObserver = function () {
  imgContainer.forEach(img => {
    observer.observe(img);
  });
};


window.addEventListener("load", () => {
  createObserver();
}, false);
