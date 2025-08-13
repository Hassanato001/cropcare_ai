import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import LanguageSwitcher from './LanguageSwitcher';

const GlobalHeader = ({ userType = 'farmer', notifications = [], onMenuToggle }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const Logo = () => (
    <Link to={userType === 'farmer' ? '/farmer-dashboard' : '/agricultural-extension-portal'} className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-primary rounded-agricultural-md flex items-center justify-center">
        <Icon name="Sprout" size={24} color="white" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-heading-bold text-primary">CropCare AI</h1>
        <p className="text-xs font-caption text-text-secondary">Smart Agriculture</p>
      </div>
    </Link>
  );

  const NotificationBadge = () => (
    <button
      onClick={handleNotificationClick}
      className="relative p-2 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted"
    >
      <Icon name="Bell" size={20} />
      {unreadNotifications > 0 && (
        <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
          {unreadNotifications > 9 ? '9+' : unreadNotifications}
        </span>
      )}
    </button>
  );

  const UserProfile = () => (
    <button
      onClick={handleUserMenuClick}
      className="flex items-center space-x-2 p-2 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted"
    >
      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
        <Icon name="User" size={16} color="white" />
      </div>
      <span className="hidden md:block text-sm font-body">
        {userType === 'farmer' ? 'Farmer' : 'Extension Officer'}
      </span>
      <Icon name="ChevronDown" size={16} />
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          {userType === 'extension' && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted"
            >
              <Icon name="Menu" size={20} />
            </button>
          )}
          <Logo />
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          
          {userType === 'farmer' && (
            <div className="hidden sm:flex items-center space-x-1 px-3 py-1 bg-success/10 rounded-agricultural-md">
              <Icon name="CloudSun" size={16} color="var(--color-success)" />
              <span className="text-sm font-caption text-success">28°C</span>
            </div>
          )}

          <NotificationBadge />
          <UserProfile />
        </div>
      </div>
      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg z-dropdown">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading font-heading-semibold text-popover-foreground">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Icon name="Bell" size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm font-caption">No notifications</p>
              </div>
            ) : (
              notifications?.slice(0, 5)?.map((notification, index) => (
                <div key={index} className={`p-4 border-b border-border last:border-b-0 ${!notification?.read ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${!notification?.read ? 'bg-accent' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-body text-popover-foreground">{notification?.message}</p>
                      <p className="text-xs font-caption text-muted-foreground mt-1">{notification?.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {notifications?.length > 5 && (
            <div className="p-3 border-t border-border">
              <button className="w-full text-sm font-body text-primary hover:text-primary/80 transition-agricultural">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="absolute top-16 right-4 w-48 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg z-dropdown">
          <div className="p-2">
            <button className="w-full flex items-center space-x-2 p-2 text-left text-popover-foreground hover:bg-muted rounded-agricultural-sm transition-agricultural">
              <Icon name="User" size={16} />
              <span className="text-sm font-body">Profile</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left text-popover-foreground hover:bg-muted rounded-agricultural-sm transition-agricultural">
              <Icon name="Settings" size={16} />
              <span className="text-sm font-body">Settings</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left text-popover-foreground hover:bg-muted rounded-agricultural-sm transition-agricultural">
              <Icon name="HelpCircle" size={16} />
              <span className="text-sm font-body">Help</span>
            </button>
            <hr className="my-2 border-border" />
            <button className="w-full flex items-center space-x-2 p-2 text-left text-error hover:bg-error/10 rounded-agricultural-sm transition-agricultural">
              <Icon name="LogOut" size={16} />
              <span className="text-sm font-body">Sign out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;