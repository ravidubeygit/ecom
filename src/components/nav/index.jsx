import React, { useState } from "react";
import './nav.css';
import { Link } from "react-router-dom";
export const Nav = (props) => {
    const [input,setInput]=useState('');
    const [open,setOpen]=useState(false);
    const search=()=>{
        if(props.search){
            props.search(input);
        }
        else{
            window.location.href='/';
        }

    }

    const toggle=()=>{
        setOpen(false)
    }
    
    return (
        <nav>
            <div>
                <Link to='/' className="logo">Brand Name</Link>

                <button onClick={()=>setOpen(true)} className="menu hidepc"> <i className="fa fa-bars"></i></button>
            </div>

            <div style={{right:open?'0px':'-100%'}} className="right-area">
                <i onClick={toggle} className="fa fa-times close hidepc"></i>
                <div className="search-area">
                    <input type="text" name="" value={input} onChange={e=>setInput(e.target.value)} id="" />
                    <button onClick={search}>Search</button>
                </div>
                <Link className="nav-link" to='/favorite'><i class="fas fa-heart"></i><span className="hidepc">Favorite</span> </Link>
                <Link className="nav-link" to='/cart'><i class="fas fa-shopping-cart"></i><span  className="hidepc">Cart</span></Link>
            </div>
        </nav>
    )
}