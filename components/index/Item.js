import style from "../../styles/ua-art/ua-art.module.scss"
import Image from "next/image";
import Link from "next/link";

const Item = ({ url, id }) => {
    return (
        <Link href={`/ua-art/${id}`}>
            <div className={style.singleItem}>                
                <Image src={url}
                alt="painting"
                width={300}
                height={300}
                />                
            </div>
        </Link>
    )
}

export default Item;