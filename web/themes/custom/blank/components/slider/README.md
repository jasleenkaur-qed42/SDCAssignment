# Slider

An image carousel. The track scrolls with CSS scroll-snap, so it works without
JavaScript; `slider.js` adds previous/next buttons, dot navigation, keyboard
support and active-slide tracking.

Component ID: `blank:slider`

## Props

None.

## Slots

| Slot     | Description                                         |
| -------- | --------------------------------------------------- |
| `slides` | [Slide](../slide/README.md) components (`blank:slide`). |

## Usage in Twig

```twig
{% embed 'blank:slider' only %}
  {% block slides %}
    {% include 'blank:slide' with {
      image: { src: '/path/one.jpg', alt: 'First image', width: 1280, height: 720 },
      caption: 'First slide',
    } only %}
    {% include 'blank:slide' with {
      image: { src: '/path/two.jpg', alt: 'Second image', width: 1280, height: 720 },
      caption: 'Second slide',
    } only %}
  {% endblock %}
{% endembed %}
```

## Behavior

`slider.js` attaches `Drupal.behaviors.blankSlider` (using `once`). It:

- Shows the controls (hidden by default) only when there are 2+ slides.
- Builds one dot button per slide ("Go to slide N"), marking the current one
  with `aria-current="true"`.
- Wires previous/next buttons and ←/→ arrow keys on the focused track.
- Tracks the visible slide on scroll and toggles `.slide--active`.
- Adds `role="group"`, `aria-roledescription="slide"` and an "N of M" label
  to each slide.

Dependencies: `core/drupal`, `core/once`.

## Styling

Override these custom properties on `.slider` (or a parent):

| Property                     | Default   |
| ---------------------------- | --------- |
| `--slider-gap`               | `1rem`    |
| `--slider-radius`            | `20px`    |
| `--slider-control-size`      | `2.5rem`  |
| `--slider-control-bg`        | `#fff`    |
| `--slider-control-color`     | `#333`    |
| `--slider-control-border`    | `#ccc`    |
| `--slider-dot-size`          | `0.75rem` |
| `--slider-dot-color`         | `#ccc`    |
| `--slider-dot-active-color`  | `#333`    |
| `--slider-focus-color`       | `#005fcc` |

## Accessibility

- Wrapper is a `<section>` with `aria-roledescription="carousel"`.
- The track is focusable (`tabindex="0"`) and `aria-live="polite"`.
- Control buttons have visually hidden text labels; all strings go through
  `|t` / `Drupal.t()` for translation.
- No autoplay, so users stay in control of the motion.

## Storybook

Stories live in `slider.stories.twig`.
