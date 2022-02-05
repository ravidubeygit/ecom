import { Nav } from "../../components/nav";
import '../fav/fav.css'
import './cart.css'
import CommonCard from "../../components/common-card";
import { useEffect, useState } from "react";

const inc=(id,update)=>{
    var products=localStorage.getItem('cart');
    if(products){
        products=JSON.parse(products);
        for(let i=0;i<products.length;i++){
          if(products[i].id===id){
            products[i].qty=products[i].qty+1;
            break;  
        }
        }
        localStorage.setItem('cart',JSON.stringify(products));
        update();
    }

}


const dec=(id,update)=>{
    var products=localStorage.getItem('cart');
    if(products){
        products=JSON.parse(products);
        for(let i=0;i<products.length;i++){
          if(products[i].id===id){
            if(products[i].qty!==1){
                products[i].qty=products[i].qty-1;
                break;  
            }
            else{
                products=products.filter((data)=>data.id!==id);
                break;
            }
           
        }
        }
        localStorage.setItem('cart',JSON.stringify(products));
        update();
    }

}



const remove=(product,update)=>{
    var products=localStorage.getItem('cart');
    if(products){
        products=JSON.parse(products);
        let filterProduct=products.filter((data)=>data.id!==product.id);
        localStorage.setItem('cart',JSON.stringify(filterProduct));
        update();
    }
}

const Cart=()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
     update();
    },[])

    const update=async()=>{
        let temp=await localStorage.getItem('cart');
        console.log(temp);
        if(temp){
            setData(JSON.parse(temp));
            console.log(temp)
        }
        else{
            setData([])
        }
    }

    const getSummery=()=>{
        let total=0;
        let list=data.map(element=>{
            total+=element.price * element.qty;
            return (
            <div className="summery">
                 <div className="img">
                     <img src={element.image} />
                 </div>
                 <div className="qty">{element.qty}</div>
                 <div className="price">{(element.price * element.qty).toFixed(2)}</div>
            </div>)
        })

        list.push(  
        <div className="summery">
        <div className="img">
        </div>
        <div className="qty">Total :- </div>
        <div className="price">{total.toFixed(2)}</div>
   </div>)
       
       return list;
    }
return(
    <>
    <Nav/>
    <div className="fav-container">
        <div className="fav-product-area">
            {data.length==0?<h2 style={{textAlign:'center',paddingTop:'30%'}}>No products in cart.</h2>:null}
          {data.map((element,index)=>{
             return <CommonCard cart={true} remove={remove} inc={inc} dec={dec} update={update} data={element} key={index}/>
          })}
          {data.length==0?null:
          <div className="summery-area">
        <div className="summery">
            <div className="img">Product</div>
            <div className="qty">Qty.</div>
            <div className="price">Price</div>
        </div>
        {getSummery()}
      
        </div>
}
        </div>

      
    </div>
    </>
)
}

export default Cart;