import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { handleNavigateCommands, type Navigation } from './navigation';

// Renders the router and handles the remotes' nav:navigate commands while mounted.
export function NavigationRoot({ router, intents }: Navigation) {
  useEffect(() => handleNavigateCommands(router, intents), [router, intents]);
  return <RouterProvider router={router} />;
}
