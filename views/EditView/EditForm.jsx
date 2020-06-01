import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Input } from "@material-ui/core";
import Loader from "react-loader";
import moment from 'moment';
import Box from "../../components/Box/Box";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import UserStore from "../../stores/UserStore";
import { Edit } from '@material-ui/icons';
import './EditView.scss'
import "../../components/CancelModel/CancelModel.scss";
import Button from '../../components/Button/Button'

const EditForm = () => {
  const [loading, setLoading] = useState(false);
  const userStore = useContext(UserStore);
  const { user } = userStore.user;
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const _room = await userStore.getRoomData();
        setRoom(_room);
      } catch (e) {
        console.log(e)
        setRoom(null);
      }
      setLoading(false);
    })()
  }, [])


  const handleSubmit = useCallback(event => {
    (async () => {
      event.preventDefault();
      setLoading(true);
      try {
        await userStore.edit(phone, email, password, address);
      } catch (e) {
        setShow(false);
      }
      setShow(false);
      setLoading(false);
    })();
  });

  const renderRoomInfo = () => (
    <>
      <h1 className='profile-title'>{'פרטי אורח'}</h1>
      <div className='profile-list'>
        <ul >
          <li><strong>   מספר חדר: </strong> {room.number}</li>
          <li><strong>   תאריך הגעה: </strong>{moment(room.startdate).format('DD/MM/YY')} </li>
          <li><strong>   תאריך עזיבה: </strong>{moment(room.enddate).format('DD/MM/YY')}</li>
          <li><strong>  כמות אורחים: </strong>{room.guest_amount}</li>
        </ul>
      </div>
    </>
  )

  const renderForm = () => (
    <div className='edit-form'>
      <Form onSubmit={handleSubmit} >
        <FormField title="דואר אלקטרוני">
          <Input
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
            dir="ltr"
            type="email"
            error={email.length === 0}
          />
        </FormField>
        <FormField title="סיסמה">
          <Input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            dir="ltr"
            error={password.length === 0 && password.length < 8}
          />
        </FormField>
        <FormField title="מספר טלפון">
          <Input
            value={phone}
            name="phone"
            onChange={e => setPhone(e.target.value)}
            error={phone.length === 0}
          />
        </FormField>
        <FormField title="כתובת מגורים">
          <Input
            value={address}
            name="address"
            onChange={e => setAddress(e.target.value)}
            error={address.length === 0}
          />
        </FormField>
        <div className="cancel-modal-button-container" style={{ paddingTop: '20px', border: 'none' }}>
          <button className="close-modal-button" onClick={() => setShow(false)}>ביטול</button>
          <button type='submit' className="submit-form">אישור</button>
        </div>
      </Form>
    </div>
  )

  const renderProfile = () => (
    <>
      <div className='profile'>
        <h1 className='profile-title'>{`${user.firstname} ${user.lastname}`}</h1>
        <div className='profile-list'>
          <ul >
            <li><strong>   טלפון: </strong> {user.phone}</li>
            <li><strong>   אימייל: </strong>{user.email} </li>
            <li><strong>   כתובת: </strong>{user.address}</li>
          </ul>
        </div>
        {room ? renderRoomInfo() : <></>}
      </div>
      <Button onClick={() => setShow(true)}><Edit /> ערוך פרטים אישיים</Button>
    </>
  )
  return (
    <Box>
      <Loader loaded={!loading}>

        {show ? renderForm() : renderProfile()}

      </Loader>
    </Box>
  );
}

export default EditForm;