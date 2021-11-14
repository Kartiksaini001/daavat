import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { useChannel } from "./AblyReactEffect";

const AblyReceiveOrder = () => {
  const [receivedOrders, setOrders] = useState([]);

  const [hotelChannel, ably] = useChannel("hotel", (message) => {
    const hotel = JSON.parse(localStorage.getItem("profile"));
    console.log(message);
    if (message.name !== hotel.data.id) return;

    const history = receivedOrders.slice(-199);
    setOrders([...history, message]);
  });
  const [userChannel, ably2] = useChannel("user", (message) => {
    console.log("user channel message: ", message);
  });

  const sendMessage = (id, messageText) => {
    userChannel.publish({ name: id, data: messageText });
  };

  const handleOrderAction = (orderId, userId, response) => {
    sendMessage(userId, response);
    const newOrders = receivedOrders.filter((order) => order.id !== orderId);
    setOrders(newOrders);
  };

  const messages = receivedOrders.map((order, index) => {
    let orderData = {
      hotelId: order.data.hotelId,
      userId: order.data.userId,
      items: order.data.items,
      totalAmount: 0,
    };

    return (
      <OrderSummary key={index}>
        <Title>New order</Title>
        <Table>
          <Head>
            <Row>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
            </Row>
          </Head>
          <Body>
            {orderData.items.map((item, key) => {
              orderData.totalAmount =
                orderData.totalAmount + item.count * item.price;
              return (
                <Row key={key}>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>&#x20B9;{item.price}</ItemPrice>
                  <Quantity>{item.count}</Quantity>
                  <Amount>&#x20B9;{item.count * item.price}</Amount>
                </Row>
              );
            })}
          </Body>
        </Table>
        <Total>Total amount: &#x20B9;{orderData.totalAmount}</Total>
        <Action>
          <Reject
            onClick={() =>
              handleOrderAction(order.id, orderData.userId, "rejected")
            }
          >
            Reject
          </Reject>
          <Accept
            onClick={() =>
              handleOrderAction(order.id, orderData.userId, "accepted")
            }
          >
            Accept
          </Accept>
        </Action>
      </OrderSummary>
    );
  });

  return (
    <Wrapper>
      <OrderList>{messages}</OrderList>
    </Wrapper>
  );
};

export default AblyReceiveOrder;

const Wrapper = tw.div`
  flex flex-col h-3/4 w-96
`;
const OrderList = tw.div`
  overflow-auto px-4
`;
const OrderSummary = tw.div`
  mx-auto bg-white rounded-lg p-4 shadow-md my-4 w-full
`;
const Table = tw.table`
  table-auto mx-auto w-full
`;
const Title = tw.div`
  text-2xl mx-auto text-gray-600 font-bold mb-2 text-center
`;
const Head = tw.thead``;
const Row = tw.tr`
`;
const Body = tw.tbody``;
const ItemName = tw.td`
  text-center
`;
const ItemPrice = tw.td`
  text-center
`;
const Quantity = tw.td`
  text-center
`;
const Amount = tw.td`
  text-center
`;
const Total = tw.div`
  text-xl mx-auto font-bold mt-2 text-center
`;
const Action = tw.td`
  flex justify-around py-3
`;
const Accept = tw.button`
  bg-gray-400 py-2 px-4 rounded-lg
`;
const Reject = tw.button`
  ring-2 ring-gray-400 py-2 px-4 rounded-lg
`;
