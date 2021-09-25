import ProtectedPages from "./features/auth/container/ProtectedPages";
import Profile from "views/Profile.jsx";
import Browse from "views/Browse.jsx";
import Matches from "views/Matches.jsx";
import Messages from "views/Messages.jsx";
import JobPostings from "views/JobPostings.jsx";
import BillingView from "views/BillingView.jsx";
import UserProfile from "views/UserProfile.jsx";
import TestingCard from "./views/TestingView";
var routes = [
  {
    path: "/seek",
    name: "Seek",
    icon: "tim-icons icon-compass-05",
    component: ProtectedPages(Browse),
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "tim-icons icon-single-02",
    component: ProtectedPages(Profile),
    layout: "/admin"
  },
  {
    path: "/matches",
    name: "Matches",
    icon: "tim-icons icon-heart-2",
    component: ProtectedPages(Matches),
    layout: "/admin"
  },
  {
    path: "/messages",
    name: "Messages",
    icon: "tim-icons icon-chat-33",
    component: ProtectedPages(Messages),
    layout: "/admin"
  },
  {
    path: "/jobs",
    name: "Job Postings",
    icon: "tim-icons icon-notes",
    component: ProtectedPages(JobPostings),
    layout: "/admin"
  },
  {
    path: "/billing",
    name: "Billing",
    icon: "tim-icons icon-cart",
    component: ProtectedPages(BillingView),
    layout: "/admin"
  }
  // Routes for testing
  // {
  //   path: "/sibhat",
  //   name: "sibhat",
  //   icon: "tim-icons icon-cart",
  //   component: ProtectedPages(UserProfile),
  //   layout: "/admin"
  // }
  // {
  //   path: "/",
  //   name: "Home",
  //   icon: "tim-icons icon-compass-05",
  //   component: LandingView,
  //   layout: "/admin"
  // }
//   {
//     path: "/testing",
//     name: "Testing",
//     icon: "tim-icons icon-compass-05",
//     component: TestingCard,
//     layout: "/admin"
//   }
];
export default routes;
