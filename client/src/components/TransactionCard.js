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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, removeExpense } from "../features/expenses/expenseSlice";
import { API_END_POINT } from "../utils/constants";
import ExpenseForm from "./ExpenseForm";

const TABLE_HEAD = ["Date", "Category", "Amount", "Description", "Action"];

export default function TransactionCard() {
  //refs
  const amountRef = useRef([]);
  const categoryRef = useRef([]);
  const dateRef = useRef([]);
  const descriptionRef = useRef([]);
  //states
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);
  //necessary methods
  const handleOpen = () => setOpen((cur) => !cur);
  const user = useSelector((store) => store.app.users);
  const expenses = useSelector((store) => store.tran.expenses);
  const dispatch = useDispatch();

  //get transaction
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
    setOpen((cur) => !cur); // opens the form
    setFormValues({
      transaction_id: transaction_id,
      amount: amountRef.current[transaction_id].innerHTML,
      date: dateRef.current[transaction_id].innerHTML,
      category: categoryRef.current[transaction_id].innerHTML,
      description: descriptionRef.current[transaction_id].innerHTML,
    });
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
              <ExpenseForm
                setOpen={setOpen}
                formValues={formValues}
                setFormValues={setFormValues}
              />
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
            {expenses
              .map((transaction, index) => {
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
                        ref={(el) => (dateRef.current[transaction._id] = el)}
                      >
                        {moment(transaction.date).format("DD-MM-YYYY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        ref={(el) =>
                          (categoryRef.current[transaction._id] = el)
                        }
                      >
                        {transaction.category}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        ref={(el) => (amountRef.current[transaction._id] = el)}
                      >
                        {transaction.amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        ref={(el) =>
                          (descriptionRef.current[transaction._id] = el)
                        }
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
              })
              .slice(startIndex, endIndex)}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {startIndex / 7 + 1} of {Math.ceil(expenses.length / 7)}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={startIndex === 0}
            onClick={() => {
              setStartIndex(startIndex - 7);
              setEndIndex(endIndex - 7);
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={endIndex >= expenses.length}
            onClick={() => {
              setStartIndex(startIndex + 7);
              setEndIndex(endIndex + 7);
            }}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
