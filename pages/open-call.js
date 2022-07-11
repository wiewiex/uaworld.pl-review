import style from "../styles/open-call/open-call.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";


export default function OpenCall() {

    const imgInput = useRef(null);
    const [imgUrl, setImgUrl] = useState('');
    const [imgId, setImgId] = useState(null);

    const currentUser = useSelector(state => state.user);
    const [inputValues, setInputValues] = useState({});
    const [userMessage, setUserMessage] = useState(null);

    const button = useRef();
    const loading = useRef();

    const handleChange = (key, value) => {

      setInputValues(prevState => {
          return {
            ...prevState,
            [key]: value
          }
      })

    }



    function previewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(imgInput.current.files[0]);
      oFReader.onload = function (oFREvent) {
        setImgUrl(oFREvent.target.result);
      };
    };


    function uploadImage(e){
        e.preventDefault();

        loading.current.style.visibility = "visible";
        button.current.disabled = "true";

        if(imgInput.current.files.length > 0){
          var formData = new FormData();
          let file = imgInput.current.files[0];
          formData.append( 'file', file );
          formData.append( 'title', `${inputValues.title} by ${inputValues.full_name}`);
          

          let headersList = {
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Disposition': 'form-data;'
           }
           
           fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/media`, { 
             method: "POST",
             headers: headersList,
             body: formData
           }).then(function(response) {
             return response.json();
           }).then(function(data) {
              // console.log(data);
              setImgId(data.id);
            })

        }
      }

      useEffect(() => {

        if (imgId) {

          let headersList = {
            "Content-Type": "application/json",
            "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`
           }
           
           let bodyContent = JSON.stringify({
              "name": inputValues.title,
              "description": `<p>${inputValues.description},<br/>${inputValues.full_name}, ${inputValues.city}</p>`,
              "status": "draft",
              "categories": [{"id": 23}],
              "regular_price": inputValues.starting_price,
              "images": [{"id":imgId}]
           });
           
           fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products`, { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           }).then(function(response) {
             return response.json();
           }).then(function(data) {
             setUserMessage(<h2 className={style.successMessage}>Your work has been successfully uploaded. We will contact you by e-mail to arrange the details.</h2>);
           })
            .catch(error => setUserMessage(<h2 className={style.error}>{error}</h2>))
          

        }

      }, [imgId])

      

    return(
        <section className={style.openCallContainer}>
            <h1 className={style.title}>Open Call</h1>
            {!userMessage ? <p className={style.cta}>Would you like to put your work up for auction? Fill the form.</p> : null}
            {(() => {
              if (currentUser == "notLoaded") {
                return (
                  <section className={style.userNotLoggedPage}>
                    <h2>Only logged in users can apply.</h2>
                    <Link href="/myprofile"><a>Log in</a></Link>
                    <div className={style.image}>
                      <Image
                      src="/images/open-call/Pattern.png"
                      width={1300}
                      height={581}
                      alt="pattern image"
                      />
                    </div>
                  </section>
                )
              }
              else if (!userMessage && currentUser.role == "author") {
                return (
                  <form className={style.openCallForm} onSubmit={uploadImage}>
                      <label>Full name of author</label>
                      <input type="text" name="full_name" onChange={e => handleChange(e.target.name, e.target.value)}/>
                      <label>City</label>
                      <input type="text" name="city" onChange={e => handleChange(e.target.name, e.target.value)}/>
                      <label>Title of work</label>
                      <input type="text" name="title" onChange={e => handleChange(e.target.name, e.target.value)}/>
                      <label>Starting price (PLN)</label>
                      <input type="text" name="starting_price" onChange={e => handleChange(e.target.name, e.target.value)}/>
                      <label>Description, size, type of work</label>
                      <textarea name="description" rows="4" placeholder="" onChange={e => handleChange(e.target.name, e.target.value)}/>
                      <label htmlFor="imgInput" className={style.customImgInput}>
                        Attach photo
                      </label>
                      <input className={style.imgInput} id="imgInput" type="file" ref={imgInput} onChange={previewImage}/>
                          {imgUrl ? <Image className={style.previewImage} src={imgUrl} width={300} height={300} alt='image' /> : null}
                      <button ref={button} type="submit">
                        Send form
                        <div ref={loading} className={style.loadingContainer}>
                          <div className={style.loading}/>
                        </div>
                      </button>
                  </form>
            )}
            if (userMessage) {
              return <>{userMessage}</>
            }
          })
          ()
          }
        </section>      
    )
}