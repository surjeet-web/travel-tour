import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import {
  BuildingOfficeIcon,
  TruckIcon,
  MapPinIcon,
  PhotoIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalPackages: number;
  totalCars: number;
  totalDestinations: number;
  totalSliders: number;
  totalUsers: number;
  totalRevenue: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPackages: 0,
    totalCars: 0,
    totalDestinations: 0,
    totalSliders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          packagesResult,
          carsResult,
          destinationsResult,
          slidersResult,
        ] = await Promise.all([
          supabase.from('travel_packages').select('id', { count: 'exact' }),
          supabase.from('car_rentals').select('id', { count: 'exact' }),
          supabase.from('destinations').select('id', { count: 'exact' }),
          supabase.from('sliders').select('id', { count: 'exact' }),
        ]);

        setStats({
          totalPackages: packagesResult.count || 0,
          totalCars: carsResult.count || 0,
          totalDestinations: destinationsResult.count || 0,
          totalSliders: slidersResult.count || 0,
          totalUsers: 0, // Will implement later
          totalRevenue: 0, // Will implement later
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Travel Packages',
      value: stats.totalPackages,
      icon: BuildingOfficeIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Car Rentals',
      value: stats.totalCars,
      icon: TruckIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Destinations',
      value: stats.totalDestinations,
      icon: MapPinIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Sliders/Banners',
      value: stats.totalSliders,
      icon: PhotoIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: UserGroupIcon,
      color: 'bg-red-500',
    },
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'bg-indigo-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your admin dashboard. Here's an overview of your travel website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div
                    className={`${stat.color} rounded-md p-3`}
                  >
                    <stat.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">
              No recent activity to display. Activity tracking will be implemented soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;