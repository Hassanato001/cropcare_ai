import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsSection = ({ className = '' }) => {
  const diseaseFrequencyData = [
    { name: 'Bacterial Blight', count: 12, percentage: 35 },
    { name: 'Mosaic Virus', count: 8, percentage: 24 },
    { name: 'Brown Streak', count: 7, percentage: 21 },
    { name: 'Anthracnose', count: 4, percentage: 12 },
    { name: 'Leaf Spot', count: 3, percentage: 8 }
  ];

  const seasonalData = [
    { month: 'Jan', diagnoses: 4 },
    { month: 'Feb', diagnoses: 6 },
    { month: 'Mar', diagnoses: 8 },
    { month: 'Apr', diagnoses: 12 },
    { month: 'May', diagnoses: 15 },
    { month: 'Jun', diagnoses: 18 },
    { month: 'Jul', diagnoses: 14 },
    { month: 'Aug', diagnoses: 10 },
    { month: 'Sep', diagnoses: 8 },
    { month: 'Oct', diagnoses: 6 },
    { month: 'Nov', diagnoses: 4 },
    { month: 'Dec', diagnoses: 3 }
  ];

  const treatmentSuccessData = [
    { name: 'Successful', value: 78, color: 'var(--color-success)' },
    { name: 'In Progress', value: 15, color: 'var(--color-warning)' },
    { name: 'Failed', value: 7, color: 'var(--color-error)' }
  ];

  const cropHealthData = [
    { crop: 'Cassava', healthy: 85, diseased: 15 },
    { crop: 'Yam', healthy: 92, diseased: 8 },
    { crop: 'Maize', healthy: 78, diseased: 22 }
  ];

  const StatCard = ({ title, value, subtitle, icon, color = 'var(--color-primary)' }) => (
    <div className="bg-card border border-border rounded-agricultural-md p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-agricultural-sm flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <Icon name={icon} size={20} color={color} />
        </div>
        <span className="text-2xl font-heading font-heading-bold text-foreground">{value}</span>
      </div>
      <h3 className="text-sm font-heading font-heading-medium text-foreground mb-1">{title}</h3>
      <p className="text-xs font-caption text-text-secondary">{subtitle}</p>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">Analytics Overview</h2>
          <p className="text-sm font-caption text-text-secondary">Insights from your diagnosis history</p>
        </div>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span className="text-sm font-caption">Last 12 months</span>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Diagnoses"
          value="34"
          subtitle="This year"
          icon="Camera"
          color="var(--color-primary)"
        />
        <StatCard
          title="Success Rate"
          value="78%"
          subtitle="Treatment success"
          icon="TrendingUp"
          color="var(--color-success)"
        />
        <StatCard
          title="Active Treatments"
          value="5"
          subtitle="In progress"
          icon="Stethoscope"
          color="var(--color-warning)"
        />
        <StatCard
          title="Avg Confidence"
          value="87%"
          subtitle="AI accuracy"
          icon="Target"
          color="var(--color-accent)"
        />
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Frequency Chart */}
        <div className="bg-card border border-border rounded-agricultural-md p-6">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-4">Disease Frequency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Treatment Success Rate */}
        <div className="bg-card border border-border rounded-agricultural-md p-6">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-4">Treatment Success</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={treatmentSuccessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {treatmentSuccessData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {treatmentSuccessData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs font-caption text-text-secondary">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-card border border-border rounded-agricultural-md p-6">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-4">Seasonal Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seasonalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="diagnoses" 
                  stroke="var(--color-accent)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Health Overview */}
        <div className="bg-card border border-border rounded-agricultural-md p-6">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-4">Crop Health Overview</h3>
          <div className="space-y-4">
            {cropHealthData?.map((crop, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-foreground">{crop?.crop}</span>
                  <span className="text-xs font-caption text-text-secondary">
                    {crop?.healthy}% healthy
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all"
                    style={{ width: `${crop?.healthy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-success/10 rounded-agricultural-md">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-sm font-heading font-heading-medium text-success">Overall Health Improving</span>
            </div>
            <p className="text-xs font-caption text-text-secondary">
              Your crop health has improved by 12% compared to last season through early detection and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;