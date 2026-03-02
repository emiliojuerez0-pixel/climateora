import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ImpactosPage from '@/components/pages/ImpactosPage';
import AnalisisPage from '@/components/pages/AnalisisPage';
import MapaPage from '@/components/pages/MapaPage';
import CalculadoraPage from '@/components/pages/CalculadoraPage';
import ReportaPage from '@/components/pages/ReportaPage';
import CiberseguridadPage from '@/components/pages/CiberseguridadPage';
import ImpactoDetailPage from '@/components/pages/ImpactoDetailPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "impactos",
        element: <ImpactosPage />,
        routeMetadata: {
          pageIdentifier: 'impactos',
        },
      },
      {
        path: "impactos/:id",
        element: <ImpactoDetailPage />,
        routeMetadata: {
          pageIdentifier: 'impacto-detail',
        },
      },
      {
        path: "analisis",
        element: <AnalisisPage />,
        routeMetadata: {
          pageIdentifier: 'analisis',
        },
      },
      {
        path: "mapa",
        element: <MapaPage />,
        routeMetadata: {
          pageIdentifier: 'mapa',
        },
      },
      {
        path: "calculadora",
        element: <CalculadoraPage />,
        routeMetadata: {
          pageIdentifier: 'calculadora',
        },
      },
      {
        path: "reporta",
        element: <ReportaPage />,
        routeMetadata: {
          pageIdentifier: 'reporta',
        },
      },
      {
        path: "ciberseguridad",
        element: <CiberseguridadPage />,
        routeMetadata: {
          pageIdentifier: 'ciberseguridad',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
