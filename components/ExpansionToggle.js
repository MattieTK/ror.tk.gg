import { useState, useEffect } from 'react';
import { container, expansionIcon, expansionIconEnabled, expansionIconDisabled } from './ExpansionToggle.css';

const ExpansionToggle = ({ expansions, onExpansionChange }) => {
  const [enabledExpansions, setEnabledExpansions] = useState({
    'base': true,
    'Survivors of the Void': true,
    'Seekers of the Storm': true,
  });

  useEffect(() => {
    onExpansionChange(enabledExpansions);
  }, [enabledExpansions, onExpansionChange]);

  const toggleExpansion = (expansion) => {
    setEnabledExpansions(prev => ({
      ...prev,
      [expansion]: !prev[expansion]
    }));
  };

  const expansionData = [
    {
      key: 'Survivors of the Void',
      name: 'Survivors of the Void',
      icon: '/images/SotV_Icon.png',
      shortName: 'SotV'
    },
    {
      key: 'Seekers of the Storm',
      name: 'Seekers of the Storm',
      icon: '/images/SotS_Icon.png',
      shortName: 'SotS'
    }
  ];

  return (
    <div className={container}>
      {expansionData.map((expansion) => {
        const isEnabled = enabledExpansions[expansion.key];
        const iconClassName = `${expansionIcon} ${isEnabled ? expansionIconEnabled : expansionIconDisabled}`;
        
        return (
          <div
            key={expansion.key}
            className={iconClassName}
            style={{ backgroundImage: `url(${expansion.icon})` }}
            onClick={() => toggleExpansion(expansion.key)}
            title={`${expansion.name} - Click to ${isEnabled ? 'disable' : 'enable'}`}
          />
        );
      })}
    </div>
  );
};

export default ExpansionToggle;