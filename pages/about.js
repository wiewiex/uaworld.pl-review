import style from "../styles/about/about.module.scss"
import Image from "next/image"

export default function about () {
    return (
        <section className={style.pageContainer}>
            <figure className={style.video}>
                <iframe src="https://www.youtube.com/embed/oGcMy20c0GU" allowFullScreen></iframe>
            </figure>
            <div className={style.infoContainer}> 
                <p>
                    UA World Art Fund is a non-profit foundation created to protect and support Ukrainian art.
                    The main goal of the foundation is to help Ukrainian artists who were forced to leave their homes during the war. To achieve this, we undertake the following actions:
    ‌                we organize charity auctions, promote artists on social networks, organize exhibitions, workshops, and conduct educational activities.
                </p>
                <div className={style.middleContainer}>
                    <div className={style.accountsNumbers}>
                        <span> If you want to support our initiative - foundation details:</span>
                        <ul>PLN: 
                            <li>PL74 1140 2004 0000 3102 8234 7164</li>    
                            <li>BIC number: BREXPLPWMBK</li>            
                        </ul>
                        <ul>USD:
                            <li>PL47 1140 2004 0000 3412 1553 7846</li>    
                            <li>BIC number: BREXPLPWMBK</li>            
                        </ul>
                        <ul>EUR:
                            <li>PL14 1140 2004 0000 3612 1553 7857</li>    
                            <li>BIC number: BREXPLPWMBK</li>            
                        </ul>
                    </div>
                    <div className={style.image}>
                        <Image
                        src="/images/about/IMG_20220511_211514_045.png"
                        width={400}
                        height={400}
                        alt="fund raising image"
                        />  
                    </div>
                </div>
                <ul className={style.mission}>Mission
                    <li>Preserving the cultural heritage of Ukraine and its national character against the Russian aggression.</li>
                    <li>Sale of paintings at charity auctions.</li>
                    <li>Establishing an international internet platform to promote artists.</li>
                    <li>Popularization of Ukrainian art on world markets.</li>
                    <li>{"Possibility to involve the artistic community in supporting the Foundation's goals."}</li>
                    <li>Establishing a studio for Ukrainian artists in Krakow.</li>
                </ul>
            </div>
            <figure className={style.video}>
                <iframe src="https://www.youtube.com/embed/hqHD-5R_Z9Y" allowFullScreen></iframe>
            </figure>
            <div className={style.administrationContainer}>
                <h2>Administration</h2>
                <div className={style.administrationContainer}>                
                    <div className={style.personContainer}>
                        <Image
                        src="/images/about/IMG_20220531_191445.jpg"
                        width={400}
                        height={600}
                        alt="administratior photo"
                        />
                        <p>Kara Minasian - Founder, CEO</p>
                    </div>
                    <div className={style.personContainer}>
                        <Image
                        src="/images/about/received_1620187731701640.jpeg"
                        width={400}
                        height={600}
                        alt="administratior photos"
                        />
                        <p>Katarzyna Stelmach - CEO</p>
                    </div>
                    <div className={style.personContainer}>
                        <Image
                        src="/images/about/IMG_20220528_133749_973.jpg"
                        width={400}
                        height={600}
                        layout="fixed"
                        alt="administratior photo"
                        />
                        <p>Tetiana Domnenko - Redactor</p>
                    </div>
                    <div className={style.personContainer}>
                        <Image
                        src="/images/about/IMG_20220528_133924_590.jpg"
                        width={400}
                        height={600}
                        alt="administratior photos"
                        />
                        <p>Alina Sribna - Redactor</p>
                    </div>
                </div>      
            </div>
        </section>
    )
}