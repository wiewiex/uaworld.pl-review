import Item from '../components/index/Item'
import style from '../styles/ua-art/ua-art.module.scss'

export async function getStaticProps() {
    const res = await fetch('https://server835762.nazwa.pl/wordpress/wp-json/wp/v2/ua-art')
    const artists = await res.json();

    return {
        props: {
          artists
        },
        revalidate: 86400
      }
}

export default function UaArt({artists}) {

    const urlsArray = [];

    artists.forEach(el => {
        urlsArray.push(
            {
                url: el.acf.obraz_wyrozniajacy,
                id: el.id
            }
            )
    })

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(urlsArray);

    return (        
            <section className={style.itemsCard}>
                {urlsArray.map((el,i) => {
                    return <Item key={i} id={el.id} url={el.url} />
                })
                }
            </section>
        )
}