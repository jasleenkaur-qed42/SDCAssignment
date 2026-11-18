# Card

A content card with an optional image, a heading and a short paragraph. Use it
in grids or lists to promote an offer, article or product.

Component ID: `blank:card`

## Props

| Prop            | Type                     | Required | Default | Description                                              |
| --------------- | ------------------------ | -------- | ------- | -------------------------------------------------------- |
| `header`        | string                   | yes      | –       | Main title of the card.                                  |
| `heading_level` | `h2` \| `h3` \| `h4`     | no       | `h2`    | Heading element; choose the level that fits the outline. |
| `paragraph`     | string                   | no       | –       | Supporting text under the heading (plain text).          |
| `image`         | `{ src, alt, width, height }` | no  | –       | Image shown above the content. Uses Canvas's image schema, so Canvas shows a media picker. |

No slots.

## Usage in Twig

```twig
{% include 'blank:card' with {
  header: 'Get 25% off today only',
  heading_level: 'h3',
  paragraph: 'Upgrade your setup with our best-selling gear.',
  image: { src: '/path/to/image.jpg', alt: 'Headphones on a desk', width: 640, height: 360 },
} only %}
```

## Behavior

`card.js` attaches a `Drupal.behaviors.blankCard` behavior (using `once`)
that toggles `.card__paragraph--highlighted` when the paragraph is clicked.

## Styling

Override these custom properties on `.card` (or a parent) to theme it:

| Property                 | Default |
| ------------------------ | ------- |
| `--card-border-color`    | `#ccc`  |
| `--card-radius`          | `4px`   |
| `--card-padding`         | `1rem`  |
| `--card-bg`              | `#fff`  |
| `--card-text-color`      | `#333`  |
| `--card-highlight-color` | `#c00`  |

## Accessibility

- Rendered as `<article>`, so each card is a self-contained landmark-like unit.
- Always pass `image.alt`; use an empty string only for purely decorative images.
- Pick `heading_level` so headings don't skip levels on the page.

## Storybook

Stories live in `card.stories.twig` and are rendered by Drupal through the
`drupal/storybook` module. See the theme's `README.md` for setup.
