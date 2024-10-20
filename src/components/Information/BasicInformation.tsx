

const BasicInformation= () => {
  return (
    <div>
      
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Campaign Title</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter Campaign Title" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Country</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Campaign Country" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">City</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter City" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Campaign Category</label>
          <div>
            <label className="mr-4">
              <input type="radio" name="category" value="Healthcare" className="mr-2 font-semibold" /> Healthcare
            </label>
            <label className="mr-4">
              <input type="radio" name="category" value="Education" className="mr-2 font-semibold" /> Education
            </label>
            <label>
              <input type="radio" name="category" value="Other" className="mr-2 font-semibold" /> Other
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
