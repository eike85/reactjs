import React, { useState } from 'react';
import {productData} from './productData'
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ProductCRUD = () => {
  const [btnName, setBtnName] = useState('Add Product');
  const [values, setValues] = useState( {id:'', name:'', description:''});
  const [product, setProduct] = useState(productData);

  const deleteProduct = (id) => {
    setProduct((products) => {
      return products.filter ((product) => product.id != id);
  })};

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const changeButtonName = (initial) => {
      if (initial) {
        setBtnName('Add Product')
      } else {
        setBtnName('Update Product')
      } 
  }
  const editProduct = (id) => {
    let aproduct = product.filter ((person) => person.id === id);
   
    console.log(aproduct);
    setValues(aproduct[0]);
    //setBtnName('Update Product');
    changeButtonName(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (values.id) {
      let updatedProduct = (product.filter ((eachproduct) => eachproduct.id == values.id))[0];
      updatedProduct.name = values.name;
      updatedProduct.description = values.description;

      console.log(updatedProduct)
      setValues({id:'', name:'', description:''})

      setProduct((product) => {
      let otherProduct =  product.filter ((eachproduct) => eachproduct.id != values.id);
      return [updatedProduct, ...otherProduct, ];
      });

      //setBtnName('Add Product')
      changeButtonName(true)
    } else {
    
      if (values.name && values.description) {
      
      const newProduct = { id: new Date().getTime().toString(), name: values.name, description: values.description};
      console.log(newProduct);
      setProduct((product) => {
        return [...product, newProduct];
      });
      
      setValues({id:'', name:'', description:''})
      //setBtnName('Add Product')
      changeButtonName(true)
    } else {
      console.log('empty values');
    }
  }
    
  };
  return (
    <>
      <h3>Product Registraion</h3>
      <article>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='firstName'>Name </label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={values.name}
              onChange = {set('name')}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Description </label>
            <input
              type='text'
              id='productDesc'
              name='productDesc'
              value={values.description}
              onChange = {set('description')}
            />
          </div>
          <button id='UpsertButton' type='submit'>{btnName}</button>
        </form>

         
        {product.map((product, index) => {
          const { id, name, description } = product;
          return (
            <div className='item' key={id}>
              <h4>{name}</h4>
              <p>{description}</p>
              <button onClick={()=>deleteProduct(id)}>Remove</button>
              <button onClick={()=>editProduct(id)}>Edit</button>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ProductCRUD;


