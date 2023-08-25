import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiSupport, BiMailSend, BiPhoneCall} from 'react-icons/bi'

const Contact = () => {
  return (
  <Layout title={'contact-us'}>
    <div className='row contactus'>
      <div className='col-md-6 mt-3'>
        <img 
         src='/images/contactus.webp'
          alt='contactus'
          style={{width: "100p%"}}
        />
      </div>

      <div className='col-md-4'>
        <h1 className='bg-dark p-2 text-white text-center m-3'>Contact us</h1>
        <p className='text-justify mt-2'>
          Any query and info about product call free anytime we 24/7 available.
        </p>
        <p className='mt-3'>
          <BiMailSend /> : helloweb123@gmail.com
        </p>
        
        <p className='mt-3'>
        <BiPhoneCall /> : 1234567890
        </p>

        <p className='mt-3'>
        <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
        
      </div>

    </div>




    
    </Layout>

    )
}

export default Contact
