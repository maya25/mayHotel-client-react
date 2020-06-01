import React, { useEffect } from "react";
import Box from "../../components/Box/Box";
import PageHeading from "../../components/PageHeading/PageHeading";
import { user } from '../../utils/icons';
import EditForm from './EditForm';

const ContactView = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading title='פרופיל' icon={user} links={[]} />
      <Box >
        <EditForm />
      </Box>
    </>
  );
};

export default ContactView;
