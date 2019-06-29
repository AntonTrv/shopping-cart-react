import React from 'react';
import '../scss/product.scss';
import PropTypes from 'prop-types';
//outputs products
const Products = ({ products, handleAddToCart }) => {
  const uniqueCategories = new Set([...products.map(e => e.productName)]).size;//number of unique categories
  return (
    <main>

      <section>
        <h2>Categories({uniqueCategories})</h2>
        <div className="products-wrapper">
          {products.map((el, i) => (
            <article key={i} id={el.id}>
              <div className="image-container"><img src={el.image} alt={el.productName} /></div>
              <div className="info-container">
                <b>{el.productName}</b>
                <p>Available {el.amount} pieces</p>
                <p>{el.price} per each  </p>
                <button onClick={() => handleAddToCart(el)}>Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

Products.propTypes ={
  products: PropTypes.array,
  handleAddToCart: PropTypes.func
};

export default Products;
