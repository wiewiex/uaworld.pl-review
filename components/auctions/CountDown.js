import { useEffect, useState } from "react";
import style from "../../styles/auctions/auctions.module.scss"

export default function CountDown ( { auctionEnd, setAuctionIsClosed } ) {

    const [timer, setTimer] = useState(null);
    const [intrv, setIntrv] = useState(null);

    const timeToEnd = () => {
        const countDate = new Date(auctionEnd).getTime();
        const now = new Date().getTime();
        const toEnd = countDate - now;
      
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // calculate
        const textDay = Math.floor(toEnd / day);
        const textHour = Math.floor((toEnd % day) / hour);
        const textMinute = Math.floor((toEnd % hour) / minute);
        const textSecond = Math.floor((toEnd % minute) / second);
      
        if (toEnd <= 0) {
            setTimer("Auction closed");
            if (typeof setAuctionIsClosed == "function") {setAuctionIsClosed(true);}
            clearInterval(intrv);
        }

        else {
            setTimer(`${textDay} days ${textHour} hours ${textMinute} minutes ${textSecond} seconds`)
            if (typeof setAuctionIsClosed == "function") {setAuctionIsClosed(false);}
        }
      };

      useEffect(()=> {
          
          setIntrv(setInterval(() => {
            timeToEnd();
          },1000))

          return () => clearInterval(intrv)
      },[])

    return(
        <h2 className={style.countDown}>{timer ? timer : "loading..."}</h2>
    ) 
}