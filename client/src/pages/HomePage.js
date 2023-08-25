import React, {useState, useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([])
  const [categoriesy, setCategories] = useState([])

  //get products
  const getAllProducts = async() => {
    try {
      const {data} = await axios.get('/api/v1/product/get-product')
      setProducts(data.products);
    } catch (error) {
      console.log(error)
      
    }
  };
  useEffect(() => {
    getAllProducts()
  },[])

  return (
    <Layout title={"All products-Best offers "}>
      <div className="row mt-3">
      <div className="col-md-3">
        <h4 className="text-center"> Filter by category</h4>
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All products</h1>
        <div className="d-flex flex-wrap">

        {products?.map((p) => (
        
        <div className="card m-2" style={{width: '18rem'}}>
          <img 
          src={`/api/v1/product/product-photo/${p._id}`} 
          className="card-img-top" 
          alt={p.name} />
          <div className="card-body">
           <h5 className="card-title">p.name</h5>
            <p className="card-text">p.description</p>
            <button href="#" class="btn btn-primary ms-1">More Details</button>
            <button href="#" class="btn btn-secondary ms-1">Add To Cards</button>

  </div>
  </div>
         )) }
        </div>
      </div>


      </div>

    </Layout>
  );
};

export default HomePage;
