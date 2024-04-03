import {
  Cog6ToothIcon,
  PowerIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearExpense } from "../features/expenses/expenseSlice";
import { setUser } from "../features/users/userSlice";
import { API_END_POINT } from "../utils/constants";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  const logout = async () => {
    try {
      const res = await axios.post(
        `${API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(setUser(null));
      dispatch(clearExpense());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 lg:p-8 h-full">
      <Card className="h-full w-full max-w-[20rem] p-4 shadow-md rounded-none">
        <List>
          <NavLink to="/dashboard">
            <ListItem
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>
          <ListItem
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Bills & Payments
          </ListItem>
          <ListItem
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={logout} selected={selectedIndex === 3}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
