import React, { useEffect } from "react";
import Box from "../../components/Box/Box";
import { metadata, pageLinks } from "./consts";
import PageHeading from "../../components/PageHeading/PageHeading";
import RouteList from "../../components/RouteList/RouteList";
import './EventsView.scss';

const nestedRoutes = pageLinks.map(link => ({
  path: link.path,
  component: link.component
}));

const EventsView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <PageHeading title={metadata.title} icon={metadata.icon} links={pageLinks} />
      <div className="disclaimer">
        <Box>
          <p>
            אורח יקר,
                  <br />
            שירות זה הוא שירות חינמי, המאפשר לך צפייה באירועים המתקיימים במלון בזמן שהותך, באפשרותך להזמין מקומות מראש. מאחלים לך בילוי נעים!

                </p>
        </Box>
      </div>
      <Box className="events-view">
        <RouteList routes={nestedRoutes} />
      </Box>
    </>
  );
};

export default EventsView;
