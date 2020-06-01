import React, { useEffect, useContext, useState } from "react";
import Box from "../../components/Box/Box";
import Loader from "react-loader";
import PageHeading from "../../components/PageHeading/PageHeading";
import { HotelApi } from "../../utils/api";
import UserStore from "../../stores/UserStore";
import { contact } from '../../utils/icons'
import {EmailOutlined, PhoneOutlined, PrintOutlined, HomeOutlined} from '@material-ui/icons'
import './ContactView.scss'



const ContactView = () => {
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState()
  const userStore = useContext(UserStore);
  const { user } = userStore.user;

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        setLoading(true);
        const result = await HotelApi.get(user.hotel);
        const _hotel = result.data.data;
        await setHotel(_hotel);
      } catch (e) {
        setHotel(null);
      }
      setLoading(false);
    })();
  }, []);

  const renderList = () => (
    <div className='contact'>
      <h1 className='contact-title'>{hotel.name}</h1>
      <div className='contact-list'>
        <ul >
          <li><strong><PhoneOutlined style={{fontSize:'30px'}}/>   טלפון קבלה: </strong> <a href={`tel:${hotel.phone}`}>{hotel.phone}</a></li>
          <li><strong><PrintOutlined style={{fontSize:'30px'}}/>   פקס: </strong> {hotel.fax}</li>
          <li><strong><EmailOutlined style={{fontSize:'30px'}}/>   אימייל: </strong><a href={`mailto: ${hotel.email}`}>{hotel.email}</a></li>
          <li><strong><HomeOutlined style={{fontSize:'30px'}}/>   כתובת: </strong><a rel="noopener" target="_blank" href={`https://maps.google.com/?q=${hotel.address}`}>{hotel.address}</a></li>
        </ul>
      </div>
    </div>
  )


  return (
    <>
      <PageHeading title='צור קשר' icon={contact} links={[]} />
      <Box >
        <Loader loaded={!loading} >
          {hotel ? renderList() : <></>}

        </Loader>
      </Box>
    </>
  );
};

export default ContactView;
