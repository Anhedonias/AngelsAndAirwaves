'use strict';
const headerHeight = document.querySelector('.header').offsetHeight;

function smoothScroll(target,duration) {
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - headerHeight + 1;
  var startTime = null;
  
  function animation(currentTime){
    if(startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed,startPosition,distance,duration);
    window.scrollTo(0,run);
    if(timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) -1) + b;
  }
  
  requestAnimationFrame(animation);
}

class NavigationMenu {
  constructor(root) {
    this.root = root;
    this.links = null;
    this.cacheNodes();
    this.bindEvents();
  }
  
  cacheNodes() {
    this.links = this.root.querySelectorAll('.js-page-scroll');
  }
  
  bindEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      
      if (target.classList.contains('js-page-scroll')) {
        event.preventDefault();
        const id = target.hash;
        
        smoothScroll(id, 1000);
      }
    });
    
    window.addEventListener("scroll", event => {
      let fromTop = window.scrollY + headerHeight;

      this.links.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("menu__link--active");
        } else {
          link.classList.remove("menu__link--active");
        }
      });
    });
  }
}

const menuNode = document.querySelector('.js-nav-menu');
const Menu = new NavigationMenu(menuNode);