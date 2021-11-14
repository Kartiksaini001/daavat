import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { useChannel } from "./AblyReactEffect";

const AblyReceiveOrder = ({ orderData, setLoading, setHotelRes }) => {
  useEffect(() => {
    sendMessage(orderData.hotelId, orderData);
  }, []);

  const [userChannel, ably] = useChannel("user", (message) => {
    if (message.name !== orderData.userId) return;

    setLoading(false);
    if (message.data === "accepted") {
      setHotelRes("Restaurant has accepted your order...");
    } else {
      setHotelRes("Restaurant has rejected your order...");
    }
  });
  const [hotelChannel, ably2] = useChannel("hotel", (message) => {
    console.log("hotel channel message: ", message);
  });

  const sendMessage = (id, messageText) => {
    hotelChannel.publish({ name: id, data: messageText });
  };

  const handleAccept = (id) => {
    console.log("accepted");
  };
  const handleReject = (id) => {
    console.log("rejected");
  };

  return <></>;
};

export default AblyReceiveOrder;
