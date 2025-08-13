import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const DataVisualizationDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('disease-trends');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const metricOptions = [
    { value: 'disease-trends', label: 'Disease Trends' },
    { value: 'treatment-effectiveness', label: 'Treatment Effectiveness' },
    { value: 'crop-health', label: 'Crop Health Statistics' },
    { value: 'farmer-engagement', label: 'Farmer Engagement' }
  ];

  const periodOptions = [
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'quarter', label: 'Last 3 months' },
    { value: 'year', label: 'Last 12 months' }
  ];

  // Disease trends data
  const diseaseTrendsData = [
    { month: 'Jan', cassava: 45, yam: 32, maize: 28, rice: 15 },
    { month: 'Feb', cassava: 52, yam: 28, maize: 35, rice: 18 },
    { month: 'Mar', cassava: 48, yam: 35, maize: 42, rice: 22 },
    { month: 'Apr', cassava: 61, yam: 42, maize: 38, rice: 25 },
    { month: 'May', cassava: 55, yam: 38, maize: 45, rice: 20 },
    { month: 'Jun', cassava: 67, yam: 45, maize: 52, rice: 28 }
  ];

  // Treatment effectiveness data
  const treatmentEffectivenessData = [
    { treatment: 'Fungicide A', success: 89, partial: 8, failed: 3 },
    { treatment: 'Fungicide B', success: 76, partial: 15, failed: 9 },
    { treatment: 'Organic Treatment', success: 65, partial: 25, failed: 10 },
    { treatment: 'Integrated Approach', success: 92, partial: 6, failed: 2 },
    { treatment: 'Preventive Measures', success: 78, partial: 18, failed: 4 }
  ];

  // Crop health distribution
  const cropHealthData = [
    { name: 'Healthy', value: 68, color: 'var(--color-success)' },
    { name: 'Mild Issues', value: 22, color: 'var(--color-warning)' },
    { name: 'Severe Issues', value: 10, color: 'var(--color-error)' }
  ];

  // Farmer engagement data
  const farmerEngagementData = [
    { week: 'Week 1', consultations: 45, responses: 38, satisfaction: 4.2 },
    { week: 'Week 2', consultations: 52, responses: 44, satisfaction: 4.1 },
    { week: 'Week 3', consultations: 48, responses: 42, satisfaction: 4.3 },
    { week: 'Week 4', consultations: 61, responses: 55, satisfaction: 4.4 }
  ];

  const renderChart = () => {
    switch (selectedMetric) {
      case 'disease-trends':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="cassava" fill="var(--color-primary)" name="Cassava" />
                <Bar dataKey="yam" fill="var(--color-secondary)" name="Yam" />
                <Bar dataKey="maize" fill="var(--color-accent)" name="Maize" />
                <Bar dataKey="rice" fill="var(--color-success)" name="Rice" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'treatment-effectiveness':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treatmentEffectivenessData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  type="number" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  type="category" 
                  dataKey="treatment" 
                  stroke="var(--color-text-secondary)"
                  fontSize={10}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="success" fill="var(--color-success)" name="Success %" />
                <Bar dataKey="partial" fill="var(--color-warning)" name="Partial %" />
                <Bar dataKey="failed" fill="var(--color-error)" name="Failed %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'crop-health':
        return (
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropHealthData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {cropHealthData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'farmer-engagement':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={farmerEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="consultations" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Consultations"
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Responses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  const getMetricSummary = () => {
    switch (selectedMetric) {
      case 'disease-trends':
        return {
          title: 'Disease Outbreak Trends',
          description: 'Monthly disease case reports across different crop types',
          insights: [
            'Cassava diseases show highest frequency',
            'Maize issues peaked in March',
            'Rice diseases remain relatively stable'
          ]
        };
      case 'treatment-effectiveness':
        return {
          title: 'Treatment Success Rates',
          description: 'Effectiveness of different treatment approaches',
          insights: [
            'Integrated approach shows 92% success rate',
            'Organic treatments need improvement',
            'Fungicide A performs better than B'
          ]
        };
      case 'crop-health':
        return {
          title: 'Overall Crop Health Status',
          description: 'Distribution of crop health conditions across all farms',
          insights: [
            '68% of crops are healthy',
            '22% show mild issues',
            '10% require immediate attention'
          ]
        };
      case 'farmer-engagement':
        return {
          title: 'Farmer Engagement Metrics',
          description: 'Consultation requests and response patterns',
          insights: [
            'Response rate averaging 85%',
            'Satisfaction scores improving',
            'Weekly consultations increasing'
          ]
        };
      default:
        return { title: '', description: '', insights: [] };
    }
  };

  const summary = getMetricSummary();

  return (
    <div className="bg-card border border-border rounded-agricultural-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">
            Data Analytics Dashboard
          </h2>
          <div className="flex space-x-2">
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-48"
            />
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-36"
            />
          </div>
        </div>
        
        <div className="text-sm">
          <h3 className="font-heading font-heading-semibold text-foreground mb-1">
            {summary?.title}
          </h3>
          <p className="font-body text-text-secondary">
            {summary?.description}
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2">
            <div className="bg-background border border-border rounded-agricultural-md p-4">
              {renderChart()}
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-4">
            <div className="bg-background border border-border rounded-agricultural-md p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Lightbulb" size={18} color="var(--color-accent)" />
                <h4 className="font-heading font-heading-semibold text-foreground">
                  Key Insights
                </h4>
              </div>
              <ul className="space-y-2">
                {summary?.insights?.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary flex-shrink-0" />
                    <span className="font-body text-text-secondary">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="bg-background border border-border rounded-agricultural-md p-4">
              <h4 className="font-heading font-heading-semibold text-foreground mb-3">
                Quick Stats
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Total Reports</span>
                  <span className="text-sm font-mono text-foreground font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Active Cases</span>
                  <span className="text-sm font-mono text-foreground font-medium">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Success Rate</span>
                  <span className="text-sm font-mono text-success font-medium">84.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Avg Response Time</span>
                  <span className="text-sm font-mono text-foreground font-medium">2.3h</span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-background border border-border rounded-agricultural-md p-4">
              <h4 className="font-heading font-heading-semibold text-foreground mb-3">
                Export Data
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 p-2 text-left text-text-secondary hover:text-primary hover:bg-muted rounded-agricultural-sm transition-agricultural">
                  <Icon name="FileText" size={16} />
                  <span className="text-sm font-body">Export as PDF</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-left text-text-secondary hover:text-primary hover:bg-muted rounded-agricultural-sm transition-agricultural">
                  <Icon name="Download" size={16} />
                  <span className="text-sm font-body">Download CSV</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-left text-text-secondary hover:text-primary hover:bg-muted rounded-agricultural-sm transition-agricultural">
                  <Icon name="Share" size={16} />
                  <span className="text-sm font-body">Share Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationDashboard;