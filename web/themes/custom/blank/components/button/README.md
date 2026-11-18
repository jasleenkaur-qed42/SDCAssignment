# Button

A call-to-action button in three visual variants. Renders a link (`<a>`) when
a URL is given, otherwise a native `<button type="button">`.

Component ID: `blank:button`

## Props

| Prop      | Type                                    | Required | Default   | Description                                              |
| --------- | --------------------------------------- | -------- | --------- | -------------------------------------------------------- |
| `label`   | string                                  | yes      | –         | Text shown on the button.                                |
| `url`     | string (URI reference)                  | no       | –         | Link target. Leave empty to render a plain `<button>`.   |
| `variant` | `primary` \| `secondary` \| `tertiary`  | no       | `primary` | Visual style. Adds the `.button--{variant}` class.       |

No slots.

## Variants

| Variant     | Look                                         |
| ----------- | -------------------------------------------- |
| `primary`   | Solid red fill, white text.                  |
| `secondary` | Transparent with red text and red border.    |
| `tertiary`  | Text-only, dark grey, minimal padding.       |

## Usage in Twig

```twig
{% include 'blank:button' with {
  label: 'Get started',
  url: '/start',
  variant: 'primary',
} only %}
```

## Styling

Override these custom properties on `.button` (or a parent):

| Property                | Default                  |
| ----------------------- | ------------------------ |
| `--button-bg`           | `#c00`                   |
| `--button-bg-hover`     | `#a00`                   |
| `--button-color`        | `#fff`                   |
| `--button-border-color` | `var(--button-bg)`       |
| `--button-radius`       | `999px`                  |
| `--button-padding-y`    | `0.75rem`                |
| `--button-padding-x`    | `1.5rem`                 |
| `--button-focus-ring`   | `#1a73e8`                |

Parent components re-theme buttons this way — see Banner and Section
(accent background).

## Accessibility

- Uses the correct element for the job: `<a>` for navigation, `<button>` for
  in-page actions.
- Visible focus ring via `--button-focus-ring`.
- Write labels that make sense out of context ("Download the report", not
  "Click here").

## Storybook

Stories live in `button.stories.twig`.
