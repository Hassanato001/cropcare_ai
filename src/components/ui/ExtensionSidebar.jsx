import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ExtensionSidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['dashboard']);

  const toggleSection = (sectionId) => {
    if (isCollapsed) return;
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      items: [
        { path: '/agricultural-extension-portal', label: 'Overview', icon: 'Home' }
      ]
    },
    {
      id: 'farmers',
      label: 'Farmer Management',
      icon: 'Users',
      items: [
        { path: '/farmer-directory', label: 'Farmer Directory', icon: 'UserCheck' },
        { path: '/farmer-support', label: 'Support Requests', icon: 'MessageSquare', badge: '3' },
        { path: '/farmer-training', label: 'Training Programs', icon: 'GraduationCap' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: 'BarChart3',
      items: [
        { path: '/disease-analytics', label: 'Disease Trends', icon: 'TrendingUp' },
        { path: '/regional-reports', label: 'Regional Reports', icon: 'Map' },
        { path: '/crop-insights', label: 'Crop Insights', icon: 'Leaf' }
      ]
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: 'FileText',
      items: [
        { path: '/educational-content', label: 'Educational Resources', icon: 'BookOpen' },
        { path: '/disease-database', label: 'Disease Database', icon: 'Database' },
        { path: '/treatment-guides', label: 'Treatment Guides', icon: 'Stethoscope' }
      ]
    },
    {
      id: 'system',
      label: 'System',
      icon: 'Settings',
      items: [
        { path: '/system-settings', label: 'Settings', icon: 'Cog' },
        { path: '/user-management', label: 'User Management', icon: 'Shield' },
        { path: '/system-logs', label: 'System Logs', icon: 'FileText' }
      ]
    }
  ];

  const isActive = (path) => location?.pathname === path;
  const isSectionActive = (section) => section?.items?.some(item => isActive(item?.path));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-agricultural-md flex items-center justify-center">
              <Icon name="Sprout" size={18} color="white" />
            </div>
            <div>
              <h2 className="text-sm font-heading font-heading-semibold text-foreground">Extension Portal</h2>
              <p className="text-xs font-caption text-text-secondary">Agricultural Management</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-1.5 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-3">
          {navigationSections?.map((section) => (
            <div key={section?.id} className="space-y-1">
              <button
                onClick={() => toggleSection(section?.id)}
                className={`w-full flex items-center justify-between p-2 text-left rounded-agricultural-sm transition-agricultural ${
                  isSectionActive(section) 
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={section?.icon} 
                    size={18} 
                    color={isSectionActive(section) ? 'var(--color-primary)' : 'currentColor'} 
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-body">{section?.label}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <Icon 
                    name="ChevronDown" 
                    size={14} 
                    className={`transition-transform ${
                      expandedSections?.includes(section?.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Section Items */}
              {!isCollapsed && expandedSections?.includes(section?.id) && (
                <div className="ml-6 space-y-1">
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center justify-between p-2 rounded-agricultural-sm transition-agricultural ${
                        isActive(item?.path)
                          ? 'text-primary bg-primary/10 font-medium' :'text-text-secondary hover:text-primary hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={item?.icon} 
                          size={16} 
                          color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
                        />
                        <span className="text-sm font-body">{item?.label}</span>
                      </div>
                      {item?.badge && (
                        <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-mono">
                          {item?.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}

              {/* Collapsed tooltips */}
              {isCollapsed && (
                <div className="relative group">
                  <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-dropdown min-w-max">
                    <p className="text-sm font-body text-popover-foreground font-medium mb-2">{section?.label}</p>
                    <div className="space-y-1">
                      {section?.items?.map((item) => (
                        <Link
                          key={item?.path}
                          to={item?.path}
                          className="flex items-center space-x-2 p-1 text-sm font-body text-popover-foreground hover:text-primary transition-agricultural"
                        >
                          <Icon name={item?.icon} size={14} />
                          <span>{item?.label}</span>
                          {item?.badge && (
                            <span className="bg-accent text-accent-foreground text-xs rounded-full px-1.5 py-0.5 font-mono">
                              {item?.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3 p-2 bg-muted rounded-agricultural-md">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body text-foreground truncate">Dr. Amina Hassan</p>
              <p className="text-xs font-caption text-text-secondary truncate">Extension Officer</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col fixed left-0 top-16 bottom-0 z-sidebar bg-background border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      <div className={`lg:hidden fixed inset-0 z-sidebar transition-opacity ${
        isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="absolute inset-0 bg-black/50" onClick={onToggle} />
        <aside className={`absolute left-0 top-0 bottom-0 w-64 bg-background border-r border-border transform transition-transform ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          <SidebarContent />
        </aside>
      </div>
    </>
  );
};

export default ExtensionSidebar;