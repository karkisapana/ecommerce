import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from "react-hot-toast"
import {useNavigate } from "react-router-dom";
import "../../style/AuthStyle.css";

const Register = () => {

  // const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();


//form function

const handelSubmit =  async (e) => {

    e.preventDefault()
    try {
      
      const res = await axios.post('http://localhost:5000/api/v1/auth/register',
       {name,
         email,
          password,
           phone,
            address,
             answer});
      
       if(res.data.success){
        toast.success(res.data.message)
        navigate('/login');
       }else{
        console.log(res.data)
        toast.error(res.data.message)
       }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }

    console.log(name, email, password, phone, address )
    toast.success('Register Successfully ');
};


  return (

    <Layout title='Register-- ecommerce app'>
       <div className='form-container'>
       <h1>Register Page</h1>
   <form onSubmit={handelSubmit}>
  <div className="mb-3">
    <input
     type="text" 
     value={name}
     onChange={(e) => setName(e.target.value)}


    className="form-control"
     id="exampleInputEmail1"
     placeholder='Enter your Name'
     required

      />
  </div>


  <div className="mb-3">
    <input
     type="email" 
     value={email }
     onChange={(e) => setEmail(e.target.value)}

    className="form-control"
     id="exampleInputEmail1"
     placeholder='Enter Your Email'
     required

      />
  </div>


  <div className="mb-3">
    <input
     type="text"
     value={password} 
     onChange={(e) => setPassword(e.target.value)}
    className="form-control"
     id="exampleInputEmail1"
     placeholder='password'
     required

      />
  </div>


  <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>

  <div className="mb-3">
    <input
     type="text" 
     value={address}
     onChange={(e) => setAddress(e.target.value)}

    className="form-control"
     id="exampleInputEmail1"
     placeholder='Enter yourAddress'
     required

      />
  </div>


  <div className="mb-3">
    <input
     type="text" 
     value={answer}
     onChange={(e) => setAnswer(e.target.value)}
    className="form-control"
     id="exampleInputEmail1"
     placeholder='What is your favorite sports'
     required

      />
  </div>



  <button type="submit" className="btn btn-primary">Submit</button>
</form>


       </div>
    </Layout>

    );
};

export default Register









