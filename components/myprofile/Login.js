import { useState, useEffect, useRef } from 'react'
import style from "../../styles/myprofile/auth.module.scss"

export default function Login (props) {
    //
    const [inputValues, setInputValues] = useState(null);
    const [error, setError] = useState(null);
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

        let headersList = {
            "Content-Type": "application/json"
           }
        
        //1
            fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, { 
             method: "POST",
             body: JSON.stringify(inputValues),
             headers: headersList
           })
         
        //2
            .then(res => res.json())
        
        //3
            .then(res => {
                // console.log(res);

                props.setUserLogged(res.token ? true : false)

                if (res.token) {
                    localStorage.setItem('jwt', res.token)
                    localStorage.setItem('user', res.user_email)
                }
                else {
                    loading.current.style.visibility = "hidden";
                    button.current.style.backgroundColor = "#B22222";
                    setError(res.message);
                    localStorage.clear("jwt");
                    localStorage.clear('user');
                }
            })    
      
    }

    useEffect(() => {
        
        if (localStorage.getItem('jwt')) {

            props.setUserLogged(true);
        }
        
    }, [])


    return(
        <form onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <input type="text" name="username" placeholder="email" onChange={e => handleChange(e.target.name, e.target.value)}/>
            <input type="password" name="password"placeholder="password" onChange={e => handleChange(e.target.name, e.target.value)}/>
            <button type="submit" ref={button}>
                Submit
                <div ref={loading} className={style.loadingContainer}>
                    <div className={style.loading}/>
                </div>
            </button>
            {error ? <p className={style.error} dangerouslySetInnerHTML={{__html: error}}/> : null}
        </form>        
    )
}