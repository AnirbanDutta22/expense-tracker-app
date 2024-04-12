import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../features/expenses/expenseSlice";
import { API_END_POINT } from "../utils/constants";

export default function ExpenseForm({ setOpen, formValues, setFormValues }) {
  //useForm controller
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: formValues?.amount,
      date: formValues?.date,
      category: formValues?.category,
      description: formValues?.description,
    },
  });
  //redux state controller
  const user = useSelector((store) => store.app.users);
  const dispatch = useDispatch();

  //on form submit
  const onSubmit = async (data, e) => {
    try {
      if (formValues) {
        const res = await axios.post(
          `${API_END_POINT}/dashboard/update-transaction`,
          { ...data, transaction_id: formValues.transaction_id },
          { withCredentials: true }
        );
        console.log(res);
        dispatch(addExpense(res.data.data));
        setFormValues(null);
      } else {
        const res = await axios.post(
          `${API_END_POINT}/dashboard/add-transaction`,
          { ...data, userid: user._id },
          { withCredentials: true }
        );
        console.log(res);
        const { _id, amount, category, date, description } = res.data.data;
        dispatch(addExpense({ _id, amount, category, date, description }));
      }
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
    setOpen(false);
  };
  return (
    <Card className="mx-auto w-full max-w-[24rem]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardBody className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Typography variant="h4" color="blue-gray">
              {formValues ? "Update" : "Add"} Expense
            </Typography>
            <XMarkIcon
              className="size-10 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setFormValues(null);
              }}
            />
          </div>
          <Typography className="-mb-2" variant="h6">
            Amount
          </Typography>
          <Input
            size="lg"
            {...register("amount", { required: "Amount is required" })}
          />
          <p className="text-red-700">{errors.amount?.message}</p>
          <Typography className="-mb-2" variant="h6">
            Category
          </Typography>
          <select
            name="category"
            {...register("category", { required: "Category is required" })}
            className="text-md rounded-md border border-gray-400 p-3 w-full"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="fee">Fee</option>
            <option value="movie">Movie</option>
            <option value="marketing">Marketing</option>
            <option value="medical">Medical</option>
            <option value="bills">Bills</option>
          </select>
          <p className="text-red-700">{errors.category?.message}</p>
          <Typography className="-mb-2" variant="h6">
            Date
          </Typography>
          <Input
            type="date"
            size="lg"
            {...register("date", { required: "Date is required" })}
          />
          <p className="text-red-700">{errors.date?.message}</p>
          <Typography className="-mb-2" variant="h6">
            Description
          </Typography>
          <Input size="lg" {...register("description")} />
          <Button variant="gradient" type="submit" fullWidth>
            {formValues ? "Update" : "Add"}
          </Button>
        </CardBody>
      </form>
    </Card>
  );
}
