import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Package, Users, LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { ROUTES, USER_ROLES } from '../constants/config';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: BarChart3,
      href: ROUTES.DASHBOARD,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGEMENT, USER_ROLES.USER],
    },
    {
      label: 'Master APD',
      icon: Package,
      href: ROUTES.MASTER_APD,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGEMENT],
    },
    {
      label: 'Data Karyawan',
      icon: Users,
      href: ROUTES.KARYAWAN,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGEMENT],
    },
    {
      label: 'Transaksi APD',
      icon: Home,
      href: ROUTES.TRANSAKSI,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGEMENT, USER_ROLES.USER],
    },
    {
      label: 'Pemusnahan',
      icon: Package,
      href: ROUTES.PEMUSNAHAN,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGEMENT],
    },
    {
      label: 'Settings',
      icon: Settings,
      href: ROUTES.SETTINGS,
      roles: [USER_ROLES.ADMIN],
    },
  ];

  const filteredMenu = menuItems.filter((item) => item.roles.includes(user?.role));

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40
          transition-transform duration-300 w-64
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-cyan-600">APD Manager</h1>
        </div>

        <nav className="flex-1 px-4">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors
                  ${active
                    ? 'bg-cyan-100 text-cyan-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
