import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardOverview = () => {
  const overviewStats = [
    {
      id: 1,
      title: "Active Farmers",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 2,
      title: "Pending Consultations",
      value: "23",
      change: "-8%",
      changeType: "negative",
      icon: "MessageSquare",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 3,
      title: "Disease Reports",
      value: "156",
      change: "+5%",
      changeType: "positive",
      icon: "AlertTriangle",
      color: "text-error",
      bgColor: "bg-error/10"
    },
    {
      id: 4,
      title: "Treatment Success",
      value: "89.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewStats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-agricultural-md p-6 shadow-agricultural-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-agricultural-md flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color?.split('-')?.[1]})`} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-mono ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-heading font-heading-bold text-foreground mb-1">
              {stat?.value}
            </h3>
            <p className="text-sm font-body text-text-secondary">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardOverview;