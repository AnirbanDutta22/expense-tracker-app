import {
  CakeIcon,
  FilmIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import { ExpenseCard } from "../components/ExpenseCard";
import ExpenseChart from "../components/ExpenseChart";
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
      <div className="flex flex-col p-4 lg:p-8 basis-7/12 gap-8">
        <div className="flex justify-between items-center gap-6">
          <ExpenseCard
            title="Food & Drinks"
            amount="$5000"
            icon={<CakeIcon />}
          />
          <ExpenseCard
            title="Bill & Payments"
            amount="$4000"
            icon={<ReceiptPercentIcon />}
          />
          <ExpenseCard
            title="Entertainment"
            amount="$1000"
            icon={<FilmIcon />}
          />
        </div>
        <div className="flex justify-center items-center">
          <ExpenseChart />
        </div>
      </div>
      <div className="transaction_div p-4 lg:p-8 basis-5/12">
        <TransactionCard />
      </div>
    </DashboardLayout>
  );
}
