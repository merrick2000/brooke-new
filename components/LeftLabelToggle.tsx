'use client';
import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

interface LeftLabelToggleProps {
  label: string,
  active?: boolean
}

const LeftLabelToggle: React.FC<LeftLabelToggleProps> = ({ label, active = false }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <div className="flex items-center">
      <span className="font-serif mx-2.5 text-sm font-">{label}</span>
      <Switch
        checked={isChecked}
        onChange={toggleSwitch}
        className={`${
          isChecked ? 'bg-switch-on' : 'bg-white border-2 border-primary'
        } relative inline-flex items-center h-6 rounded-full w-14 transition-colors`}
      >
        {/* <span className="sr-only">Toggle</span> */}
        <span
          className={`${
            isChecked ? 'translate-x-9 inline-block w-4 h-4 transform bg-green-500 rounded-full transition-transform' : 'translate-x-1 inline-block w-4 h-4 transform bg-primary rounded-full transition-transform'
          }`}
        />
      </Switch>
    </div>
  );
};

export default LeftLabelToggle;
