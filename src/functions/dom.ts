export function withTransition(cb: () => unknown) {
  if (!document.startViewTransition) {
    cb();
    return;
  }

  document.startViewTransition(cb);
}
