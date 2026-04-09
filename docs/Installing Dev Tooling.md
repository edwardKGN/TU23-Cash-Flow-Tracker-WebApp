1. Install:

npm install @tanstack/react-query-devtools

2. Then in main.jsx:

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

👉 This lets you:

See cache
See query states
Debug like a pro