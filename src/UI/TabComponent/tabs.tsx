import React from "react";

interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex w-full pt-5 items-center border-b border-gray-100  ">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`p-2 ${activeTab === index ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"}`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
