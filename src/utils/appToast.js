let appToast = null;

export function registerAppToast(instance) {
  appToast = instance;
}

export function showAppToast({ severity = 'info', summary = 'Update', detail = '', life = 2200, closable = true }) {
  appToast?.show({
    severity,
    summary,
    detail,
    life,
    closable,
  });
}
