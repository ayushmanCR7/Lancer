import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './routes/authContext/Context.jsx'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
 

     <QueryClientProvider client={queryClient}>
     <AuthContextProvider>
    <App />
    
    </AuthContextProvider>
    </QueryClientProvider>

  
)
