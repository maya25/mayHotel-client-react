import React, { useEffect, useState, useCallback } from "react";
import { UserApi, EventsApi } from "../../../utils/api";
import Loader from "react-loader";
import Box from "../../../components/Box/Box";
import CancelButton from "../../../components/CancelButton/CancelButton";
import SiteModal from "../../../components/SiteModal/SiteModal";
import QRcodeCard from '../../../components/Card/QRcodeCard';
import CancelModel from "../../../components/CancelModel/CancelModel";

const MyEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [eventQRcode, setQRcode] = useState("");
  const [eventName, setEventName] = useState("");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelText, setCancelText] = useState("");
  const [itemId, setItemId] = useState();

  useEffect(() => {
    (async () => {
      try {
        await updateEvents();
      } catch (e) { }
    })();
  }, []);

  const updateEvents = useCallback(() => {
    (async () => {
      setLoading(true);
      const result = await UserApi.events();
      const _events = result.data.data.map(ev => ({
        ...ev.reservation.event,
        qrcode: ev.reservation.qrcode,
        _id: ev.reservation._id,
        amount: ev.reservation.amount
      }));
      setEvents(_events);
      setLoading(false);
    })();
  });

  const onQRcodeClick = (eventQRcode, eventName) => {
    setQRcode(eventQRcode);
    setEventName(eventName);
    setShowQR(true);
  }

  const onQRcodeCancel = () => {
    setQRcode({ eventQRcode: null });
    setEventName({ eventName: null });
    setShowQR(false);
  }
  const renderCancelCard = useCallback(
    (_id) => {
        (async () => {
            setItemId(_id)
            setCancelText('האם את/ה בטוח/ה בביצוע פעולה זאת?');
            setCancelOpen(true);
        })();
    }
)

  const handleEventCancel = useCallback(id => {
    (async () => {
      setCancelOpen(false)
      setLoading(true);
      await EventsApi.delete(id);
      setModalOpen(true);
      updateEvents();
    })();
  });

  const renderCard = () => {
    return (
      <QRcodeCard
        qrcode={eventQRcode}
        name={eventName}
        onCancel={onQRcodeCancel}
      />
    )
  }

  return (
    <Box>
      <Loader loaded={!loading}>
        <MyEventList events={events} onItemCancel={renderCancelCard} onQRcode={onQRcodeClick} />
      </Loader>
      <SiteModal
        open={modalOpen}
        title="הפעילויות שלי"
        text="הזמנה בוטלה בהצלחה!"
        onClose={() => setModalOpen(false)}
      />
                  <CancelModel
                open={cancelOpen}
                title={`מחיקת הזמנה`}
                text={cancelText}
                onClose={() => setCancelOpen(false)}
                onConfirm={() => handleEventCancel(itemId)}
            />
      {showQR ? renderCard() : <></>}
    </Box>
  );
};

const MyEventList = ({ events, onItemCancel, onQRcode }) => {
  if (!events || !events.length) {
    return 'לא נמצאו פעילויות';
  }

  return (
    <ul className="event-list">
      {events.map((event, idx) => (
        <MyEventItem key={idx} {...event} onCancel={onItemCancel} onQRcode={onQRcode} />
      ))}
    </ul>
  );
}
const MyEventItem = ({ _id, qrcode, name, amount, location, string, content, onCancel, onQRcode }) => {
  return (
    <li className="my-event-item" style={{ textAlign: "center" }}>
      <div className="my-event-item-top" >
        <div className="my-event-left">
          <CancelButton onClick={() => onCancel(_id)} />
        </div>
        <h3 className="my-event-item-name">{name}</h3>
      </div>
      <p className="event-item-content">{content}<br/>{location}, {string.date} {string.time}</p>
      <Box>
        <img src={qrcode} alt={name} onClick={() => onQRcode(qrcode, name)} />
      </Box>
      <p className="event-item-content">{`הזמנות: ${amount}`}</p>
    </li>
  );
};


export default MyEvents;