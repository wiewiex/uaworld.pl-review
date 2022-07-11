import { useState, useRef } from 'react'

import style from "../../styles/myprofile/auth.module.scss"

export default function Register () {

    const [inputValues, setInputValues] = useState(null)
    const [userMessage, setUserMessage] = useState(null)
    const form = useRef();
    const button = useRef();
    const loading = useRef();

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
        loading.current.style.visibility = "visible";
        button.current.disabled = "true";
        

        //1
        await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/?rest_route=/simple-jwt-login/v1/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
               },
            body: JSON.stringify(inputValues)
        })

        //2

        .then(res => {
            if (res.ok) {
                
                setUserMessage(<p className={style.successMessage}>Registration successful, now you can log in.</p>);
                loading.current.style.visibility = "hidden";
                button.current.style.backgroundColor = "#558250";
            }

            else {

                setUserMessage(<p className={style.error}>Register failed. Enter correct data.</p>);
                loading.current.style.visibility = "hidden";
                button.current.style.backgroundColor = "#B22222";
                button.current.removeAttribute("disabled");
            }

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
            <button ref={button} type="submit">
                Submit
                <div ref={loading} className={style.loadingContainer}>
                    <div className={style.loading}/>
                </div>
            </button>
            {userMessage ? userMessage : null}
        </form>  
    )
}