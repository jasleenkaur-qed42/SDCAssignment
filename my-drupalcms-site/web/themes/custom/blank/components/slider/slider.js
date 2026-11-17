/**
 * @file
 * Slider component behavior: previous/next buttons, dot navigation,
 * keyboard arrows and active slide tracking on top of a CSS scroll-snap track.
 */
((Drupal, once) => {
  function initSlider(slider) {
    const track = slider.querySelector('.slider__track');
    const controls = slider.querySelector('.slider__controls');
    const prev = slider.querySelector('.slider__button--prev');
    const next = slider.querySelector('.slider__button--next');
    const dotsWrapper = slider.querySelector('.slider__dots');
    if (!track || !controls) {
      return;
    }

    let slides = [];
    let current = 0;

    const getSlides = () => Array.from(track.querySelectorAll('.slide'));

    const goTo = (index) => {
      if (!slides.length) {
        return;
      }
      const target = Math.max(0, Math.min(index, slides.length - 1));
      track.scrollTo({
        left: slides[target].offsetLeft - track.offsetLeft,
      });
    };

    const update = () => {
      prev.disabled = current === 0;
      next.disabled = current >= slides.length - 1;
      dotsWrapper.querySelectorAll('.slider__dot').forEach((dot, i) => {
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('role', 'group');
        slide.setAttribute(
          'aria-label',
          Drupal.t('@index of @total', {
            '@index': i + 1,
            '@total': slides.length,
          }),
        );
        slide.classList.toggle('slide--active', i === current);
      });
    };

    const build = () => {
      slides = getSlides();
      current = Math.min(current, Math.max(slides.length - 1, 0));
      dotsWrapper.textContent = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider__dot';
        dot.setAttribute(
          'aria-label',
          Drupal.t('Go to slide @index', { '@index': i + 1 }),
        );
        dot.addEventListener('click', () => goTo(i));
        dotsWrapper.appendChild(dot);
      });
      // Controls are only useful with more than one slide.
      controls.hidden = slides.length < 2;
      update();
    };

    // Work out the active slide from the scroll position.
    let ticking = false;
    track.addEventListener(
      'scroll',
      () => {
        if (ticking) {
          return;
        }
        ticking = true;
        window.requestAnimationFrame(() => {
          const width = track.clientWidth || 1;
          const index = Math.round(track.scrollLeft / width);
          if (index !== current) {
            current = Math.max(0, Math.min(index, slides.length - 1));
            update();
          }
          ticking = false;
        });
      },
      { passive: true },
    );

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(current - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(current + 1);
      }
    });

    // Rebuild when slides are added, removed or reordered (e.g. in Canvas).
    new MutationObserver(() => build()).observe(track, {
      childList: true,
      subtree: true,
    });

    build();
  }

  Drupal.behaviors.blankSlider = {
    attach(context) {
      once('blank-slider', '.slider', context).forEach(initSlider);
    },
  };
})(Drupal, once);
