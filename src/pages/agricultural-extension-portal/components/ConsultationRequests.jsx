import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConsultationRequests = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const consultationRequests = [
    {
      id: 1,
      farmer: {
        name: "Adebayo Ogundimu",
        location: "Ogun State",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      crop: "Cassava",
      issue: "Leaf spots and yellowing",
      priority: "high",
      submittedAt: "2025-01-13T10:30:00",
      status: "pending",
      description: `My cassava plants are showing yellow spots on leaves and some leaves are falling off. This started about a week ago and is spreading to other plants. I need urgent help as this is my main source of income.`,
      images: [
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      farmer: {
        name: "Fatima Abdullahi",
        location: "Kano State",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      crop: "Maize",
      issue: "Pest infestation",
      priority: "medium",
      submittedAt: "2025-01-13T14:15:00",
      status: "in-progress",
      description: `Small insects are eating my maize leaves. They appear to be green and move quickly when disturbed. The damage is getting worse each day.`,
      images: [
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 3,
      farmer: {
        name: "Chukwudi Okoro",
        location: "Anambra State",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      crop: "Yam",
      issue: "Root rot symptoms",
      priority: "high",
      submittedAt: "2025-01-13T16:45:00",
      status: "pending",
      description: `My yam tubers are showing signs of rot. The stems are also becoming weak and some plants are dying. This is affecting my entire farm.`,
      images: [
        "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300&h=200&fit=crop"
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'in-progress': return 'text-primary bg-primary/10';
      case 'completed': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const filteredRequests = consultationRequests?.filter(request => {
    if (activeTab === 'pending') return request?.status === 'pending';
    if (activeTab === 'in-progress') return request?.status === 'in-progress';
    if (activeTab === 'completed') return request?.status === 'completed';
    return true;
  });

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-agricultural-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">
            Consultation Requests
          </h2>
          <Button variant="outline" iconName="Filter" iconPosition="left">
            Filter
          </Button>
        </div>
        
        <div className="flex space-x-1 bg-muted p-1 rounded-agricultural-md">
          {[
            { id: 'pending', label: 'Pending', count: 2 },
            { id: 'in-progress', label: 'In Progress', count: 1 },
            { id: 'completed', label: 'Completed', count: 0 }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 px-4 py-2 text-sm font-body rounded-agricultural-sm transition-agricultural ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-agricultural-sm'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              {tab?.label}
              {tab?.count > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-mono">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredRequests?.map((request) => (
          <div key={request?.id} className="p-6 hover:bg-muted/50 transition-agricultural">
            <div className="flex items-start space-x-4">
              <Image
                src={request?.farmer?.avatar}
                alt={request?.farmer?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-heading font-heading-semibold text-foreground">
                      {request?.farmer?.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-mono border ${getPriorityColor(request?.priority)}`}>
                      {request?.priority} priority
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-mono capitalize ${getStatusColor(request?.status)}`}>
                    {request?.status?.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span className="font-body">{request?.farmer?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Sprout" size={14} />
                    <span className="font-body">{request?.crop}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span className="font-mono">{formatTimeAgo(request?.submittedAt)}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-heading font-heading-semibold text-foreground mb-2">
                    Issue: {request?.issue}
                  </h4>
                  <p className="text-sm font-body text-text-secondary line-clamp-3">
                    {request?.description}
                  </p>
                </div>
                
                {request?.images && request?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {request?.images?.slice(0, 3)?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Crop issue ${index + 1}`}
                        className="w-16 h-16 rounded-agricultural-sm object-cover border border-border"
                      />
                    ))}
                    {request?.images?.length > 3 && (
                      <div className="w-16 h-16 rounded-agricultural-sm border border-border bg-muted flex items-center justify-center">
                        <span className="text-xs font-mono text-text-secondary">
                          +{request?.images?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" iconName="MessageSquare">
                      Respond
                    </Button>
                    <Button variant="outline" size="sm" iconName="Video">
                      Schedule Call
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="AlertCircle" size={14} />
                    <span className="font-caption">Response needed within 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredRequests?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
            No {activeTab?.replace('-', ' ')} requests
          </h3>
          <p className="text-sm font-body text-text-secondary">
            {activeTab === 'pending' ?'All consultation requests have been addressed'
              : `No requests in ${activeTab?.replace('-', ' ')} status`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsultationRequests;