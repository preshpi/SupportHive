import React from 'react';

const campaigns = [
    { id: 1, title: "Lagos bank food", description: "Donation to fund for non-governmental..." },
    { id: 2, title: "Help Anita get Surgery", description: "Donation to fund for non-governmental..." },
    { id: 3, title: "Laptop fund for techies", description: "Anita is a 28 year old that cannot afford a..." },
    { id: 4, title: "Help Anita get Surgery", description: "Donation to fund for non-governmental..." },
    { id: 5, title: "Donate - Widows", description: "Anita is a 28 year old that cannot afford a..." }
];

const OngoingCampaigns: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">On-going Campaigns</h2>
                <span className="text-green-600 text-sm font-semibold bg-green-100 py-1 px-2 rounded-full">{campaigns.length}</span>
            </div>
            <ul className="space-y-4">
                {campaigns.map((campaign) => (
                    <li key={campaign.id} className="border-b pb-2 last:border-none">
                        <p className="font-semibold text-black">{campaign.title}</p>
                        <p className="text-gray-500 text-sm">{campaign.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OngoingCampaigns;
