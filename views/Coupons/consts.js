import { breakfast } from "../../utils/icons";
import hotelLobbyImage from "../../static/images/hotel-lobby.jpg";
import poolBarImage from "../../static/images/pool-bar.jpg";
import roomServiceImage from "../../static/images/room-service.jpg";

export const metadata = {
  title: "חדר אוכל",
  icon: breakfast
};

export const pageLinks = [
  {
    title: "שוברים",
    path: "/coupons"
  }
];

export const coupons = [
  {
    title: "שובר ארוחה",
    location: "לובי המלון",
    bgImage: hotelLobbyImage,
    id: "לובי המלון"
  },
  {
    title: "שובר ארוחה",
    location: "בר הבריכה",
    bgImage: poolBarImage,
    id: "בר הבריכה"
  },
  {
    title: "שובר ארוחה",
    location: "שירות חדרים",
    bgImage: roomServiceImage,
    id: "שירות חדרים"
  }
];

export const qrCode = {
  title: "סרוק קוד QR",
  disclaimer:
    "לידיעתך מימוש השובר תקף ליום הארוחה בלבד ולפי מספר הנפשות בהזמנה."
};
