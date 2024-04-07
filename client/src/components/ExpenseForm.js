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

export default function ExpenseForm() {
  //useForm controller
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
    },
  });
  //redux state controller
  const user = useSelector((store) => store.app.users);
  const dispatch = useDispatch();

  //on form submit
  const onSubmit = async (data, e) => {
    try {
      const res = await axios.post(
        `${API_END_POINT}/dashboard/add-transaction`,
        { ...data, userid: user._id },
        { withCredentials: true }
      );
      console.log(res);
      const { amount, category, date, description } = res.data.data;
      dispatch(addExpense({ amount, category, date, description }));
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  };
  return (
    <Card className="mx-auto w-full max-w-[24rem]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Add Expense
          </Typography>
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
            <option value="" disabled>
              Select Category
            </option>
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
            Add
          </Button>
        </CardBody>
      </form>
    </Card>
  );
}
