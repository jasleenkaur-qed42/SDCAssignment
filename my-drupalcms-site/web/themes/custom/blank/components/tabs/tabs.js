/**
 * @file
 * Tabs behavior: builds an ARIA tablist from child .tab panels and handles
 * click and keyboard (Arrow keys, Home, End) navigation.
 */
((Drupal, once) => {
  let counter = 0;

  function initTabs(tabs) {
    const list = tabs.querySelector(':scope > .tabs__list');
    const panelsWrapper = tabs.querySelector(':scope > .tabs__panels');
    if (!list || !panelsWrapper) {
      return;
    }

    // Only direct tab panels of this component (supports nested tabs).
    const panels = Array.from(panelsWrapper.querySelectorAll('.tab')).filter(
      (panel) => panel.closest('.tabs') === tabs,
    );
    if (!panels.length) {
      return;
    }

    const uid = `tabs-${(counter += 1)}`;
    list.replaceChildren();

    const buttons = panels.map((panel, index) => {
      const button = document.createElement('button');
      const buttonId = `${uid}-tab-${index}`;
      const panelId = panel.id || `${uid}-panel-${index}`;

      button.type = 'button';
      button.className = 'tabs__button';
      button.id = buttonId;
      button.textContent = panel.dataset.tabTitle || `Tab ${index + 1}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panelId);

      panel.id = panelId;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', buttonId);
      panel.tabIndex = 0;

      list.appendChild(button);
      return button;
    });

    const select = (index, focus = false) => {
      buttons.forEach((button, i) => {
        const active = i === index;
        button.setAttribute('aria-selected', active ? 'true' : 'false');
        button.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
      });
      if (focus) {
        buttons[index].focus();
      }
    };

    list.addEventListener('click', (event) => {
      const button = event.target.closest('.tabs__button');
      if (button) {
        select(buttons.indexOf(button));
      }
    });

    list.addEventListener('keydown', (event) => {
      const current = buttons.indexOf(document.activeElement);
      if (current === -1) {
        return;
      }
      const last = buttons.length - 1;
      const keys = {
        ArrowRight: current === last ? 0 : current + 1,
        ArrowLeft: current === 0 ? last : current - 1,
        Home: 0,
        End: last,
      };
      if (event.key in keys) {
        event.preventDefault();
        select(keys[event.key], true);
      }
    });

    list.hidden = false;
    tabs.classList.add('tabs--enhanced');
    select(0);
  }

  Drupal.behaviors.blankTabs = {
    attach(context) {
      once('blank-tabs', '.tabs', context).forEach(initTabs);
    },
  };
})(Drupal, once);
