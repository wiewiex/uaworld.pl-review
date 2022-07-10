import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from "react-redux";
import { FetchUserData } from './myprofile/fetchUserData';

export default function Layout(props) {

    //user

    FetchUserData(); 

    const currentUser = useSelector(state => state.user);

    
    //menu
    const handleChange = (e) => {
        const menu = document.getElementById("mainMenu");
        menu.classList.toggle("show");
    }

    const handleClick = (e) => {
        e.preventDefault;
        const menu = document.getElementById("mainMenu");
        const checkbox = document.querySelector(".hamburgerCheckbox");
        checkbox.checked = false;
        menu.classList.remove("show");
    }

    return (
        <div className="appContainer">
            <Head>
                <title>Ukrainian World Ard Fundation</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="headerContainer">
                <h3>{currentUser.first_name ? `Welcome ${currentUser.first_name} ${currentUser.last_name}`: "Welcome"}</h3>
                    <Link href='/'>
                        <a className="logo">
                            <Image                     
                            src="/images/logo_horizontal_black_RGB.svg"
                            priority 
                            alt="logo"
                            width={700}
                            height={46.91}
                            />
                        </a>
                    </Link>
                <div className="socialLinks">
                    <Link href="https://www.instagram.com/uaworld_artfund"><img src='/images/Instagram.svg'/></Link>
                    <Link href="https://www.facebook.com/uaworldartfund"><img src='/images/Facebook.svg'/></Link>
                    <Link href="https://t.me/+zJx3I_HebOVmZTIy"><img src='/images/telegram.svg'/></Link>
                </div>
                <div className='hamburgerMenuContainer'>
                    <input onChange={handleChange} type="checkbox" id="hamburger" className="hamburgerCheckbox"/>
                    <label htmlFor="hamburger" className="hamburgerMenu">
                        <span className="hamburgerLine"> </span>
                        <span className="hamburgerLine"> </span>
                        <span className="hamburgerLine"> </span>
                    </label>
                </div>
            <nav id="mainMenu" className="mainMenu">
                    <Link href="/"><a onClick={handleClick}>UA Art</a></Link>
                    <Link href="/news"><a onClick={handleClick}>News</a></Link>
                    <Link href="/auctions"><a onClick={handleClick}>Auctions</a></Link>
                    <Link href="/partners"><a onClick={handleClick}>Partners</a></Link>
                    <Link href="/myprofile"><a onClick={handleClick}>My profile</a></Link>
                    <Link href="/about"><a onClick={handleClick}>About</a></Link>
                    <Link href="/contact"><a onClick={handleClick}>Contact</a></Link>
                </nav>            
            </header>
            <main className='mainContainer'>            
                {props.children}
            </main>  
        </div>        
    )
}