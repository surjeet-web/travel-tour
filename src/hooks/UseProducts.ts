import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts } from '../redux/features/productSlice';

const UseProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  
  const setProductsHandler = (products: any) => {
    dispatch(setProducts(products));
  };
  
  return { products, setProducts: setProductsHandler };
};

export default UseProducts;