import React, { useState } from 'react';
import Tabs from '../../UI/TabComponent/tabs';
import OngoingCampaigns from './alcampaign';

const AllCampaignsTab = () => {

    const [activeStatusTab, setActiveStatusTab] = useState(0);

    const [activeFormTab, setActiveFormTab] = useState(0);

    const handleStatusTabChange = (index: number) => {
        setActiveStatusTab(index);
    };

    const handleFormTabChange = (index: number) => {
        setActiveFormTab(index);
    };

    return (
        <div className="py-10 w-full">

            <div>
                <p className="font-bold text-[20px]">All your Campaigns in one place!</p>
            </div>


            <Tabs
                tabs={['All', 'Approved', 'Pending', 'Rejected']}
                activeTab={activeStatusTab}
                onTabChange={handleStatusTabChange}
            />

            <div className="flex flex-col lg:flex-row justify-between">

                <div className="mt-6 lg:w-[60%]">
                    {activeStatusTab === 0 && <p>Showing all campaigns...</p>}
                    {activeStatusTab === 1 && <p>Showing approved campaigns...</p>}
                    {activeStatusTab === 2 && <p>Showing pending campaigns...</p>}
                    {activeStatusTab === 3 && <p>Showing rejected campaigns...</p>}
                </div>

                <div className='lg:w-[40%]'>
                   <OngoingCampaigns/>
                </div>
            </div>
        </div>
    );
};

export default AllCampaignsTab;
