# Slide

A single slide with an image and an optional caption. Intended to be placed
inside the [Slider](../slider/README.md) component's `slides` slot.

Component ID: `blank:slide`

## Props

| Prop      | Type                          | Required | Default | Description                                                  |
| --------- | ----------------------------- | -------- | ------- | ------------------------------------------------------------ |
| `image`   | `{ src, alt, width, height }` | yes      | –       | Slide image. Uses Canvas's image schema (media picker).      |
| `caption` | string                        | no       | –       | Caption shown over the bottom of the image.                  |

No slots.

## Usage in Twig

```twig
{% include 'blank:slide' with {
  image: { src: '/path/to/photo.jpg', alt: 'Mountain lake at sunrise', width: 1280, height: 720 },
  caption: 'Lake Louise, Canada',
} only %}
```

See the Slider README for a full carousel example.

## Behavior

The slide has no JavaScript of its own. When inside a slider, `slider.js`
adds `role="group"`, `aria-roledescription="slide"`, an "N of M" label and
the `.slide--active` class to the visible slide.

## Styling

Override these custom properties on `.slide` (or a parent):

| Property                  | Default               |
| ------------------------- | --------------------- |
| `--slide-caption-bg`      | `rgba(0, 0, 0, 0.6)`  |
| `--slide-caption-color`   | `#fff`                |
| `--slide-caption-padding` | `0.75rem 1rem`        |

## Accessibility

- Always pass `image.alt`; use an empty string only if the caption fully
  describes the image.
- Images load lazily (`loading="lazy"`); pass `width`/`height` to avoid layout
  shift.

## Storybook

No standalone stories; slides are shown in `slider.stories.twig`.
