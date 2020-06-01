import React, { useEffect } from "react";
import Box from "../../components/Box/Box";
import "./SpaView.scss";
import { pageLinks } from "./consts";
import RouteList from "../../components/RouteList/RouteList";
import { metadata } from "./consts";
import PageHeading from "../../components/PageHeading/PageHeading";

const nestedRoutes = pageLinks.map(link => ({
  path: link.path,
  component: link.component
}));

const SpaView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div>
      <PageHeading icon={metadata.icon} title={metadata.title} links={pageLinks} />
      <div className="disclaimer">
        <Box>
          <p>
            אורח יקר,
                  <br />
            באפשרותך לשריין מקום לטיפול בספא במלון. בניגוד לשאר השירותים באפליקציה, שירות זה כרוך בתשלום עם הצגת מספר ההזמנה בכניסה לספא. מאחלים לך בילוי נעים!

                </p>
        </Box>
      </div>
      <Box>
        <RouteList routes={nestedRoutes} />
      </Box>
    </div>
  );
};

export default SpaView;
