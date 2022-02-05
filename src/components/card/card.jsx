import './card.css'

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

const addTofav=(product)=>{
    var products=localStorage.getItem('fav');
    if(products){
        products=JSON.parse(products);
       if(products.length===0){
        products=[{...product}] ;
        localStorage.setItem('fav',JSON.stringify(products));
        return;
       }
        for(let i=0;i<products.length;i++){
            if(products[i].id===product.id){
                break;
            }
            if(i===products.length-1){
                products.push({...product});
            }
        }
    }else{
        products=[{...product}]
    }
    localStorage.setItem('fav',JSON.stringify(products));
}


const Card = (props) => {
    const {id,image,title,price,rating}=props.data;
    return (
        <div  className='card'>
            <div className='card-img'>
                <img src={image} alt="" />
            </div>
            <div className='bottomArea'>
                <div onClick={()=>window.location.href='/product/'+id} className='title'>{title}</div>
                <div className='rating-area'>
                    <span className='rating'><i class="fas fa-star"></i> {rating.rate}</span>
                    <span className='count'><i class="fas fa-users"></i> {rating.count}</span>
                </div>
                <div className='price-and-btn'>
                    <div className='priceArea'>
                        <span>
                            Rs. {price}
                        </span>
                    </div>
                    <div className='button-area'>
                        <button onClick={()=>addTofav(props.data)} className='btn btn-primary'>
                            <i style={{color:'red'}} class="fas fa-heart"></i>
                        </button>

                        <button onClick={()=>addTocard(props.data)} className='btn btn-primary'>
                            <i style={{color:'green'}} class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>



            </div>

        </div>
    )
}
export default Card;