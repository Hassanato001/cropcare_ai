import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FarmerTabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/farmer-dashboard',
      label: 'Dashboard',
      icon: 'Home',
      badge: null
    },
    {
      path: '/crop-disease-diagnosis',
      label: 'Diagnose',
      icon: 'Camera',
      badge: null
    },
    {
      path: '/diagnosis-history-tracking',
      label: 'History',
      icon: 'History',
      badge: null
    },
    {
      path: '/educational-resources',
      label: 'Learn',
      icon: 'BookOpen',
      badge: 'New'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  // Mobile bottom tab navigation
  const MobileNavigation = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-tabs bg-background border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-agricultural-sm transition-agricultural min-w-0 flex-1 ${
              isActive(item?.path)
                ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-muted'
            }`}
          >
            <div className="relative">
              <Icon 
                name={item?.icon} 
                size={20} 
                color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
              />
              {item?.badge && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full px-1.5 py-0.5 font-mono text-[10px]">
                  {item?.badge}
                </span>
              )}
            </div>
            <span className={`text-xs font-caption truncate ${isActive(item?.path) ? 'font-medium' : ''}`}>
              {item?.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );

  // Desktop horizontal navigation
  const DesktopNavigation = () => (
    <nav className="hidden lg:flex items-center space-x-1 ml-8">
      {navigationItems?.map((item) => (
        <Link
          key={item?.path}
          to={item?.path}
          className={`flex items-center space-x-2 px-4 py-2 rounded-agricultural-md transition-agricultural ${
            isActive(item?.path)
              ? 'text-primary bg-primary/10 font-medium' :'text-text-secondary hover:text-primary hover:bg-muted'
          }`}
        >
          <div className="relative">
            <Icon 
              name={item?.icon} 
              size={18} 
              color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
            />
            {item?.badge && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full px-1.5 py-0.5 font-mono text-[10px]">
                {item?.badge}
              </span>
            )}
          </div>
          <span className="text-sm font-body">{item?.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className={className}>
      <MobileNavigation />
      <DesktopNavigation />
    </div>
  );
};

export default FarmerTabNavigation;