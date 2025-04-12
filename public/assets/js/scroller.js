  const urlParams = new URLSearchParams(window.location.search);
  const scrollTarget = urlParams.get('scroll'); 

  if (scrollTarget && scrollTarget.startsWith('#')) {
    window.addEventListener('load', () => {
      const element = document.querySelector(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }