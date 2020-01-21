import { NavigationActions } from "react-navigation";
import Auth from "./pages/auth";

const MyStackRouter = StackRouter(
  {
    Home: { screen: Auth }
  },
  {
    initialRouteName: "Home"
  }
);
