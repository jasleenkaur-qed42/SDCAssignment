# Tab

A single tab panel. Place it inside the [Tabs](../tabs/README.md) component's
`tabs` slot. The title becomes the tab button label; the content slot is shown
when the tab is active.

Component ID: `blank:tab`

## Props

| Prop    | Type   | Required | Default | Description                     |
| ------- | ------ | -------- | ------- | ------------------------------- |
| `title` | string | yes      | –       | Label shown on the tab button.  |

## Slots

| Slot      | Description                              |
| --------- | ---------------------------------------- |
| `content` | Content shown when this tab is active.   |

## Usage in Twig

```twig
{% embed 'blank:tab' with { title: 'Overview' } only %}
  {% block content %}
    <p>Overview content goes here.</p>
  {% endblock %}
{% endembed %}
```

See the Tabs README for a full example.

## Behavior

The tab has no JavaScript of its own. It renders a `<section>` with a
`data-tab-title` attribute and an `h3.tab__heading`:

- **Without JS** (or outside a Tabs wrapper): panels stack vertically, each
  with its visible `h3` heading.
- **With JS** (`.tabs--enhanced`): `tabs.js` builds a tab button from
  `data-tab-title`, visually hides the heading, and toggles the `hidden`
  attribute on inactive panels.

## Styling

No custom properties of its own. The focus ring uses `--tabs-focus-ring` from
the parent Tabs component.

## Accessibility

- The `h3` fallback heading keeps the content navigable when JS is off; it is
  visually hidden (not removed) once enhanced.
- `tabs.js` adds `role="tabpanel"` and `aria-labelledby` linking each panel to
  its button.

## Canvas note

Only the active tab is visible in the Canvas preview. To add components to
another tab, drop them onto that tab's **Content** slot in the Layers panel.

## Storybook

No standalone stories; tabs are shown in `tabs.stories.twig`.
