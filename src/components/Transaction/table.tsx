interface Transaction {
  id: number;
  status: string;
  amount: number;
  customer: {
    email: string;
  };
  subaccount: {
    business_name: string;
  };
  created_at: string;
}

interface TransactionTableProps {
  loading: boolean;
  data: Transaction[];
}
const TransactionTable: React.FC<TransactionTableProps> = ({
  loading,
  data,
}) => {
  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case "success":
        return { background: "bg-Light-100", text: "text-normal-500" };
      case "failed":
        return { background: "bg-light-red", text: "text-dark-red" };
      case "abandoned":
        return { background: "bg-yellow-100", text: "text-yellow-500" };
      default:
        return { background: "", text: "" };
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="fetchingSpinner "></div>
        </div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-[#F9F9F9] border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3 px-6">Contributor</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Campaign</th>
              <th className="py-3 px-6">Date</th>
            </tr>
          </thead>

          <>
            <tbody className="text-gray-700 text-sm">
              {data.map((transaction) => {
                const { background, text } = getStatusBackgroundColor(
                  transaction.status
                );
                return (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3 px-6">{transaction.customer.email}</td>
                    <td className="py-3 px-6">
                      ₦{(transaction.amount / 100).toFixed(2)}
                    </td>
                    <td>
                      <p
                        className={`p-1 text-center  rounded-full ${background} ${text}`}
                      >
                        {transaction.status}
                      </p>
                    </td>
                    <td className="py-3 px-6">
                      {transaction.subaccount.business_name}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
