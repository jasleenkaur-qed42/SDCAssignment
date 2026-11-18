/**
 * @file
 * Card component behavior: clicking the paragraph toggles a highlight.
 */
((Drupal, once) => {
  Drupal.behaviors.blankCard = {
    attach(context) {
      once('blank-card', '.card__paragraph', context).forEach((paragraph) => {
        paragraph.addEventListener('click', () => {
          paragraph.classList.toggle('card__paragraph--highlighted');
        });
      });
    },
  };
})(Drupal, once);
