# umami-react

A modern, typed React library for [Umami analytics](https://umami.is/)
Track page views and events from Client and Server React components with hooks or data attributes.

---

## Installation

1. Install the package with your favorite package manager
```bash
bun add umami-react
yarn add umami-react
pnpm add umami-react
npm install umami-react
```

2. Import the `UmamiAnalytics` component and wrap your application with it
```tsx
import { UmamiAnalytics } from 'umami-react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers() {
  return (
    <UmamiAnalytics
      websiteId="your-website-id"
      trackerUrl="https://your-umami-instance.com"
    >
      {children}
    </UmamiAnalytics>
  )
}
```

3. Use the `useTrack` or `useIdentify` hook to track page views, events and users.
```tsx
import { useTrack, useIdentify } from 'umami-react';

export default function Home() {
  const track = useTrack();
  const identify = useIdentify();

  useEffect(() => {
    track('pageview', { title: 'Home' });
    identify('user', { id: '123' });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button type="button" data-umami-event="hero_btn_click" data-umami-event-isbot={false}>
        Click me
      </button>
    </div>
  )
}
```

4. That's it! You're now tracking page views and events with Umami.

---

## API

### `UmamiAnalytics` props

- `src`: The URL of the Umami tracker script. This is the script that will be loaded to track page views and events. You can get this URL from your Umami instance.

- `websiteId`: The website ID that Umami has provided to track. This is a unique identifier for your website.

- `autoTrack`: Whether to automatically track page views. If set to `true`, the `umami-react` library will automatically track page views when the component is mounted. If set to `false`, you will need to manually call the `track` function to track page views.

- `hostURL`: By default, Umami will send data to wherever the script is located. You can override this to send data to another location.

- `domains`: If you want the tracker to only run on specific domains, you can add them to your tracker script. Helps if you are working in a staging/development environment.

- `tag`: If you want the tracker to collect events under a specific tag. 
Events can be filtered in the dashboard by a specific tag.

- `async`: Whether to load the script asynchronously.

- `defer`: Whether to defer the script execution.

- `onLoadError`: Callback that is called when the Umami tracker could not be loaded. This can be useful for debugging.

- `onLoad`: Callback that is called when the Umami tracker has been loaded. This can be useful for debugging.

- `children`: The children to render. Children that calls `umami-react` functions should be here.

```tsx
import { UmamiAnalytics } from 'umami-react';

export default function App({ children }) {
  return (
    <UmamiAnalytics
      src="https://analytics.yourapp.com/script.js"
      websiteId="your-website-id"
      autoTrack={false}
      domains={['yourapp.com']}
      tag="br"
      async
      defer
    >
      {children}
    </UmamiAnalytics>
  )
}
```
  

### `useTrack` hook

`useTrack` is a hook that returns a function to track page views and events. The function takes two arguments: the event type and the optional event data.

```tsx
const track = useTrack();

track('pageview');
track('btn_signup_click');
track('logout', { expiredToken: true });
```

### `useIdentify` hook

`useIdentify` is a hook that returns a function to identify users. The function a single argument: the user data.

```tsx
const identify = useIdentify();

identify({ id: '123', language: navigator.language });
identify({ theme: 'dark', prefersDarkMode: true, prefersReducedMotion: false });
``` 

---

## License

The `umami-react` library is open-source software licensed under the [MIT](LICENSE).
