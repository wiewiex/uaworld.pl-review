import Login from "../components/myprofile/Login"
import Register from "../components/myprofile/Register"
import Dashboard from "../components/myprofile/Dashboard"
import { useState } from "react"
import style from "../styles/myprofile/auth.module.scss"

export default function MyProfile () {

    const [userLogged, setUserLogged] = useState(false);


    return (
        <div className={style.myprofileContainer}>
            {userLogged ? (
                <Dashboard setUserLogged={setUserLogged} userLogged={userLogged}/>
            ) : (
                <section className={style.auth}>          
                <Login setUserLogged={setUserLogged}/>
                <Register/>
            </section>  
            )
            }           
        </div>
    )
}