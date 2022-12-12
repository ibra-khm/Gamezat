import React, { useContext } from 'react';
import { Product } from '../../components/Affiliate/Product';
import { ProductContext } from '../../context/ProductContext';

export default function Affiliate() {
    const { products } = useContext(ProductContext)
    return (
        <div className='max-w-screen bg-blue-gray-900 pt-20'>
            <div className='max-w-screen mb-5 text-center justify-center'>
                <div className='mx-auto '>
                <div className=' w-11/12 relative mx-auto'>
                    <span className='absolute z-50 top-1/2 transition-300 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  font-bold lg:text-5xl text-2xl  text-white'>Affiliate Products</span>
                    <img className='lg:w-[1210px] mx-auto brightness-75 transition duration-300 hover:duration-300 ease-in-out hover:shadow-lg hover:shadow-indigo hover:brightness-50 -z-10  shadow-xl  rounded h-[250px] w-full object-cover object-center ' 
                    // src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg" 
                    src="https://www.gamer-authority.com/wp-content/uploads/2022/06/Gaming.jpg" 
                    alt="" />
            </div>
                </div>
                </div>
            <div className='flex flex-wrap dark:bg-blue-gray-900 gap-5 justify-center'>
                {
                    products?.map((product) => {

                        return <>
                            <Product product={product} />
                        </>
                    })
                }


            </div>
        </div>
    );
}
