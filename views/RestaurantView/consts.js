import { breakfast } from "../../utils/icons";
import MyOrders from "./MyOrders";
import MyCoupons from "../Coupons/MyCoupons";

export const metadata = {
  title: "חדר אוכל",
  icon: breakfast
};

export const ordersPageLinks = [
  {
    title: "חדר אוכל",
    component: MyOrders,
    path: "/orders/myorders"
  },
  {
    title: "קופונים",
    component: MyCoupons,
    path: "/orders/coupons"
  }
];
