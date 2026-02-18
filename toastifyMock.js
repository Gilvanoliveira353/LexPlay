export function mockToastify() {
  return () => ({
    showToast: () => {}
  });
}

export function unMockToastify() {
  delete global.Toastify;
}
