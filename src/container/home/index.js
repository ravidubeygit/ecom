import './home.css';
import Card from '../../components/card/card';
import { useState, useEffect } from 'react';
import { Nav } from '../../components/nav';
import axios from 'axios';
const Home = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(false);



    useEffect(() => {
        fetchData();
    }, []);

    const search = (key) => {
        const result = []
        allproducts.map((element) => {
            if (element.title.indexOf(key) !== -1 || element.category.indexOf(key) !== -1) {
                result.push(element);
            }
        })
        console.log('result', result);
        setTotal(result.length);
        setProducts(result);
    }

    const fetchData = () => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setLoading(false)
                setProducts(res.data)
                setAllProducts(res.data);
                setTotal(res.data.length);
            })
            .catch(err => console.log(err))
    }

    const filter = (category) => {
        if (category === 'All') {
            setLoading(true);
            setShow(false);
            fetchData();
        }
        else {
            let filterProduct = allproducts.filter((item) => item.category == category);
            setProducts(filterProduct);
            setTotal(filterProduct.length);
            setShow(false);
        }

    }

    const decending = () => {

        let sorted = allproducts.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
        setProducts([...sorted]);
        setShow(false);
    }

    const asending = () => {

        let sorted = allproducts.sort(function (a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });
        setProducts([...sorted]);
        setShow(false);
    }

    const getProduct = () => {
        let currentProduct = []
        for (let i = (current - 1) * 6; i < 6 * current; i++) {
            if (i === total) {
                break;
            }
            currentProduct.push(products[i])
        }
        return currentProduct.map((element, index) => {
            return <Card data={element} key={index} />
        })
    }

    const getPagination = () => {
        let list = []
        let count = total / 6 + (total % 6 === 0 ? 0 : 1);
        for (let i = 1; i <= count; i++) {
            list.push(<button className={i === current ? 'active' : null} onClick={() => setCurrent(i)}>{i}</button>)
        }
        return list;
    }

    return (
        <>
            <Nav search={search} />
            <div className="home-area">
                {loading ? <h2 style={{ marginTop: '25%', textAlign: 'center' }}>Please Wait ....</h2> : null}
                <div className='card-area'>
                    {getProduct()}
                </div>
            </div>
            <div className='category-area'>
                <div className='item' onClick={() => setShow(!show)} style={{ width: '40px' }}>Filter</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={() => filter('All')} className={'item '}>All</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={() => filter('electronics')} className='item'>Electronics</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={() => filter('jewelery')} className='item'>Jewelery</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={() => filter("men's clothing")} className='item'>Men's clothing</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={() => filter("women's clothing")} className='item'>Women's clothing</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={decending} className='item'>Price (Low - High)</div>
                <div style={{ display: show ? 'block' : 'none' }} onClick={asending} className='item'>Price (High - Low)</div>
            </div>
            <div className='pagination'>
                {getPagination()}
            </div>
        </>
    )
}

export default Home;