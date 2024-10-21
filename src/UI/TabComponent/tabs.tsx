import React from 'react';

interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
 

  return (
    <div>
      
      <div className="flex  lg:w-[70%] pt-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-2 ${activeTab === index ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}
            onClick={() => onTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      
    </div>
  );
};

export default Tabs;
