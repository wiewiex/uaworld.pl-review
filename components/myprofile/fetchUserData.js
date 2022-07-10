import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/user'
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

export const FetchUserData = () => {

    const dispatch = useDispatch();
    const [idLoaded, setIdLoaded] = useState(false);
    const currentUser = useSelector(state => state.user);

    useEffect(() => {

        if (localStorage.getItem("user")) {

            if (currentUser === "notLoaded") {
        
                // dane usera z wp api
                      
                  let headersList = {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                     }
                     
                     fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/users/me`, { 
                       method: "GET",
                       headers: headersList
                     })
                     
                     .then(function(response) {
                       return response.json();
                     })
                     
                     .then(function(data) {
                       localStorage.setItem('currentUserId', data.id);
                       setIdLoaded(true);
                     })   
                
                }           

        }

    },[])

    
    useEffect(()=>{
  
        if (currentUser === "notLoaded") {
  
          // dane usera z WooCommerce
          if (localStorage.getItem('currentUserId')) {
  
            let headersList = {
              "Content-Type": "application/json",
              "Authorization": `Basic ${process.env.NEXT_PUBLIC_WOCOMMERCE_AUTH_KEY}`
            }
            
            fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/customers/${localStorage.getItem('currentUserId')}`, { 
              method: "GET",
              headers: headersList
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              // console.log(data);
              dispatch(setUser(data))          
            })
  
          };
        }
  
      },[idLoaded]);

}