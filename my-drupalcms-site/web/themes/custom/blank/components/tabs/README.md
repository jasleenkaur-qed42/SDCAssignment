# Tabs

Accessible tabbed content. Add [Tab](../tab/README.md) components to the
`tabs` slot; a tab button is generated for each one. Progressive enhancement:
without JavaScript, panels simply stack with their headings.

Component ID: `blank:tabs`

## Props

| Prop    | Type                    | Required | Default     | Description                                       |
| ------- | ----------------------- | -------- | ----------- | ------------------------------------------------- |
| `style` | `underline` \| `pills`  | no       | `underline` | Visual style of the tab buttons (`.tabs--{style}`). |

## Slots

| Slot   | Description                              |
| ------ | ---------------------------------------- |
| `tabs` | Tab components (`blank:tab`), one per tab. |

## Usage in Twig

```twig
{% embed 'blank:tabs' with { style: 'pills' } only %}
  {% block tabs %}
    {% embed 'blank:tab' with { title: 'Overview' } only %}
      {% block content %}<p>Overview content.</p>{% endblock %}
    {% endembed %}
    {% embed 'blank:tab' with { title: 'Details' } only %}
      {% block content %}<p>Details content.</p>{% endblock %}
    {% endembed %}
  {% endblock %}
{% endembed %}
```

## Behavior

`tabs.js` attaches `Drupal.behaviors.blankTabs` (using `once`). It:

- Fills the (initially hidden) `.tabs__list` with one `role="tab"` button per
  child `.tab`, labelled from its `data-tab-title`.
- Links buttons and panels with `aria-controls` / `aria-labelledby`.
- Selects the first tab; inactive panels get the `hidden` attribute.
- Supports click and keyboard navigation: ←/→ (wrapping), Home, End.
- Adds `.tabs--enhanced` to the wrapper once ready.

Dependencies: `core/drupal`, `core/once`.

## Styling

Override these custom properties on `.tabs` (or a parent):

| Property             | Default                         |
| -------------------- | ------------------------------- |
| `--tabs-accent`      | `#c00`                          |
| `--tabs-color`       | `#333`                          |
| `--tabs-muted`       | `#666`                          |
| `--tabs-surface`     | `#f4f4f4`                       |
| `--tabs-focus-ring`  | `#1a73e8`                       |
| `--tabs-gap`         | `0.25rem` (`0.5rem` for pills)  |

## Accessibility

- Follows the WAI-ARIA Tabs pattern (tablist / tab / tabpanel,
  `aria-selected`, arrow-key / Home / End navigation that moves focus).
- Note: inactive tab buttons are not given `tabindex="-1"`, so every tab
  button is still reachable with Tab. Add roving tabindex if strict pattern
  compliance is needed.
- Content remains fully readable without JavaScript.

## Canvas note

Only the active tab's panel is visible in the Canvas preview. Use the Layers
panel to drop components into other tabs' **Content** slots.

## Storybook

Stories live in `tabs.stories.twig`.
