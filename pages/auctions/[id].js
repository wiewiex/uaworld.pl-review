import Image from "next/image"
import style from "../../styles/auctions/auction.module.scss"
import CountDown from "../../components/auctions/CountDown"
import AddOrder from "../../components/auctions/AddOrder"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Link from "next/link";

export const getStaticPaths = async () => {

    let headersList = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products?category=15`, { 
    method: "GET",
    headers: headersList
    })    

    const products = await res.json()

    const paths = products.map(product => {
      return {
        params: {
          id: product.id.toString()
        }
      }
    })

    return {
      paths,
      fallback: 'blocking'
    }
}

export const getStaticProps = async (context) => {

    const id = context.params.id

    let headersList = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/${id}`, { 
    method: "GET",
    headers: headersList
    })

    const product = await res.json();

    return {
      props: { product },
      revalidate: 2
    }

}

export default function Auction ({ product }) {

    // console.log(product);
    
    const [inputValue, setInputValue] = useState("");
    const [userMessage, setUserMessage] = useState(null);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const currentUser = useSelector(state => state.user);

    const [biddersFromApi, setBiddersFromApi] = useState(product.tags);
    const [currentPrice, setCurrentPrice] = useState(product.price);
    const [auctionIsClosed, setAuctionIsClosed] = useState(null);
    const bidders = [];

    biddersFromApi.forEach(el => {
      bidders.push(el.name.split("-"));
    })

    //sortArray

    const sortedBidders = bidders.sort(function(a, b) {
      return b[1] - a[1];
    });
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if (parseInt(inputValue) <= parseInt(currentPrice) + 100) {
        setUserMessage(`Zaproponuj cenę wyższą niż ${parseInt(currentPrice) + 100}zł`)
      }

      else {

        let headersList = {
          "Content-Type": "application/json",
          "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`
         }

         let newBiddersList = [
           ...biddersFromApi,
           {
            name: `${currentUser.email}-${inputValue}`,
            slug: `${currentUser.email}-${inputValue}`
          }
         ]
         
         let bodyContent = JSON.stringify({
            "regular_price": inputValue,
            "tags": newBiddersList
         });
         
         fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/${product.id}`, { 
           method: "PUT",
           body: bodyContent,
           headers: headersList
         }).then(function(response) {
           return response.json();
         }).then(function(data) {
           console.log(data);
           setCurrentPrice(data.price);
           setBiddersFromApi(newBiddersList);
         })
  
      }      
      
    }

    let orderForm = null;

    if (sortedBidders.length < 0) {
      orderForm = auctionIsClosed && currentUser.email == sortedBidders[0][0] ? <AddOrder currentUser={currentUser} product={product}/> : null;
    }

    useEffect(() => {

      if (localStorage.getItem("user")) {
        setUserIsLogged(true);
      }

    }, [])

    


    return(
        <section className={style.pageContainer}>
            {orderForm}
            <div className={style.auction}>
            <Image className={style.image}
            src={product.images[0].src}
            width={600}
            height={600}
            />
            <div className={style.textContainer}>
              <h2 className={style.title}>{product.name}</h2>
              <div className={style.description} dangerouslySetInnerHTML={{__html: product.description}}/>
              <p>Current price:</p>
              <span className={style.price}>{currentPrice + "zł"}</span>
              <div className={style.timer}>
                <p>Time left:</p>
                <CountDown auctionEnd={product.acf.auction_end} setAuctionIsClosed={setAuctionIsClosed}/>
              </div>
              {userIsLogged ? (           
              <div className={style.bidContainer}>
                <h3>PLN</h3>
                <input type="number" onChange={e => setInputValue(e.target.value)}/>
                <button onClick={handleSubmit}>Bid!</button>       
              </div>
              ): <p>Bidding is available only for logged in users. <Link href="/myprofile"><a>{" "}Log in</a></Link></p>}
              <h4>{userMessage}</h4>
              <div className={style.biddersContainer}>
                <h3>Auction history:</h3>
                <ul>
                  {sortedBidders.map((el, i) => {
                    //convert letters to asterisks
                    const arrayOfLetters = [...el[0]];
                    const indexOfMonkey = arrayOfLetters.indexOf("@");
                    arrayOfLetters.splice(indexOfMonkey - 3, 3, "*","*","*");
                    const emailWithAsterisk = arrayOfLetters.join("");

                    return (
                      <li key={i}>{emailWithAsterisk} - {el[1]}zł</li>
                    )
                  })}
                </ul>
              </div>       
            </div>
          </div>             
        </section>
    )
}