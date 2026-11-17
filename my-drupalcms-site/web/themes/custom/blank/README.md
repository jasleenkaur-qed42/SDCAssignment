# Blank theme

Components live in `components/<name>/` as Single Directory Components (SDC).
Each component folder contains:

- `<name>.component.yml` – props schema (also drives the Canvas editor form)
- `<name>.twig`, `<name>.css`, `<name>.js`
- `<name>.stories.twig` – Storybook stories, rendered by Drupal
- `README.md` – props, usage and accessibility notes

## Storybook

Storybook runs in **server mode**: every story is rendered by the DDEV Drupal
site through the [`drupal/storybook`](https://www.drupal.org/project/storybook)
module, so what you see is exactly what Drupal outputs.

> CL Server (`drupal/cl_server`) is not used: its latest release only supports
> Drupal 9/10. `drupal/storybook` is its successor and supports Drupal 11.

### One-time setup (already done on this site)

1. `ddev composer require drupal/storybook -W && ddev drush en storybook`
   (`-W` lets Composer use `symfony/css-selector` 7.x, which the module needs).
2. `web/sites/default/settings.local.php` loads
   `web/sites/default/storybook.development.services.yml`, which turns on
   `storybook.development` and CORS for `http://localhost:6006`.
3. `ddev drush role:perm:add anonymous 'render storybook stories'`

Steps 2 and 3 are **local only** – never deploy them to production. If you
export config, remove the permission from `user.role.anonymous.yml` first.

### Run it

```bash
cd web/themes/custom/blank
npm install
npm run storybook        # compiles *.stories.twig → *.stories.json, opens :6006
```

After editing a `*.stories.twig` file, run `npm run stories:compile` (or
restart Storybook). Edits to a component's Twig/CSS/JS only need a browser
refresh (plus `ddev drush cr` if Twig caching is on).

### Writing stories

```twig
{% stories my_component with { title: 'Components/My component', tags: ['autodocs'], argTypes: { … } } %}
  {% story default with { name: 'Default', args: { … } } %}
    {% include 'blank:my_component' with { … } only %}
  {% endstory %}
{% endstories %}
```

Addons: Docs (auto-generated docs page) and Accessibility (axe checks).
