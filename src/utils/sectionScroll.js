export const scrollToSection = (sectionId, behavior = "smooth", offset = 100) => {
  const section = document.getElementById(sectionId);
  if (!section) return false;

  window.__portfolioProgrammaticScroll = true;

  window.requestAnimationFrame(() => {
    const top = window.scrollY + section.getBoundingClientRect().top - offset;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior,
    });
  });

  return true;
};

export const scheduleScrollToSection = (sectionId, options = {}) => {
  const { firstBehavior = "auto", offset = 100 } = options;
  const delays = [0, 80, 220, 460, 850];

  window.__portfolioProgrammaticScroll = true;

  const timers = delays.map((delay, index) =>
    window.setTimeout(() => {
      scrollToSection(sectionId, index === 0 ? firstBehavior : "smooth", offset);
    }, delay)
  );

  const unlockTimer = window.setTimeout(() => {
    window.__portfolioProgrammaticScroll = false;
  }, 1400);

  return () => {
    timers.forEach(window.clearTimeout);
    window.clearTimeout(unlockTimer);
    window.__portfolioProgrammaticScroll = false;
  };
};
