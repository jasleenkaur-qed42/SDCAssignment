/**
 * Storybook in "server" mode: every story is rendered by Drupal through the
 * drupal/storybook module (/storybook/stories/render/{hash}).
 *
 * Stories are written as *.stories.twig next to each component and compiled
 * to *.stories.json with `ddev drush storybook:generate-all-stories`.
 */

/** @type { import('@storybook/server-webpack5').StorybookConfig } */
const config = {
  framework: '@storybook/server-webpack5',
  stories: ['../components/**/*.stories.json'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
};

export default config;
