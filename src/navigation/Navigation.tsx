import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import SkeletonLoader from '../components/common/skeleton/SkeletonLoader';

// Admin components
import ProtectedRoute from '../admin/components/ProtectedRoute';
import AdminLayout from '../admin/components/layout/AdminLayout';
import AdminLogin from '../admin/pages/Login';
import AdminDashboard from '../admin/pages/Dashboard';
import TravelPackagesAdmin from '../admin/pages/TravelPackages';
import CarRentalsAdmin from '../admin/pages/CarRentals';
import DestinationsAdmin from '../admin/pages/Destinations';
import SlidersAdmin from '../admin/pages/Sliders';
import SettingsAdmin from '../admin/pages/Settings';

// Lazy load only the pages we need
const HomeOneMain = lazy(() => import('../pages/HomeOneMain'));
const CarRentalHomeMain = lazy(() => import('../pages/CarRentalHomeMain'));
const TravelPackagesMain = lazy(() => import('../pages/TravelPackagesMain'));
const CarListingMain = lazy(() => import('../pages/CarListingMain'));
const PackageDetailsMain = lazy(() => import('../pages/PackageDetailsMain'));
const CarDetailsMain = lazy(() => import('../pages/CarDetailsMain'));

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Page loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <div className="container">
      <SkeletonLoader type="card" height="300px" />
      <div className="row mt-4">
        <div className="col-md-8">
          <SkeletonLoader type="text" lines={5} />
        </div>
        <div className="col-md-4">
          <SkeletonLoader type="card" height="200px" />
        </div>
      </div>
    </div>
  </div>
);

const AppNavigation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes - only the ones you specified */}
            <Route path="/" element={<HomeOneMain />} />
            <Route path="/car-rental-home" element={<CarRentalHomeMain />} />
            <Route path="/travel-packages" element={<TravelPackagesMain />} />
            <Route path="/car-listing" element={<CarListingMain />} />
            <Route path="/package-details/:id" element={<PackageDetailsMain />} />
            <Route path="/car-details/:id" element={<CarDetailsMain />} />
            <Route path="*" element={<HomeOneMain />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/packages" element={<TravelPackagesAdmin />} />
                      <Route path="/cars" element={<CarRentalsAdmin />} />
                      <Route path="/destinations" element={<DestinationsAdmin />} />
                      <Route path="/sliders" element={<SlidersAdmin />} />
                      <Route path="/settings" element={<SettingsAdmin />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
};

export default AppNavigation;
