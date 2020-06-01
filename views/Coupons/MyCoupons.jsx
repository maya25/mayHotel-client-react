import React, { useEffect, useState, useCallback } from "react";
import { UserApi } from "../../utils/api";
import Loader from "react-loader";
import Box from "../../components/Box/Box";
import QRcodeCard from '../../components/Card/QRcodeCard';
import moment from 'moment';

const MyCoupons = () => {
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [showQR, setShowQR] = useState(false);
    const [couponQRcode, setQRcode] = useState("");
    const [couponName, setCouponName] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            try {
                await updateCoupons();
            } catch (e) { }
        })();
    }, []);
    
    const renderCard = () => {
        return (
            <QRcodeCard
                qrcode={couponQRcode}
                name={couponName}
                onCancel={onQRcodeCancel}
            />
        )
    }
    const onQRcodeClick = (couponQRcode, couponName) => {
        setQRcode(couponQRcode);
        setCouponName(couponName);
        setShowQR(true);
    }

    const onQRcodeCancel = () => {
        setQRcode({ couponQRcode: null });
        setCouponName({ couponName: null });
        setShowQR(false);
    }

    const updateCoupons = useCallback(() => {
        (async () => {
            setLoading(true);

            const result = await UserApi.vouchers();
            const _coupons = result.data.data
                .filter(coupon => coupon.voucher != null)
                .map(coupon => {

                    let dateStr = moment(`${coupon.voucher.date}`, 'YYYYMMDD').format("DD/MM/YYYY");
                    if (dateStr.toLowerCase() === "invalid date") {
                        dateStr = moment(coupon.voucher.date).format("DD/MM/YYYY");
                    }
                    return {
                        ...coupon.voucher,
                        dateStr
                    };
                });
            setCoupons(_coupons.sort((a,b)=> a.date - b.date));
            console.log(_coupons);
            setLoading(false);
        })();
    });

    return (
        <>
            <Box>
                <Loader loaded={!loading}>
                    <MyCouponsList coupons={coupons} onQRcode={onQRcodeClick} />
                </Loader>
                {showQR ? renderCard() : <></>}
            </Box>
        </>
    );
};

const MyCouponsList = ({ coupons, onQRcode }) => {
    if (!coupons || !coupons.length) {
        return 'לא נמצאו שוברים';
    }

    return (
        <ul className="coupon-list">
            {coupons.map((coupon, idx) => (
                <MyCouponItem key={idx} {...coupon} onQRcode={onQRcode} />
            ))}
        </ul>
    );
}

const MyCouponItem = ({ qrcode, value, dateStr , onQRcode }) => {
    return (
        <li className="my-coupon-item">
            <div>
                <div style={{paddingRight:10}}>
                    {value}<br/> {dateStr}
                </div>
            </div>
            <div>
                <img src={qrcode} onClick={() => onQRcode(qrcode, value)} />
            </div>
        </li>
    );
};

export default MyCoupons;