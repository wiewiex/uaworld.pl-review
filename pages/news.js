import style from "../styles/news/news.module.scss"
import Link from "next/link";

export const getStaticProps = async () => {
    const res = await fetch(`https://graph.facebook.com/100906852598432/feed?fields=full_picture,message&access_token=${process.env.NEXT_PUBLIC_FACEBOOK_TOKEN}`)
    const jsonRes = await res.json();
    const posts = jsonRes.data;

    return{
        props: {
            posts
        },
        revalidate: 3600
    }
} 
export default function News( {posts} ) {
   
    return (
        <section className={style.postsContainer}>
                {posts.map((post, i) => {
                    return (
                    <Link key={i} href={`https://www.facebook.com/${post.id}`}>
                        <div className={style.post}>                    
                            <h2 className={style.message}>{post.message}</h2>
                            {post.full_picture ? <img className={style.image} src={post.full_picture}/> : null}                    
                        </div>
                    </Link> 
                    )
                })
            }   
        </section>        
    )
}