

const BasicInformation= () => {
  return (
    <div>
      <h3 className="text-xl mb-4">Basic Information</h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm">Campaign Title</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter Campaign Title" />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Country</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Campaign Country" />
        </div>

        <div className="mb-4">
          <label className="block text-sm">City</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter City" />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Campaign Category</label>
          <div>
            <label className="mr-4">
              <input type="radio" name="category" value="Healthcare" className="mr-2" /> Healthcare
            </label>
            <label className="mr-4">
              <input type="radio" name="category" value="Education" className="mr-2" /> Education
            </label>
            <label>
              <input type="radio" name="category" value="Other" className="mr-2" /> Other
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
