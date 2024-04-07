import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, removeExpense } from "../features/expenses/expenseSlice";
import { API_END_POINT } from "../utils/constants";
import ExpenseForm from "./ExpenseForm";

const TABLE_HEAD = ["Date", "Category", "Amount", "Description", "Action"];

export default function TransactionCard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const user = useSelector((store) => store.app.users);
  const expenses = useSelector((store) => store.tran.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    (async (data) => {
      try {
        const res = await axios.post(
          `${API_END_POINT}/dashboard/get-transaction`,
          { userid: user._id },
          { withCredentials: true }
        );
        console.log(res);
        res.data.map((data, index) => {
          return dispatch(addExpense(data));
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, user]);

  // delete transaction
  const delTransaction = async (transaction_id) => {
    try {
      const res = await axios.post(
        `${API_END_POINT}/dashboard/delete-transaction`,
        { transaction_id: transaction_id },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeExpense(transaction_id));
    } catch (error) {
      console.log(error);
    }
  };

  // edit transaction
  const editTransaction = (transaction_id) => {
    // setOpen((cur) => !cur); #editing functinality not added
  };

  return (
    <Card className="w-full h-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex mt-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Your Transaction History
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              Add new
            </Button>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <ExpenseForm />
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 flex-grow">
        <table
          className="mt-2 w-full min-w-max table-auto text-left capitalize"
          id="dataTable"
        >
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((transaction, index) => {
              const isLast = index === expenses.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={transaction._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(transaction.date).format("DD-MM-YYYY")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {transaction.category}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {transaction.amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {transaction.description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <IconButton
                      variant="text"
                      id="edit"
                      onClick={() => editTransaction(transaction._id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>

                    <IconButton
                      variant="text"
                      id="del"
                      onClick={() => delTransaction(transaction._id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 5
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
