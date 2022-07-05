import style from '../../styles/myprofile/dashboard.module.scss'
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/user'
import { FetchUserData } from "./fetchUserData"


export default function Dashboard (props) {

    FetchUserData();
    
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const logOut = (e) => {
        e.preventDefault;
        props.setUserLogged(false);
        localStorage.clear('jwt', 'user', 'currentUserId');
        dispatch(setUser("notLoaded")); 
    }

    return(
        <section className={style.dashboard}>
            <h2>{`Hello ${localStorage.getItem('user')}`}</h2>
            <h3>Your data:</h3>
            <ul>
              <li>User name: <span>{currentUser.username}</span></li>
              <li>First name: <span>{currentUser.first_name}</span></li>
              <li>Last name: <span>{currentUser.last_name}</span></li>
              <li>Email address: <span>{currentUser.email}</span></li>
            </ul>
            <button disabled={true}>Update User Details</button>
            <button disabled={true}>Delete Account</button>
            <Link href="/open-call"><button className="active">OPEN CALL (FOR ARTIST)</button></Link>
            <button className="active" onClick={logOut}>Log out</button>
        </section>
    )
}