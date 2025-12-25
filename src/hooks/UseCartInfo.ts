import { useSelector } from 'react-redux';

const UseCartInfo = () => {
  const cart = useSelector((state: any) => state.cart?.cart || []);
  const quantity = cart.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
  const total = cart.reduce((total: number, item: any) => total + (item.price * (item.quantity || 0)), 0);
  
  return { quantity, total };
};

export default UseCartInfo;