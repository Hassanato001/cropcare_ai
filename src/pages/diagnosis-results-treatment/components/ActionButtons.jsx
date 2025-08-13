import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ onSaveToHistory, onShareWithExtension, onBookConsultation, onSetReminder }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);

  const shareOptions = [
    { id: 'extension', label: 'Agricultural Extension Officer', icon: 'UserCheck' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { id: 'sms', label: 'SMS', icon: 'MessageSquare' },
    { id: 'email', label: 'Email', icon: 'Mail' }
  ];

  const reminderOptions = [
    { id: '1day', label: 'Tomorrow', icon: 'Clock' },
    { id: '3days', label: 'In 3 days', icon: 'Calendar' },
    { id: '1week', label: 'Next week', icon: 'CalendarDays' },
    { id: 'custom', label: 'Custom date', icon: 'Settings' }
  ];

  const handleShare = (option) => {
    if (option?.id === 'extension') {
      onShareWithExtension();
    } else {
      // Handle other share options
      console.log(`Sharing via ${option?.label}`);
    }
    setShowShareOptions(false);
  };

  const handleReminder = (option) => {
    onSetReminder(option?.id);
    setShowReminderOptions(false);
  };

  return (
    <div className="bg-card rounded-agricultural-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">
          Next Steps
        </h3>
        <p className="text-sm font-caption text-text-secondary mt-1">
          Take action on your diagnosis results
        </p>
      </div>
      <div className="p-4 space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="default"
            onClick={onSaveToHistory}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Save to History
          </Button>
          
          <Button
            variant="outline"
            onClick={onBookConsultation}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Book Consultation
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowShareOptions(!showShareOptions)}
              iconName="Share2"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Share Results
            </Button>

            {showShareOptions && (
              <>
                <div 
                  className="fixed inset-0 z-dropdown" 
                  onClick={() => setShowShareOptions(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg z-dropdown">
                  <div className="py-2">
                    {shareOptions?.map((option) => (
                      <button
                        key={option?.id}
                        onClick={() => handleShare(option)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-popover-foreground hover:bg-muted transition-agricultural"
                      >
                        <Icon name={option?.icon} size={16} />
                        <span className="text-sm font-body">{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowReminderOptions(!showReminderOptions)}
              iconName="Bell"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Set Reminder
            </Button>

            {showReminderOptions && (
              <>
                <div 
                  className="fixed inset-0 z-dropdown" 
                  onClick={() => setShowReminderOptions(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg z-dropdown">
                  <div className="py-2">
                    {reminderOptions?.map((option) => (
                      <button
                        key={option?.id}
                        onClick={() => handleReminder(option)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-popover-foreground hover:bg-muted transition-agricultural"
                      >
                        <Icon name={option?.icon} size={16} />
                        <span className="text-sm font-body">{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-heading font-heading-semibold text-card-foreground mb-3">
            Learn More
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              variant="ghost"
              iconName="BookOpen"
              iconPosition="left"
              iconSize={14}
              className="justify-start text-sm"
              fullWidth
            >
              Educational Resources
            </Button>
            <Button
              variant="ghost"
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={14}
              className="justify-start text-sm"
              fullWidth
            >
              Community Forum
            </Button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-error/10 border border-error/20 rounded-agricultural-md p-3">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <div className="flex-1">
              <h5 className="text-sm font-heading font-heading-semibold text-error mb-1">
                Severe Infestation Detected
              </h5>
              <p className="text-xs font-body text-error mb-2">
                Immediate action required to prevent crop loss
              </p>
              <Button
                variant="destructive"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                iconSize={14}
              >
                Call Extension Officer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;