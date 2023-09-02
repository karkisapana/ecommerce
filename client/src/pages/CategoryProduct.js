import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const params = useParams()
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if(params?.slug) getProductsByCat()
    }, [params?.slug])
    const getProductsByCat = async () => {
        try {
            const {data} = await axios.get(
                `https://ecommerce-oqlg.onrender.com/api/v1/product/product-category/${params.slug}`)
                setProducts(data?.products);
                setCategory(data?.category);

        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <Layout>
    <div className='container mt-3'>
    <h1 className='text-center'>{category?.name}</h1>

    </div>
      
    </Layout>
  )
}

export default CategoryProduct
