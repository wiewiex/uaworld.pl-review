import { useState, useRef } from 'react'

import style from "../../styles/myprofile/auth.module.scss"

export default function Register () {

    const [inputValues, setInputValues] = useState(null)
    const [registerMessage, setRegisterMessage] = useState(null)
    const form = useRef();

    const handleChange = (key, value) => {
        setInputValues(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        

        //1
        const singUp = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/?rest_route=/simple-jwt-login/v1/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
               },
            body: JSON.stringify(inputValues)
        })

        //2

        .then(res => {
            setRegisterMessage(res.ok ? <p className={style.registerMessage}>Registration successful, now you can log in.</p>
            : <p className={style.error}>Register failed. Enter correct data.</p>)
        })

        form.current.reset();


    }

    return(
        <form ref = {form} onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <input type="text" name="first_name" placeholder="first name" onChange={e => handleChange(e.target.name, e.target.value)}/>
            <input type="text" name="last_name" placeholder="last name" onChange={e => handleChange(e.target.name, e.target.value)}/>
            <input type="text" name="email" placeholder="email" onChange={e => handleChange(e.target.name, e.target.value)}/>
            <input type="password" name="password"placeholder="password" onChange={e => handleChange(e.target.name, e.target.value)}/>
            <button type="submit">Submit</button>
            {registerMessage ? <p className={style.registerMessage}>{registerMessage}</p> : null}
        </form>  
    )
}