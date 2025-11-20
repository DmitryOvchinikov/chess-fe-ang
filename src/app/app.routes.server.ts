import { RenderMode, ServerRoute } from '@angular/ssr';

// Server-side prerender config only (no client router config here)
export const serverRoutes: ServerRoute[] = [
  {
    // Prerender the root path; the client router will render the component
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    // Prerender any other paths to allow client-side routing to take over
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
