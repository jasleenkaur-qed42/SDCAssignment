# Banner

A hero banner with a heading, subheading, optional image and an optional slot
for call-to-action buttons. The image sits beside the text on wider screens.

Component ID: `blank:banner`

## Props

| Prop            | Type                          | Required | Default | Description                                                          |
| --------------- | ----------------------------- | -------- | ------- | -------------------------------------------------------------------- |
| `heading`       | string                        | yes      | –       | Main heading text.                                                   |
| `heading_level` | `h1` \| `h2` \| `h3`          | no       | `h1`    | Heading element. Invalid values fall back to `h1`.                   |
| `subheading`    | string                        | no       | –       | Supporting text under the heading.                                   |
| `image`         | `{ src, alt, width, height }` | no       | –       | Image beside the text. Uses Canvas's image schema (media picker). Adds `.banner--with-image` when set. |

## Slots

| Slot      | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| `actions` | Call-to-action buttons (e.g. `blank:button`) under the subheading.  |

The `.banner__actions` wrapper is always rendered so Canvas can find the slot
for drag and drop; CSS hides it when empty.

## Usage in Twig

```twig
{% embed 'blank:banner' with {
  heading: 'Build pages faster with Canvas',
  heading_level: 'h1',
  subheading: 'Reusable components, assembled visually.',
  image: { src: '/path/to/hero.jpg', alt: 'Team working at a whiteboard', width: 640, height: 360 },
} only %}
  {% block actions %}
    {% include 'blank:button' with { label: 'Get started', url: '/start' } only %}
    {% include 'blank:button' with { label: 'Learn more', url: '/about', variant: 'secondary' } only %}
  {% endblock %}
{% endembed %}
```

Without actions, a plain `include` is enough.

## Styling

Override these custom properties on `.banner` (or a parent):

| Property                     | Default                      |
| ---------------------------- | ---------------------------- |
| `--banner-bg`                | `#1f1f2e`                    |
| `--banner-text-color`        | `#fff`                       |
| `--banner-subheading-color`  | `#d0d0dc`                    |
| `--banner-accent-color`      | `#ff6b2c`                    |
| `--banner-radius`            | `20px`                       |
| `--banner-padding`           | `clamp(1.5rem, 4vw, 3.5rem)` |
| `--banner-gap`               | `clamp(1.5rem, 4vw, 3rem)`   |

Buttons inside the banner are re-themed via `--button-*` properties so they
read on the dark background (secondary buttons get white text and border).

## Accessibility

- Rendered as `<section>`.
- Use `h1` only once per page (typically the top banner); use `h2`/`h3` for
  banners further down.
- Always pass `image.alt`; use an empty string only for decorative images.

## Storybook

Stories live in `banner.stories.twig` (Default, With image).
