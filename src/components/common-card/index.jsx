import './common-card.css'

const CommonCard=(props)=>{
    const {id,image,title,price,rating,description}=props.data;
    const del=()=>{
        props.remove(props.data,props.update);
    }

    const addtoCart=()=>{
        props.addTocard(props.data);
    }

    const inc=()=>{
        props.inc(id,props.update);
    }

    const dec=()=>{
        props.dec(id,props.update)
    }
    return(
        <div  className="common-card-area">
            <div className='card-left-area'>
                <img src={image} alt='product-img'/>
            </div>
            <div className='card-right-area'>
                <h3 onClick={()=>window.location.href='/product/'+id} className='c-card-title'>
               {title}
                </h3>

                <p className='c-card-description'>
                {description}
                </p>
                <div  className='card-rating-area'>
                    <span className='rating'><i class="fas fa-star"></i> {rating.rate}</span>
                    <span className='count'><i class="fas fa-users"></i> {rating.count}</span>
                    <span className='count'>Price {price} Rs/-</span>
                </div>

                <div className='button-area'>
                    <button className='btn' onClick={del}>  <i style={{color:'red'}} class="fas fa-trash"></i></button>
                    {props.cart?null:<button className='btn' onClick={addtoCart}>  <i class="fas fa-cart-plus"></i></button>} 
                    
                    {props.cart?
                    <div className='counter-area'>
                     <button disabled={props.data.qty===10} onClick={inc} className='counter-btn btn'><i class="fas fa-plus"></i></button>
                     <span>{props.data.qty}</span>
                     <button onClick={dec} className='counter-btn btn'><i class="fas fa-minus"></i></button>
                    </div> :null}
                </div>
            </div>
        </div>
    )
}

export default CommonCard;