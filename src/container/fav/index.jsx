import { Nav } from "../../components/nav";
import './fav.css'
import CommonCard from "../../components/common-card";
import { useEffect, useState } from "react";

const addTocard=(product)=>{
    var products=localStorage.getItem('cart');
    if(products){
        products=JSON.parse(products);
        if(products.length===0){
            products=[{...product,qty:1}]
            localStorage.setItem('cart',JSON.stringify(products));
            return;
           }
        for(let i=0;i<products.length;i++){
            if(products[i].id===product.id){
                products[i].qty=products[i].qty+1;
                break;
            }
            if(i===products.length-1){
                products.push({...product,qty:1});
            }
        }
    }else{
        products=[{...product,qty:1}]
    }
    localStorage.setItem('cart',JSON.stringify(products));
   
}


const remove=(product,update)=>{
    var products=localStorage.getItem('fav');
    if(products){
        products=JSON.parse(products);
        let filterProduct=products.filter((data)=>data.id!==product.id);
        localStorage.setItem('fav',JSON.stringify(filterProduct));
        update();
    }
}

const Fav=()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
     update();
    },[])

    const update=async()=>{
        let temp=await localStorage.getItem('fav');
        console.log(temp);
        if(temp){
            setData(JSON.parse(temp));
            console.log(temp)
        }
        else{
            setData([])
        }
    }
return(
    <>
    <Nav/>
    <div className="fav-container">
        <div className="fav-product-area">
            {data.length==0?<h2 style={{textAlign:'center',paddingTop:'30%'}}>No products in favorite.</h2>:null}
          {data.map((element,index)=>{
             return <CommonCard remove={remove} addTocard={addTocard} update={update} data={element} key={index}/>
          })}
        </div>
    </div>
    </>
)
}

export default Fav;