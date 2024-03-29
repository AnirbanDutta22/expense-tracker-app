import { Card, CardBody, Typography } from "@material-tailwind/react";

export function ExpenseCard({ icon, title, amount }) {
  return (
    <Card className="w-full lg:w-1/3">
      <CardBody>
        <div className="w-10 h-10 mb-2">{icon}</div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="text-lg">{amount}</Typography>
      </CardBody>
    </Card>
  );
}
