export default function documentReady(fn) {
  const state = document.readyState;
  if (state === 'complete' || state === 'interactive') {
    setTimeout(fn, 0);
    return;
  }

  document.addEventListener('DOMContentLoaded', fn);
}
