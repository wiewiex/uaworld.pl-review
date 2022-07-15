import Image from "next/image"
import Link from "next/link"
import style from "../styles/auctions/auctions.module.scss"
import CountDown from "../components/auctions/CountDown"


export async function getServerSideProps() {

    let headersList = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`
       }

    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?category=15&per_page=100`, { 
    method: "GET",
    headers: headersList
    })    

    const products = await res.json()

    return {
        props: {
          products
        }
      }
}


export default function Auctions(props) {
    const allProducts = props.products;
   
    // console.log(allProducts);
    return(
        <section className={style.itemsCard}>
            {allProducts.map(product => {

                return(
                        <Link key={product.id} href={`/auctions/${product.id}`}>
                            <div className={style.singleItem} >
                                <Image
                                className={style.image}
                                src={product.images[0].src}
                                width={280}
                                height={280}
                                alt="item image"
                                />
                                <h2 className={style.title}>{product.name}</h2>
                                <span className={style.price}>{product.price +"zł"}</span>
                                <CountDown auctionEnd={product.acf.auction_end}/>
                                <button>Check It!</button>
                            </div>
                        </Link>                   
                ) 
            })}
        </section>
    )
}