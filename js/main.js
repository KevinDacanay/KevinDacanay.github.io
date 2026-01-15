document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const options = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');

        // stagger icons inside this section
        const icons = entry.target.querySelectorAll('.fade-in-icon');
        icons.forEach((icon, index) => {
          setTimeout(() => {
            icon.classList.add('visible');
          }, index * 80); // 80ms delay between icons
        });

        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => observer.observe(fader));
});