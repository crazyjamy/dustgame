import { Capacitor, registerPlugin } from '@capacitor/core';

const pluginName = 'DustgameTabBar';

async function startTabBar() {
  if (Capacitor.getPlatform() !== 'ios' || !Capacitor.isPluginAvailable(pluginName)) return;

  const nav = document.querySelector('.app-shell > .navigation');
  const buttons = Array.from(nav.querySelectorAll('button[data-page]'));
  const tabBar = registerPlugin(pluginName);
  const isVisible = () => !document.body.classList.contains('modal-open')
    && !document.documentElement.classList.contains('desk-open');

  let previous;
  async function update() {
    const state = {
      visible: isVisible(),
      selected: buttons.find(button => button.classList.contains('active'))?.dataset.page ?? '',
      titles: buttons.map(button => button.getAttribute('aria-label')?.trim() || button.textContent.trim()),
      reduceMotion: document.documentElement.matches('.reduce-motion, .simple-effects'),
    };
    const snapshot = JSON.stringify(state);
    if (snapshot === previous) return;
    previous = snapshot;
    await tabBar.update(state);
  }

  const listener = await tabBar.addListener('select', ({ page }) => {
    if (isVisible()) buttons.find(button => button.dataset.page === page)?.click();
  });
  try {
    await update();
  } catch (error) {
    await listener.remove();
    throw error;
  }

  nav.style.display = 'none';
  function sync() {
    void update().catch(() => {
      observer.disconnect();
      nav.style.removeProperty('display');
      void listener.remove().catch(() => {});
    });
  }
  const observer = new MutationObserver(sync);
  const classChanges = { attributeFilter: ['class'] };
  observer.observe(document.body, classChanges);
  observer.observe(document.documentElement, classChanges);
  observer.observe(nav, { subtree: true, attributeFilter: ['class', 'aria-label'] });
  // Catch any navigation or modal change while the native bar was mounting.
  sync();
}

void startTabBar().catch(() => {});
