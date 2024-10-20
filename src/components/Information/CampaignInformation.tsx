import React, { useState, useRef } from 'react';
import CampaignInput from '../CampaignInput';

const CampaignInformation: React.FC = () => {
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fundraisingReason, setFundraisingReason] = useState('');
  const [importance, setImportance] = useState('');
  const [impact, setImpact] = useState('');


  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);


  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-[70%]">
      <CampaignInput
        label="Campaign Description"
        placeholder="Write Here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <CampaignInput
        label="Campaign Goal Amount"
        placeholder="Enter Amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
      />
      <div className="flex justify-between gap-10">
        <CampaignInput
          label="Campaign Start Date"
          placeholder="DD/MM/YY"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-[50%]"
        />
        <CampaignInput
          label="Campaign End Date"
          placeholder="DD/MM/YY"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-[50%]"
        />
      </div>
      <div className="flex justify-between w-full gap-10">
        <CampaignInput
          label="What do you want to raise money for?"
          placeholder="Write Here"
          value={fundraisingReason}
          onChange={(e) => setFundraisingReason(e.target.value)}
          className="w-[50%]"
        />
        <CampaignInput
          label="Why is this campaign important to you?"
          placeholder="Write Here"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className="w-[50%]"
        />
      </div>
      <CampaignInput
        label="What impact will this campaign have?"
        placeholder="Write Here"
        value={impact}
        onChange={(e) => setImpact(e.target.value)}
      />

      <div className="flex justify-between">
        <div className="mt-4">
          <label className="block text-black font-bold mb-2">Have Images related to your Campaign?</label>
          <button
            onClick={() => imageInputRef.current?.click()} // Trigger file input click
            className="text-green-500"
          >
            Upload Now
          </button>
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />

          {images.length > 0 && (
            <ul className="mt-2">
              {images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-black font-bold mb-2">Supporting documents</label>
          <button
            onClick={() => documentInputRef.current?.click()}
            className="text-green-500"
          >
            Upload Now
          </button>
          <input
            type="file"
            ref={documentInputRef}
            accept=".pdf,.doc,.docx"
            multiple
            style={{ display: 'none' }}
            onChange={handleDocumentUpload}
          />

          {documents.length > 0 && (
            <ul className="mt-2">
              {documents.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 justify-end flex">
        <button className="bg-green-600 text-white px-6 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default CampaignInformation;
