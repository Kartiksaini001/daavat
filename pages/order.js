import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { useState } from "react";

const AblySendOrder = dynamic(() => import("../components/AblySendOrder"), {
  ssr: false,
});

const Order = () => {
  const { items } = JSON.parse(sessionStorage.getItem("orderList"));
  let totalAmount = 0;
  const [loading, setLoading] = useState(true);
  const [hotelRes, setHotelRes] = useState(
    `Please wait! We are processing your order :-)`
  );

  return (
    <Wrapper>
      <ActionContainer>
        {loading && (
          <div
            className={
              "border-4 border-blue-300 h-8 w-8 rounded-full border-t-blue-500 animate-spin inline-block mr-3"
            }
          ></div>
        )}
        <AblySendOrder
          orderData={JSON.parse(sessionStorage.getItem("orderList"))}
          setLoading={setLoading}
          setHotelRes={setHotelRes}
        />
        {hotelRes}
      </ActionContainer>
      <OrderSummary>
        <Title>Your order</Title>
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
            {items.map((item, key) => {
              totalAmount = totalAmount + item.count * item.price;
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
        <Total>Total amount: &#x20B9;{totalAmount}</Total>
      </OrderSummary>
    </Wrapper>
  );
};

export default Order;

const Wrapper = tw.div`
  bg-gray-200 h-screen p-4 pt-24
`;
const ActionContainer = tw.div`
  text-2xl mb-10 flex items-center justify-center
`;
const OrderSummary = tw.div`
  mx-auto bg-white rounded-lg p-4 md:w-1/2 shadow-md
`;
const Table = tw.table`
  table-auto mx-auto w-full
`;
const Title = tw.div`
  text-4xl mx-auto text-gray-600 font-bold mb-5 text-center
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
  text-2xl mx-auto font-bold mt-5 text-center
`;
