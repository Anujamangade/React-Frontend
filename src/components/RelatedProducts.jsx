import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];

      // Check if category is a string, then normalize to lowercase
      if (category && typeof category === 'string') {
        productsCopy = productsCopy.filter(item =>
          item.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Check if subCategory is a string, then normalize to lowercase
      if (subCategory && typeof subCategory === 'string') {
        productsCopy = productsCopy.filter(item =>
          item.subCategory.toLowerCase() === subCategory.toLowerCase()
        );
      }

      setRelated(productsCopy.slice(0, 5)); // Set the first 5 related products
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map(item => (
            <ProductItem
              key={item._id} // Use _id as key for better optimization
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500">No related products available.</div>
      )}
    </div>
  );
};

export default RelatedProducts;

// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const RelatedProducts = (category, subCategory) => {

//     const { products } = useContext(ShopContext);
//     const [related, setRelated] = useState([]);

//     useEffect(()=>{

//         if (products.lenght > 0) {

//             let productsCopy = products.slice();

//             productsCopy = productsCopy.filter((item) => category === item.category);
//             productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

//             setRelated(productsCopy.slice(0,5));
//         }

//     },[products])

//   return (
//     <div className='my-24'>
//       <div className='text-center text-3xl py-2'>
//         <Title text1={'RELATED'} text2={"PRODUCTS"}/>
//       </div>

//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//         {related.map((item,index)=>(
//             <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default RelatedProducts

