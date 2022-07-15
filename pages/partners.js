import style from '../styles/partners/partners.module.scss'
import Image from 'next/image'

import fs from 'fs'

export const getStaticProps = async () => {
    //get array of names of all images in the folder
    const array = fs.readdirSync('./public/images/partners', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

    return {
        props: { images: array}
    }
}

export default function partners({images}) {
    return (        
            <section className={style.partnersContainer}>
                {images.map((image, i) => {
                    return (
                        <div key={i} className={style.imageContainer}>
                            <Image
                            className={style.image}
                            src={`/images/partners/${image}`}
                            width={250}
                            height={250}
                            alt="partner logo"
                            />
                        </div>
                    )
                })}
            </section>
        )
}