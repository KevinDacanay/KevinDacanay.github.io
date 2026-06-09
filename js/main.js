// --- TAILWIND CONFIGURATION ---
tailwind.config = {
  darkMode: 'class',
}

document.addEventListener('DOMContentLoaded', () => {
  // --- DARK MODE LOGIC ---
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const toggleIcon = document.getElementById('toggle-icon');

  // Function to set theme
  const setTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (toggleIcon) toggleIcon.src = '/assets/icons/light-mode.png';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (toggleIcon) toggleIcon.src = '/assets/icons/dark-mode.png';
      localStorage.setItem('theme', 'light');
    }
  };

  // Sync icon source based on the class applied in the head script
  const isDark = document.documentElement.classList.contains('dark');
  if (toggleIcon) {
    toggleIcon.src = isDark ? '/assets/icons/light-mode.png' : '/assets/icons/dark-mode.png';
  }
  // Toggle button event listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(!isDark);
    });
  }

  // --- FADE IN OBSERVER ---
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