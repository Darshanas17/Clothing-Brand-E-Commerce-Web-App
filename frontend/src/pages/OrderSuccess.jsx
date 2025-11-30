import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h1>Order Successful!</h1>
      <p>Your order ID is: {id}</p>
      <p>You will receive an email confirmation.</p>
    </div>
  );
};

export default OrderSuccess;
