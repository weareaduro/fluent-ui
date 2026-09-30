/** localStorage key — when `"1"`, all `DetailCard` bodies are collapsed app-wide. */
export const DETAIL_CARD_COLLAPSED_STORAGE_KEY = 'sa-detail-cards-collapsed';

const CHANGE_EVENT = 'sa-detail-card-collapse';

export function getDetailCardsCollapsed(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(DETAIL_CARD_COLLAPSED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setDetailCardsCollapsed(collapsed: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      DETAIL_CARD_COLLAPSED_STORAGE_KEY,
      collapsed ? '1' : '0',
    );
  } catch {
    /* quota / private mode */
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeDetailCardsCollapsed(onChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {
      /* noop */
    };
  }

  const onCustom = () => onChange();

  const onStorage = (event: StorageEvent) => {
    if (
      event.key === DETAIL_CARD_COLLAPSED_STORAGE_KEY ||
      event.key === null
    ) {
      onChange();
    }
  };

  window.addEventListener(CHANGE_EVENT, onCustom);

  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustom);

    window.removeEventListener('storage', onStorage);
  };
}
