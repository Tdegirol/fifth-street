import React, { useState, useEffect } from 'react';
import {
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";
import { UPDATE_PRODUCTS } from '../../utils/actions.js';
import { QUERY_PRODUCTS } from '../../utils/queries.js';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';

const Sort = () => {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        //if there's data to be stored
        if (data) {
          //store it in the global state object
          dispatch({
            type: UPDATE_PRODUCTS,
            products: data.products
          }); 
          //but also take each product and save it to IndexedDB using the helper function
          data.products.forEach((product) => {
            idbPromise('products', 'put', product);
          });
          //add else if to check if 'loading' is undefined in 'useQuery()' hook
        } else if (!loading) {
          //since we're offline, get all of the data from the 'products' store
          idbPromise('products', 'get').then((products) => {
            dispatch({
              type: UPDATE_PRODUCTS,
              products: products
            });
          });
        }
    }, [data, loading, dispatch]);

    const handleSort = (e) => {
      setSortOption(e);
      if (e==='Name') {
        let sortedProducts = data.products.slice().sort((a,b) => a.name.localeCompare(b.name));
        dispatch({
          type: UPDATE_PRODUCTS,
          products: sortedProducts
        });
      } else if (e==='Price Low to High') {
        let sortedProducts = data.products.slice().sort((a, b) => a.price - b.price);
        dispatch({
          type: UPDATE_PRODUCTS,
          products: sortedProducts
        });
      } else if (e==='Price High to Low'){
        let sortedProducts = data.products.slice().sort((a, b) => b.price - a.price);
        dispatch({
          type: UPDATE_PRODUCTS,
          products: sortedProducts
        });
      } else {
      }
    }

    return (
      <>
        <Container>
          {/* <Image
            src={require(`../../assets/logo.jpg`)}
            fluid
            className='background-image'
          /> */}
          <div>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
              >
                Sort Products:
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Name" onSelect={handleSort}>Name </Dropdown.Item>
                <Dropdown.Item eventKey="Price Low to High" onSelect={handleSort}>| Price Low to High  |</Dropdown.Item>
                <Dropdown.Item eventKey="Price High to Low" onSelect={handleSort}> Price High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
        <p> </p>
        <p>{sortOption}</p>
      </>
    );
  };
  
export default Sort;