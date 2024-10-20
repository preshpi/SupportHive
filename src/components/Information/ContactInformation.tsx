

const ContactInformation = () => {
  return (
    <div>
      <h3 className="text-xl mb-4">Contact Information</h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm">Contact Name</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter Contact Name" />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Contact Email</label>
          <input type="email" className="w-full border p-2 rounded" placeholder="Enter Contact Email" />
        </div>

       
      </form>
    </div>
  );
};

export default ContactInformation;
