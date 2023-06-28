const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, event => {
    const { nextUrl } = event.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  })

  window.addEventListener('popstate', event => {
    onRoute();
  })
}

export const push = nextUrl => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
    detail: {
      nextUrl,
    }
  }))
}
