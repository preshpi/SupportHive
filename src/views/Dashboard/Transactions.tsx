import { useState, useEffect } from "react";
import { fetchUserTransactions } from "../../utils/requests/transactions.request";
import TransactionTable from "../../components/Transaction/table";
import { useAppSelector } from "../../hook/redux.hook";
import { RootState } from "../../redux/store";

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

const Transactions = () => {
  const userDetails = useAppSelector((state: RootState) => state.user);
  const sanityID = userDetails.userDetails._id;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);

      try {
        if (sanityID) {
          const transactionList = await fetchUserTransactions(sanityID);
          setTransactions(transactionList);
        }
      } catch (err) {
        setError("Failed to fetch transactions.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);
  return (
    <div className="w-full py-10">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Transactions</h1>
          <p className="mb-6">
            Keep track of donations made on your campaigns!
          </p>
        </div>
      </div>

      <TransactionTable loading={loading} data={transactions} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Transactions;
