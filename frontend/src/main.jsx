import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PostHogProvider } from '@posthog/react'
import './index.css'
import App from './App.jsx'
import posthog from 'posthog-js'

const options = {  
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,  
  defaults: '2026-01-30', 
}

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only',
  capture_pageview: true,
  capture_pageleave: true,
  autocapture: true,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PostHogProvider   
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}   
      options={options}  
    >  
      <App />
    </PostHogProvider>
    </BrowserRouter>
  </StrictMode>,
)
