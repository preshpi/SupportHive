import React, { useState, useEffect, useRef } from 'react';
import DateFilter from '../Dashboard/Date'; 

type Donation = {
  contributor: string;
  amount: string;
  status: string;
  campaign: string;
  date: string;
};

const donations: Donation[] = [
  { contributor: 'John Isaac', amount: '$10', status: 'Successful', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'Anonymous', amount: '$10', status: 'Successful', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'John Isaac', amount: '$10', status: 'Failed', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'Anonymous', amount: '$10', status: 'Successful', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'Anonymous', amount: '$10', status: 'Failed', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'John Isaac', amount: '$10', status: 'Successful', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'John Isaac', amount: '$10', status: 'Successful', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  { contributor: 'John Isaac', amount: '$10', status: 'Successful', campaign: 'Help Angela get surgery...', date: 'Oct 18, 2024 4:18 PM' },
  
];

const ITEMS_PER_PAGE = 5;

const Transactions: React.FC = () => {
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>(donations.slice(0, ITEMS_PER_PAGE));
  const [page, setPage] = useState<number>(1); 
  const loader = useRef(null);

  
  const loadMore = () => {
    const newPage = page + 1;
    const newItems = donations.slice((newPage - 1) * ITEMS_PER_PAGE, newPage * ITEMS_PER_PAGE);

    if (newItems.length > 0) {
      setFilteredDonations((prevDonations) => [...prevDonations, ...newItems]);
      setPage(newPage);  
    }
  };

  
  useEffect(() => {
    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 1.0, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (page * ITEMS_PER_PAGE) < donations.length) {
          loadMore(); 
        }
      });
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [page]);  

  return (
    <div className="w-full">
      <div className='flex justify-between'>
        <div>
      <h1 className='font-bold text-2xl'>Transactions</h1>
      <p className='mb-6'>Keep track of donations made on your campaigns!</p>
      </div>

      <div className="flex justify-end mb-4">
        <DateFilter onFilterChange={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
      </div>
     
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-[#D0D5DD] text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3 px-6">Contributor</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Campaign</th>
              <th className="py-3 px-6">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredDonations.map((donation, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-6 whitespace-nowrap">
                  <input type="checkbox" className="mr-2" />
                  {donation.contributor}
                </td>
                <td className="py-3 px-6">{donation.amount}</td>
                <td className="py-3 px-6">
                  {donation.status === 'Successful' ? (
                    <span className="text-green-500 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
                      {donation.status}
                    </span>
                  ) : (
                    <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full text-xs font-semibold">
                      {donation.status}
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 truncate max-w-[150px]">{donation.campaign}</td>
                <td className="py-3 px-6">{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div ref={loader} className="h-12 flex justify-center items-center">
        {(page * ITEMS_PER_PAGE) >= donations.length ? (
          <p className="text-gray-500">No more donations to load</p>
        ) : (
          <p className="text-gray-500">Loading more donations...</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
