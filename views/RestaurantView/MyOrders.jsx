import React, { useEffect, useState, useCallback } from "react";
import { UserApi, OrderApi } from "../../utils/api";
import Loader from "react-loader";
import CancelButton from "../../components/CancelButton/CancelButton";
import SiteModal from "../../components/SiteModal/SiteModal";
import QRcodeCard from '../../components/Card/QRcodeCard';
import CancelModel from "../../components/CancelModel/CancelModel";

const MyOrders = () => {
    const [loading, setLoading] = useState(false);
    const [itemId, setItemId] = useState();
    const [orders, setOrders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [orderQRcode, setQRcode] = useState("");
    const [orderName, setOrderName] = useState("");
    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelText, setCancelText] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            try {
                await updateOrders();
            } catch (e) { }
        })();
    }, []);

    const renderCard = () => {
        return (
            <QRcodeCard
                qrcode={orderQRcode}
                name={orderName}
                onCancel={onQRcodeCancel}
            />
        )
    }
    const onQRcodeClick = (orderQRcode, orderName) => {
        setQRcode(orderQRcode);
        setOrderName(orderName);
        setShowQR(true);
    }

    const onQRcodeCancel = () => {
        setQRcode({ orderQRcode: null });
        setOrderName({ orderName: null });
        setShowQR(false);
    }
    const updateOrders = useCallback(() => {
        (async () => {
            setLoading(true);
            const result = await UserApi.orders();
            const _orders = result.data.data.filter(order => order.order != null).map(order => ({
                ...order.order,

            }));
            setOrders(_orders.sort((a, b) => {
                if (a.string.date < b.string.date)
                    return -1;
                else if (a.string.date > b.string.date)
                    return 1;
                else return a.meal.int.startTime - b.meal.int.startTime;
            }));
            setLoading(false);
        })();
    });

    const renderCancelCard = useCallback(
        (_id) => {
            (async () => {
                setItemId(_id)
                setCancelText('האם את/ה בטוח/ה בביצוע פעולה זאת?');
                setCancelOpen(true);
            })();
        }
    )

    const handleOrderCancel = useCallback(id => {
        (async () => {
            setCancelOpen(false)
            setLoading(true);
            await OrderApi.delete(id);
            setModalOpen(true);
            updateOrders();
        })();
    });

    return (
        <>
            <Loader loaded={!loading}>
                <MyOrderList orders={orders} onItemCancel={renderCancelCard} onQRcode={onQRcodeClick} />
            </Loader>
            <SiteModal
                open={modalOpen}
                title="ההזמנות שלי"
                text="הזמנה בוטלה בהצלחה!"
                onClose={() => setModalOpen(false)}
            />
            <CancelModel
                open={cancelOpen}
                title={`מחיקת הזמנה`}
                text={cancelText}
                onClose={() => setCancelOpen(false)}
                onConfirm={() => handleOrderCancel(itemId)}
            />
            {showQR ? renderCard() : <></>}
        </>
    );
};

const MyOrderList = ({ orders, onItemCancel, onQRcode }) => {
    if (!orders || !orders.length) {
        return 'לא נמצאו הזמנות';
    }

    return (
        <ul className="order-list">
            {orders.map((order, idx) => (
                <MyOrderItem key={idx} {...order} onCancel={onItemCancel} onQRcode={onQRcode} />
            ))}
        </ul>
    );
}

const MyOrderItem = ({ _id, meal, qrcode, string, amount, onCancel, onQRcode }) => {
    return (
        <li className="my-order-item">
            <div>
                <div>
                    ארוחת {meal.name} <br />
                    {string.date},{' '}{meal.startTime}<br />
                    מס' סועדים: {amount}
                </div>
            </div>
            <img src={qrcode} alt={meal.name} onClick={() => onQRcode(qrcode, `ארוחת ${meal.name}`)} />
            <CancelButton style={{ textAlign: 'left', height: 40, width: 40 }} onClick={() => onCancel(_id)} />
        </li>
    );
};

export default MyOrders;