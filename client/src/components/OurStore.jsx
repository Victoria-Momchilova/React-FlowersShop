import { useState, useEffect } from "react";
import WhiteBg from "./MainElements/WhiteBg.jsx"
import Product from './MainElements/Product.jsx'
import Button from "./MainElements/Button.jsx";
import './OurStore.css'
import products from "../assets/products.js";

export default function OurStore(props) {
    const [categories, setCategories] = useState([
        {id: 'outdoorBtn', value: 'outdoor', text: 'Градински цветя', isChacked: true, hasSubCat: true },
        {id: 'indoorBtn', value: 'indoor', text: 'Стайни цветя', isChacked: false, hasSubCat: true },
        {id: 'seedsBtn', value: 'seeds', text: 'Семена', isChacked: false, hasSubCat: false },
        {id: 'potsBtn', value: 'pots', text: 'Саксии', isChacked: false, hasSubCat: false },
        {id: 'soilBtn', value: 'soil', text: 'Почва', isChacked: false,  hasSubCat: false },
        // {id: 'toolsBtn', value: 'tools', text: 'Инструменти', isChacked: false },
        {id: 'decorationsBtn', value: 'decorations', text: 'Декорации', isChacked: false, hasSubCat: false },
    ]);

    const [subcategories, setSubCategories] = useState([
        {id: 'greenBtn', value: 'green', text: 'Зелени', isChacked: true },
        {id: 'floweringBtn', value: 'flowering', text: 'Цъфтящи', isChacked: false },
        {id: 'fruitsBtn', value: 'fruits', text: 'Плодни', isChacked: false },
    ]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const [isSubcategory, setIsSubcategory] = useState(true);

    const [activeCategories, setActiveCategories] = useState([categories[0].value]);

    const [activeSubCategories, setActiveSubCategories] = useState([subcategories[0].value]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const handleCategoryBtn = (event, index) => {
        let category = categories;
        let active = [];

        category.forEach((cat) => {
            cat.isChacked = false;
            if (cat.value === event.target.dataset.value) {
                if(cat.hasSubCat === false) { setIsSubcategory(false) }
                cat.isChacked = true;
            }
        });

        setCategories(category);
  
        categories.forEach((cat)=>{
            if(cat.isChacked === true) {
                active.push(cat.value);
            }
        });

        setActiveCategories(active);
    }
    
    const handleCheckBox = (event, index) => {
        let subcategory = subcategories;
        let active = [];

        if(activeSubCategories.length === 1 && activeSubCategories.toString() === event.target.value) {} 
        else {
            subcategory.forEach((cat) => {
                if (cat.value === event.target.value) {
                    cat.isChacked = !cat.isChacked;
                }
            });
            
            setSubCategories(subcategory);
    
            subcategories.forEach((cat)=>{
                if(cat.isChacked === true) {
                    active.push(cat.value);
                }
            });
    
            setActiveSubCategories(active);
        }
    }

    const selectAllSubCategories = (e) => {
        let active = [];
        subcategories.forEach((cat)=>{
            cat.isChacked = true;
            active.push(cat.value);
        });
        setSelectedSubCategories(subcategories);
        setActiveSubCategories(active);
    }

    const filterFunction = (p,c,a,callback) => {
        let filteredproducts = p.filter((product)=>{
            let check = a.includes(product[c].toLowerCase().toString());
            if(typeof callback == "function"){
                callback(check,product);
            }
            return check;
        });

        return filteredproducts;
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const addProductToCart = (addedProduct) => {
        props.onClickProduct(addedProduct);
    }

    useEffect(()=>{
        let products = props.products;

        if(searchInput.length > 0) {
            setFilteredProducts(products.filter((product)=>{
                return product.name.toLowerCase().match(searchInput.toLowerCase());
            }));
        } else {
            if(isSubcategory === true) {
                let categoryProducts = filterFunction(products, 'category', activeCategories);
                setFilteredProducts(filterFunction(categoryProducts, 'subcategory', activeSubCategories));
            } else {
                setFilteredProducts(filterFunction(products, 'category', activeCategories, (c,p)=>{
                    if(c === true && p.subcategory != undefined) {
                        setIsSubcategory(true);
                    }
                }));  
            }
        }
       
    }, [activeCategories, activeSubCategories, searchInput, props.products]);

    return (
        <section className="our-store-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="our-store-content col-10">
                        <div className="heading-wrap">
                            <h2>Нашите продукти</h2>
                            <div className="search-bar">
                                <img className="" src="images/OurStore/search.svg" title="search" alt="search-icon" />
                                <input type="text" placeholder="Search here" onChange={handleSearchChange} value={searchInput} />
                            </div>                            
                        </div>                        
                        <div className="separator"></div>
                        {searchInput.length<=0 && <div className="category-list-wrap">
                            <ul className="category-list">
                                {categories.map((category, index) => {
                                    return (
                                        <li 
                                        key={category.id} 
                                        id={category.id}
                                        data-value={category.value}
                                        onClick={(event)=>{handleCategoryBtn(event, category.id)}} 
                                        className={categories[index].isChacked ? 'active' : ''}
                                        > 
                                            {category.text}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>}
                        {searchInput.length<=0 && isSubcategory && <div className="subcategory-list-wrap">
                            <form>
                                <ul className="subcategory-list">
                                    {subcategories.map((subcategory, index) => {
                                        return (
                                            <li key={subcategory.id} className={subcategories[index].isChacked ? 'active' : ''}>
                                                <input onChange={(event)=>{handleCheckBox(event, subcategory.id)}} type="checkbox" id={subcategory.id} name={subcategory.id} value={subcategory.value} className="" checked={subcategories[index].isChacked} />
                                                <span className="checkmark"></span>
                                                <label className="" htmlFor={subcategory.id}>{subcategory.text}</label>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </form>
                            <Button handleButton={selectAllSubCategories} className="small" text="Всички" />
                        </div>}
                        <div className="row">

                            {filteredProducts.map(product => {
                                    return  (<Product 
                                        className='col-12 col-md-6 col-lg-4'
                                        key={product.id}
                                        id={product.id}
                                        name={product.name} 
                                        imageurl={product.imageurl} 
                                        price={product.price} 
                                        label={product.enviroment ? true : false}
                                        enviroment={product.enviroment}
                                        onAddProductToCart={addProductToCart}
                                    />)
                            })}

                        </div>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}