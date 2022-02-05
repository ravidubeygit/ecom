import './productDetails.css'
import { Nav } from '../../components/nav';
import './productDetails.css';
import CommonCard from '../../components/common-card';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail=()=>{
   const {id}=useParams();
   const [data,setData]=useState(null)
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products/'+id)
        .then(res=>setData(res.data))
        .catch(err=>alert('something went wrong'));
    })
    return(
     <>
     <Nav/>
     <div className='product-details-area'>
         <h1 style={{textAlign:'center'}}>Product Detail</h1>
     {data?<CommonCard data={data}/>:null} 
     </div>
     </>
 )
}

export default ProductDetail;