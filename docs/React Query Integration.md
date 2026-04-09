1. Install
cd react-bootcamp [Where the vite-React server is configured]
npm install @tanstack/react-query

2. Setup Provider (IMPORTANT)

In main.jsx:

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</React.StrictMode>