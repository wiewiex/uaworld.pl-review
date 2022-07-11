import { useEffect, useState } from "react";
import style from "../../styles/auctions/addOrder.module.scss"

export default function AddOrder({ product, currentUser }) {

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {

    setInputValues(
      {
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email
      }
    );

  }, [])

  const handleChange = (key, value) => {
      setInputValues(prevState => {
        return {
          ...prevState,
          [key] : value
        }
      })
  }
    
  const confirmOrder = (e) => {

        e.preventDefault();
  
        let headersList = {
          "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`,
          "Content-Type": "application/json"
         }
         
         let bodyContent = JSON.stringify({
                 "customer_id" : currentUser.id,
                 "payment_method": "bacs",
                 "payment_method_title": "Direct Bank Transfer",
                 "set_paid": "true",
                 "billing": {
                   "first_name": currentUser.first_name,
                   "last_name": currentUser.last_name,
                   "address_1": inputValues.address,
                   "address_2": "wp user email " + currentUser.email,
                   "city": inputValues.city,
                   "state": " ",
                   "postcode": inputValues.postCode,
                   "country": inputValues.country,
                   "email": inputValues.email ,
                   "phone": inputValues.phoneNumber
                 },
                 "shipping": {
                   "first_name": inputValues.firstName,
                   "last_name": inputValues.lastName,
                   "address_1": inputValues.address,
                   "address_2": "",
                   "city": inputValues.city,
                   "state": "",
                   "postcode": inputValues.postCode,
                   "country": inputValues.country
                 },
                 "line_items": [
                   {
                     "product_id": product.id,
                     "quantity": "1"
                   },
                 ],
                 "shipping_lines": [
                   {
                     "method_id": "flat_rate",
                     "method_title": "Flat Rate",
                     "total": "0"
                   }
                 ]
           });
         
         fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders`, { 
           method: "POST",
           body: bodyContent,
           headers: headersList
         }).then(function(response) {
           return response.json();
         }).then(function(data) {
           console.log(data);
         })
  
  
      }


      return(
        <form className={style.confirmOrderForm}>
          <h2>Congratulations {currentUser.first_name}, you won auction!</h2>
          <p>Send your contact details. We will contact with you to determine the details of the transaction.</p>
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" value={inputValues.firstName} onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="firstName">Last name</label>
          <input type="text" name="lastName" value={inputValues.lastName} onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" value={inputValues.email} onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="phoneNumber">Phone number</label>
          <input type="text" name="phoneNumber" onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="address">Address</label>
          <input type="text" name="city" onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="postCode">Post code</label>
          <input type="text" name="address" onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="city">City</label>
          <input type="text" name="postCode" onChange={e => handleChange(e.target.name, e.target.value)}/>
          <label htmlFor="country">Country</label>
          <input type="text" name="country" onChange={e => handleChange(e.target.name, e.target.value)}/>
          <button onClick={confirmOrder}>Finalize transaction</button> 
        </form>   
      )
}