/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//main container element which contains sections
const main = document.querySelector('main');

//sections nodelist
const sections = document.querySelectorAll("main section");

//navigation menu ul
const navmenu = document.getElementById('navbar__list');

//variables for window scroll event
let last_known_scroll_position = 0;
let ticking = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
function BuildNavigationMenu(){
  let i = 0;
    for(let section of sections){
        let a = document.createElement('a');
        a.textContent = section.querySelector('h2').textContent;
        a.id = `a${section.id}`;
        a.href=`#${section.id}`;
        if(i==0){
          a.className ="menu_link_active";
        }else{
          a.className = "menu__link";
        }
        // Scroll to anchor ID using scrollTO event
        // Scroll to section on link click
        a.addEventListener('click', function(event){
          let sectionId = a.id.slice(1);
          document.querySelector(`#${sectionId}`).scrollIntoView({behavior: "smooth"});
          event.preventDefault();
        });
        let li = document.createElement('li');
        li.appendChild(a);
        navmenu.appendChild(li);
        i++;
    }
}

// Add class 'active' to section when near top of viewport

// The checker
function isScrolledIntoView(el) {
  let rect = el.getBoundingClientRect();
  let windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  //see if the section is partially visible with 50% because of margins and padding
  //helper code from stackoverflow  https://stackoverflow.com/questions/30943662/check-if-element-is-partially-in-viewport
  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < 50 ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < 50
  )
}

// Usage.
function setSectionActiveClass(){
  for(let section of sections){
    section.classList.remove("active-class");  
    document.querySelector(`#a${section.id}`).classList.remove("menu_link_active");
    document.querySelector(`#a${section.id}`).classList.add("menu__link");
  }
  for(let section of sections){
      if(isScrolledIntoView(section)){
          section.classList.add("active-class");
          document.querySelector(`#a${section.id}`).classList.remove("menu__link");
          document.querySelector(`#a${section.id}`).classList.add("menu_link_active");
          break;
      }
  }
}



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
BuildNavigationMenu();

// Set sections as active
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        setSectionActiveClass();
        ticking = false;
      });  
      ticking = true;
    }
});

