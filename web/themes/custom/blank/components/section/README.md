# Section

A page section with an optional heading and intro, laying out its content in
a responsive grid of 1 to 4 columns.

Component ID: `blank:section`

## Props

| Prop         | Type                             | Required | Default | Description                                                        |
| ------------ | -------------------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `heading`    | string                           | no       | –       | Section heading, rendered as `h2` with an accent underline.        |
| `intro`      | string                           | no       | –       | Short text under the heading.                                      |
| `columns`    | `'1'` \| `'2'` \| `'3'` \| `'4'` | no       | `'1'`   | Grid columns on wide screens. **Must be a string**, not a number.  |
| `background` | `none` \| `muted` \| `accent`    | no       | `none`  | Section background.                                                |
| `align`      | `start` \| `center`              | no       | `start` | Heading/intro alignment. (`left`/`right` are not valid values.)    |

Invalid values fall back to the defaults in the template, but component
validation rejects them first in development — e.g. `columns: 3` (integer) or
`align: 'left'` will make the render fail.

## Slots

| Slot      | Description                                    |
| --------- | ---------------------------------------------- |
| `content` | Components laid out in the section grid.       |

## Responsive grid

| Columns | < 40rem | 40rem – 64rem | ≥ 64rem |
| ------- | ------- | ------------- | ------- |
| 1       | 1       | 1             | 1       |
| 2       | 1       | 2             | 2       |
| 3       | 1       | 2             | 3       |
| 4       | 1       | 2             | 4       |

In a 1-column section, direct-child buttons sit in a row (flex-wrap) instead of
stacking full width; with `align: center` they are centred too.

## Usage in Twig

```twig
{% embed 'blank:section' with {
  heading: 'Featured products',
  intro: 'Hand-picked for this season.',
  columns: '3',
  background: 'muted',
  align: 'center',
} only %}
  {% block content %}
    {% include 'blank:card' with { header: 'Card one', heading_level: 'h3' } only %}
    {% include 'blank:card' with { header: 'Card two', heading_level: 'h3' } only %}
    {% include 'blank:card' with { header: 'Card three', heading_level: 'h3' } only %}
  {% endblock %}
{% endembed %}
```

In Storybook stories, cast `columns` to a string (`columns: columns ~ ''`),
because Storybook sends numeric-looking args as integers.

## Styling

Override these custom properties on `.section` (or a parent):

| Property                 | Default                     |
| ------------------------ | --------------------------- |
| `--section-max-width`    | `72rem`                     |
| `--section-gutter`       | `clamp(1rem, 4vw, 2rem)`    |
| `--section-padding-y`    | `clamp(2.5rem, 6vw, 4.5rem)`|
| `--section-gap`          | `clamp(1rem, 2.5vw, 1.75rem)` |
| `--section-bg`           | `transparent`               |
| `--section-color`        | `#1f1f2e`                   |
| `--section-muted-color`  | `#555`                      |
| `--section-accent`       | `#c00`                      |

The `accent` background inverts colours (red background, white text) and
re-themes buttons inside it to white.

## Accessibility

- Rendered as `<section>` with an `h2` heading, so child cards should use
  `heading_level: 'h3'`.
- Check contrast of child components on the `accent` background.

## Storybook

Stories live in `section.stories.twig` (Default, Alternate).
