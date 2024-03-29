import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import { ExpenseCard } from "../components/ExpenseCard";
import TransactionCard from "../components/TransactionCard";

export default function Dashboard() {
  const user = useSelector((store) => store.app.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col p-4 lg:p-8 basis-7/12">
        <div className="flex justify-between items-center">
          <ExpenseCard title="Food & Drinks" amount="$5000" />
          <ExpenseCard title="Bill & Payments" amount="$4000" />
          <ExpenseCard title="Entertainment" amount="$1000" />
        </div>
        <div className="flex justify-center items-start"></div>
      </div>
      <div className="transaction_div p-4 lg:p-8 basis-5/12">
        <TransactionCard />
      </div>
    </DashboardLayout>
  );
}
