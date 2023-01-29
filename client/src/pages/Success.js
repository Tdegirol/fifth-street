import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
// import { UPDATE_PRODUCTS } from '../utils/actions';
// import { useStoreContext } from '../utils/GlobalState';
// import { useQuery } from '@apollo/client';
// import { QUERY_PRODUCTS } from '../utils/queries';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  // const [state, dispatch] = useStoreContext();
  // const { loading, allData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // setTimeout(() => {
      //   window.location.assign('/');
      // }, 3000);
      return cart;
    }
    saveOrder();
  }, [addOrder]);
  
  // useEffect(() => {
  //   async function updateQuantities(cart) {
  //     if (allData) {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: allData.products
  //       })
  //       allData.products.forEach((product) => {
  //         idbPromise('products', 'put', product)
  //       })
  //       console.log(allData)
  //       console.log(cart);
  //       console.log(cart[0].purchaseQuantities)
  //     } else if (!loading) {
  //       //since we're offline, get all of the data from the 'products' store
  //       idbPromise('products', 'get').then((products) => {
  //         dispatch({
  //           type: UPDATE_PRODUCTS,
  //           products: products
  //         });
  //       });
  //     }
  //   }
  //   updateQuantities();
  // }, [allData, loading, dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;