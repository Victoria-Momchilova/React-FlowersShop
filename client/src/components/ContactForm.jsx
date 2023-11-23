import { useState } from "react";
import "./ContactForm.css";
import Button from "./MainElements/Button";

const formInitialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatpassword: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    sameAddress: true,
    shippingcountry: '',
    shippingcity: '',
    shippingstreet: '',
    shippingstreetNumber: ''
}

const formRegex = {
    firstname: /([\s\S]{3,})/,
    lastname: /([\s\S]{3,})/,
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    repeatpassword: /([\s\S]{4,})/,
    country: /([\s\S]{3,})/,
    city: /([\s\S]{3,})/,
    street: /([\s\S]{3,})/,
    streetNumber: /^\d+$/,
    shippingcountry: /([\s\S]{3,})/,
    shippingcity: /([\s\S]{3,})/,
    shippingstreet: /([\s\S]{3,})/,
    shippingstreetNumber: /^\d+$/
}

export default function ContactForm(props) {
    
    const [formValues, setFormValues] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [shippingAddress, setShippingAddress] = useState(false);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const changeShippingAddressHandler = (e) => {
        if(shippingAddress) {
            setFormValues(state => ({
                ...state,
                [e.target.name]: e.target.value
            }));
        } else {
            setFormValues(state => ({
                ...state,
                [e.target.name]: e.target.value,
                ['shipping' + e.target.name]: e.target.value
            }));
        }
    }

    const validatePasswordInput = (e) => {
        if(e.target.value != formValues.password) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true
            }));
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false
            }));
        }
    }

    const validateInput = (e) => {
        if(e.target.type === 'password' && e.target.value != formValues.repeatpassword) {
            setErrors(state => ({
                ...state,
                repeatpassword: true
            }));
        }
        if(!(formRegex[e.target.name]).test(e.target.value)) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true
            }));
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false
            }));
        }
    }

    const shippingAddressHandler = (e) => {
        setShippingAddress(e.target.checked);
        if(!e.target.checked) {
            setFormValues(state => ({
                ...state,
                shippingcountry: formValues.country,
                shippingcity: formValues.city,
                shippingstreet: formValues.street,
                shippingstreetNumber: formValues.streetNumber,
            }));
        } else {
            setFormValues(state => ({
                ...state,
                shippingcountry: '',
                shippingcity: '',
                shippingstreet: '',
                shippingstreetNumber: '',
            }));
        }
        
        setFormValues(state => ({
            ...state,
            [e.target.name]: !e.target.checked
        }));
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        let validate = true;
        let validateErrors = [];

        $('.contact-form input').each(function(){
            if(this.value === '') {
                validate = false;
                validateErrors.push(this.name);
                setErrors(state=>({
                    ...state,
                    [this.name]: true
                }))
            }
        });
       
        Object.keys(errors).forEach((key)=>{
            if(errors[key]){
                validate = false;
                validateErrors.push(key);
                // $('input[name=' + key + ']').focus();               
                return false;
            } 
        });
        
        if(validate) {
            props.onSubmitHandler(formValues);
        } else {
            $('input[name=' + validateErrors[0] + ']').focus();
        }
        
    }

    return (
        <form className="contact-form" ref={props.formRef} onSubmit={onSubmitForm}>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="firstname">Име <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        placeholder="Име"
                        onChange={changeHandler}
                        onBlur={validateInput}
                        value={formValues.firstname}
                    />
                    {errors.firstname && <div className="input-error">Името трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastname">Фамилия <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        placeholder="Фамилия"
                        onChange={changeHandler}
                        onBlur={validateInput}
                        value={formValues.lastname}
                    />
                    {errors.lastname && <div className="input-error">Фамилията трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email <span className="mandatory">*</span></label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        onBlur={validateInput}
                        value={formValues.email}
                    />
                    {errors.email && <div className="input-error">Въведете валиден email</div>}
                </div>
                
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="password">Парола <span className="mandatory">*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Парола"
                        onChange={changeHandler}
                        onBlur={validateInput}
                        value={formValues.password}
                    />
                    {errors.password && <div className="input-error">Паролата трябва да е над 5 символа и да съдържа поне едно число и един специален символ</div>}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="repeatpassword">Повтори парола <span className="mandatory">*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        id="repeatpassword"
                        name="repeatpassword"
                        placeholder="Повтори парола"
                        onChange={changeHandler}
                        onBlur={validatePasswordInput}
                        value={formValues.repeatpassword}
                    />
                    {errors.repeatpassword && <div className="input-error">Въведете същата парола</div>}
                </div>
            </div>
            
            
            <div className="row">
                <div className="form-section-heading">Адрес</div>
                <div className="form-group col-md-6">
                    <label htmlFor="country">Държава <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.country}
                    />
                    {errors.country && <div className="input-error">Държавата трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="city">Град <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.city}
                    />
                    {errors.city && <div className="input-error">Градът трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="street">Улица <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.street}
                    />
                    {errors.street && <div className="input-error">Улицата трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="streetNumber">Номер <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="streetNumber"
                        name="streetNumber"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.streetNumber}
                    />
                    {errors.streetNumber && <div className="input-error">Номерът трябва да съдържа само цифри</div>}
                </div>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="sameAddress"
                        name="sameAddress"
                        checked={!formValues.sameAddress}
                        onChange={shippingAddressHandler}
                    />
                    <label className="form-check-label" htmlFor="sameAddress">
                        Използвай различен адрес за доставка
                    </label>
                </div>
            </div>
            
            
            {shippingAddress && <div className="row">
                <div className="form-section-heading">Адрес за доставка</div>
                <div className="form-group col-md-6">
                    <label htmlFor="shippingcountry">Държава <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingcountry"
                        name="shippingcountry"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.shippingcountry}
                    />
                    {errors.shippingcountry && <div className="input-error">Държавата трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="shippingcity">Град <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingcity"
                        name="shippingcity"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.shippingcity}
                    />
                    {errors.shippingcity && <div className="input-error">Градът трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="shippingstreet">Улица <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingstreet"
                        name="shippingstreet"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.shippingstreet}
                    />
                    {errors.shippingstreet && <div className="input-error">Улицата трябва да е над 2 символа</div>}
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="shippingstreetNumber">Номер <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingstreetNumber"
                        name="shippingstreetNumber"
                        onChange={changeShippingAddressHandler}
                        onBlur={validateInput}
                        value={formValues.shippingstreetNumber}
                    />
                    {errors.shippingstreetNumber && <div className="input-error">Номерът трябва да съдържа само цифри</div>}
                </div>
            </div>}
        </form>
    );
}
