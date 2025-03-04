import { Typography } from "@mui/material";
import Users from "./pages/users/Users";
import {
  Check,
  CheckBox,
  ConstructionRounded,
  Create,
  Dashboard,
  Person,
} from "@mui/icons-material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import Register from "./pages/auth/Register";
import Tasks from "./pages/tasks/Tasks";
import MyTask from "./pages/tasks/mytasks/MyTask";
import NewTask from "./pages/tasks/newtasks/NewTask";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Vacation from "./pages/vacation/Vacation";
export const navigationParams = [
  {
    id: 1,
    sectionName: "დეშბორდი",
    icon: <Dashboard className="color-light" />,
    needSuperAdmin: false,
    element: <DashboardLayout />,
    items: [
      {
        icon: <EventNoteIcon className="color-light" />,
        needSuperAdmin: false,
        id: 2,
        title: "შვებულება",
        component: <Vacation />,
      },
    ],
  },
  {
    id: 2,
    sectionName: "მომხმარებლები",
    icon: <GroupIcon className="color-light" />,
    needSuperAdmin: true,
    element: null,
    items: [
      {
        icon: <ConstructionRounded className="color-light" />,
        needSuperAdmin: true,
        id: 1,
        title: "მართვა",
        component: <Users />,
      },
      {
        icon: <Person className="color-light" />,
        needSuperAdmin: true,
        id: 2,
        title: "რეგისტრაცია",
        component: <Register />,
      },
    ],
  },
  {
    id: 3,
    sectionName: "თასქები",
    icon: <CheckBox className="color-light" />,
    needSuperAdmin: false,
    element: null,
    items: [
      {
        icon: <ConstructionRounded className="color-light" />,
        needSuperAdmin: true,
        id: 1,
        title: "თასქების მართვა",
        component: <Tasks />,
      },
      {
        icon: <Check className="color-light" />,
        needSuperAdmin: false,
        id: 2,
        title: "ჩემი თასქები",
        component: <MyTask />,
      },
      {
        icon: <Create className="color-light" />,
        needSuperAdmin: true,
        id: 3,
        title: "ახალი თასქი",
        component: <NewTask />,
      },
    ],
  },
];
