import React from 'react';
import '../scss/cart.scss';
import PropTypes from 'prop-types';
// Outputs cart component
const Cart = ({ inCart, handleRemove, reduceArray }) => {
  const itemsInCart = inCart.map(el => el.count);// number of pieces of a product
  const totalItemsInCart = reduceArray(itemsInCart);// total pieces of all products
  const pricesInCart = inCart.map(el => el.count * el.price);// total price of all pieces of a product
  const totalPriceInCart = reduceArray(pricesInCart);// total price of all pieces

  return (
    <div className="cart">
      <section>
        <table>
          <tbody>
            {inCart.map((el, i) => (
              <tr key={i}>
                <td>{el.count}</td>
                <td>{el.productName}</td>
                <td>{el.price}</td>
                <td><button onClick={() => handleRemove(el)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {inCart.length ? (
          <div className="cart-total">
            <b>
In cart:
              {totalItemsInCart}
items.
            </b>
            <b>
Totlal:
              {totalPriceInCart}
            </b>
          </div>
        ) : <div className="cart-total"><b>Your cart is empty</b></div>}

      </section>


    </div>
  );
};


Cart.propTypes = {
  inCart: PropTypes.array,
  handleRemove: PropTypes.func,
  reduceArray: PropTypes.func
}

export default Cart;
