# Page Transition System

This document explains how to use the new page transition system with custom animation.

## Components

### 1. TransitionProvider

The `TransitionProvider` manages the state of transitions and handles navigation. It should be placed at the root of your application, typically in `app/layout.tsx`.

```tsx
import { TransitionProvider } from '@/contexts/TransitionContext';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <TransitionProvider>
          {/* Rest of your application */}
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
```

### 2. TransitionLink

`TransitionLink` is a drop-in replacement for Next.js `Link` component. It displays a transition animation before navigating to a new page.

```tsx
import TransitionLink from '@/components/NewTransitionLink';

export function Navigation() {
  return (
    <nav>
      <TransitionLink href="/">Home</TransitionLink>
      <TransitionLink href="/about">About</TransitionLink>
      <TransitionLink href="/catalog">Catalog</TransitionLink>
    </nav>
  );
}
```

### 3. TransitionScreen

`TransitionScreen` is the component that displays the actual animation. You don't need to use this directly as it's managed by the `TransitionProvider`.

## How to Use

1. Replace `TransitionProvider` import in `app/layout.tsx`:
   
   ```tsx
   // Change from
   import { TransitionProvider } from '@/components/TransitionLink';
   // To
   import { TransitionProvider } from '@/contexts/TransitionContext';
   ```

2. Replace regular `Link` components or current `TransitionLink` components with new ones:
   
   ```tsx
   // Change from
   import Link from 'next/link';
   // Or from
   import TransitionLink from '@/components/TransitionLink';

   // To
   import TransitionLink from '@/components/NewTransitionLink';
   ```

3. Use the hook directly if you need programmatic navigation:
   
   ```tsx
   import { useTransition } from '@/contexts/TransitionContext';

   export function SomeComponent() {
     const { startTransition } = useTransition();

     const handleClick = () => {
       // Start transition first, then navigate
       startTransition('/some-page');
     };

     return (
       <button onClick={handleClick}>Go to Page</button>
     );
   }
   ```

## Implementation Notes

- The transition system uses Framer Motion for animations
- External links (starting with `http`) and anchor links (starting with `#`) don't trigger transitions
- Transitions are skipped when modifier keys (Ctrl, Alt, Shift, Meta) are pressed
- A safety timer prevents transitions from getting stuck
- Navigation happens after 70% of the animation is complete for a smooth experience 