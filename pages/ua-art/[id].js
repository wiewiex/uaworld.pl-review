import Link from 'next/link'
import Image from 'next/image'

import styles from '../../styles/ua-art/singleArtist.module.scss'

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/ua-art`)
    const artists = await res.json()

    const paths = artists.map(artist => {
      return {
        params: {
          id: artist.id.toString()
        }
      }
    })

    return {
      paths,
      fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/ua-art/${id}`)
    const artist = await res.json()

    return {
      props: { artist },
      revalidate: 86400
    }

}

export default function Post({ artist }) {
    

    return (
        <section className={styles.singleArtistContainer}>
          <h1 className={styles.title}dangerouslySetInnerHTML={{
            __html: artist.title.rendered
          }}/>

          <Image
          src={artist.acf.obraz_wyrozniajacy}
          width={1000}
          height={1000}
          alt={`${artist.title.rendered} painting`}
          />
          
          <div className={styles.contentContainer} dangerouslySetInnerHTML={{
            __html: artist.content.rendered
          }} />        
  
          
            <Link href="/">
              <a className={styles.goBack}>
                  &lt; Go back
                </a>
            </Link>
        </section>
    )
  }