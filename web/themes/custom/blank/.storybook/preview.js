// Drupal (DDEV) endpoint that renders stories. Stories are compiled with
// --omit-server-url, so this is the single place to change the site URL.
const DRUPAL_URL = 'https://my-drupalcms-site.ddev.site';

/** @type { import('@storybook/server-webpack5').Preview } */
const preview = {
  parameters: {
    server: {
      url: `${DRUPAL_URL}/storybook/stories/render`,
    },
    layout: 'padded',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    a11y: {
      // Report accessibility violations in the "Accessibility" panel.
      test: 'todo',
    },
  },
};

export default preview;
