
const CampaignInformation = () => {
  return (
    <div>
      <h3 className="text-xl mb-4">Campaign Information</h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm">Campaign Description</label>
          <textarea className="w-full border p-2 rounded" placeholder="Enter Campaign Description"></textarea>
        </div>

        {/* Add more fields for Campaign Information */}
      </form>
    </div>
  );
};

export default CampaignInformation;
