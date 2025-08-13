import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FarmerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  const regionOptions = [
    { value: '', label: 'All Regions' },
    { value: 'north', label: 'Northern Region' },
    { value: 'south', label: 'Southern Region' },
    { value: 'east', label: 'Eastern Region' },
    { value: 'west', label: 'Western Region' }
  ];

  const cropOptions = [
    { value: '', label: 'All Crops' },
    { value: 'cassava', label: 'Cassava' },
    { value: 'yam', label: 'Yam' },
    { value: 'maize', label: 'Maize' },
    { value: 'rice', label: 'Rice' }
  ];

  const farmers = [
    {
      id: 1,
      name: "Adebayo Ogundimu",
      location: "Ogun State, Nigeria",
      phone: "+234 803 456 7890",
      email: "adebayo.ogundimu@email.com",
      crops: ["Cassava", "Yam"],
      farmSize: "2.5 hectares",
      lastContact: "2025-01-10",
      status: "active",
      consultations: 12,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Fatima Abdullahi",
      location: "Kano State, Nigeria",
      phone: "+234 805 123 4567",
      email: "fatima.abdullahi@email.com",
      crops: ["Maize", "Rice"],
      farmSize: "1.8 hectares",
      lastContact: "2025-01-12",
      status: "pending",
      consultations: 8,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Chukwudi Okoro",
      location: "Anambra State, Nigeria",
      phone: "+234 807 890 1234",
      email: "chukwudi.okoro@email.com",
      crops: ["Yam", "Cassava"],
      farmSize: "3.2 hectares",
      lastContact: "2025-01-08",
      status: "inactive",
      consultations: 15,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Aisha Mohammed",
      location: "Kaduna State, Nigeria",
      phone: "+234 809 567 8901",
      email: "aisha.mohammed@email.com",
      crops: ["Rice", "Maize"],
      farmSize: "4.1 hectares",
      lastContact: "2025-01-11",
      status: "active",
      consultations: 20,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const filteredFarmers = farmers?.filter(farmer => {
    const matchesSearch = farmer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         farmer?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRegion = !selectedRegion || farmer?.location?.toLowerCase()?.includes(selectedRegion);
    const matchesCrop = !selectedCrop || farmer?.crops?.some(crop => 
      crop?.toLowerCase()?.includes(selectedCrop?.toLowerCase())
    );
    return matchesSearch && matchesRegion && matchesCrop;
  });

  return (
    <div className="bg-card border border-border rounded-agricultural-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">
            Farmer Directory
          </h2>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          <Select
            placeholder="Filter by region"
            options={regionOptions}
            value={selectedRegion}
            onChange={setSelectedRegion}
          />
          <Select
            placeholder="Filter by crop"
            options={cropOptions}
            value={selectedCrop}
            onChange={setSelectedCrop}
          />
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredFarmers?.map((farmer) => (
          <div key={farmer?.id} className="p-6 hover:bg-muted/50 transition-agricultural">
            <div className="flex items-start space-x-4">
              <Image
                src={farmer?.avatar}
                alt={farmer?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-heading font-heading-semibold text-foreground truncate">
                    {farmer?.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-mono capitalize ${getStatusColor(farmer?.status)}`}>
                    {farmer?.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="MapPin" size={14} />
                      <span className="font-body">{farmer?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="Phone" size={14} />
                      <span className="font-mono">{farmer?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="Mail" size={14} />
                      <span className="font-body truncate">{farmer?.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="Sprout" size={14} />
                      <span className="font-body">{farmer?.crops?.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="Ruler" size={14} />
                      <span className="font-body">{farmer?.farmSize}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="MessageSquare" size={14} />
                      <span className="font-mono">{farmer?.consultations} consultations</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-caption text-text-secondary">
                    Last contact: {new Date(farmer.lastContact)?.toLocaleDateString('en-GB')}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Phone">
                      Call
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MessageSquare">
                      Message
                    </Button>
                    <Button variant="outline" size="sm" iconName="Eye">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredFarmers?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
            No farmers found
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default FarmerDirectory;