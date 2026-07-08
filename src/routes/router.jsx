import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { Spinner } from '@/components/ui/Spinner'
import HomePage from '@/pages/HomePage'

/* eslint-disable react/only-export-components -- route config module with inline lazy wrappers */
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const FeaturesPage = lazy(() => import('@/pages/FeaturesPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const RouteErrorPage = lazy(() => import('@/pages/RouteErrorPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const routeFallback = (
  <div className="grid min-h-[60vh] place-items-center">
    <Spinner size="lg" label="Loading page" />
  </div>
)

function LazyPage({ children }) {
  return <Suspense fallback={routeFallback}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <LazyPage>
        <RouteErrorPage />
      </LazyPage>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'dashboard',
        element: (
          <LazyPage>
            <DashboardPage />
          </LazyPage>
        ),
      },
      {
        path: 'features',
        element: (
          <LazyPage>
            <FeaturesPage />
          </LazyPage>
        ),
      },
      {
        path: 'pricing',
        element: (
          <LazyPage>
            <PricingPage />
          </LazyPage>
        ),
      },
      {
        path: 'about',
        element: (
          <LazyPage>
            <AboutPage />
          </LazyPage>
        ),
      },
      {
        path: 'contact',
        element: (
          <LazyPage>
            <ContactPage />
          </LazyPage>
        ),
      },
      {
        path: '*',
        element: (
          <LazyPage>
            <NotFoundPage />
          </LazyPage>
        ),
      },
    ],
  },
])
