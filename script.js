const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = navLinks.querySelectorAll('a');
  const MOBILE_BREAKPOINT = 680;

  // mobile menu toggle
  menuBtn.addEventListener('click', function(){
    navLinks.classList.toggle('open');
  });

  // close menu when a link is clicked (mobile)
  navAnchors.forEach(function(link){
    link.addEventListener('click', function(){
      navLinks.classList.remove('open');
    });
  });

  // if the window is resized past mobile width, make sure the menu
  // isn't left stuck open (e.g. rotating a phone, resizing a browser)
  window.addEventListener('resize', function(){
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      navLinks.classList.remove('open');
    }
  });

  // smooth scroll to sections when a nav link is clicked
  navAnchors.forEach(function(link){
    link.addEventListener('click', function(e){
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // highlight the nav link for whichever section is currently in view
  const sections = document.querySelectorAll('section[id], footer[id]');
  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      const link = document.querySelector('nav a[href="#' + entry.target.id + '"]');
      if (!link) return;
      if (entry.isIntersecting) {
        navAnchors.forEach(function(a){ a.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(function(section){
    observer.observe(section);
  });

  const touchBtn = document.querySelector('a[href="#contact"]');
const contactPills = document.querySelectorAll('.contact-pill');

if (touchBtn) {
  touchBtn.addEventListener('click', () => {
    // Wait for the smooth scroll to finish before pulsing
    setTimeout(() => {
      contactPills.forEach((pill) => {
        pill.classList.remove('highlight-pulse');
        // Force reflow to re-trigger the animation
        void pill.offsetWidth;
        pill.classList.add('highlight-pulse');
      });
    }, 450);
  });
}