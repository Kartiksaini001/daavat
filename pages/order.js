import dynamic from "next/dynamic";

const Order = dynamic(() => import("../components/Order"), {
  ssr: false,
});

const order = () => {
  return (
    <>
      <Order />
    </>
  );
};

export default order;
