import { addToCart, fetchCart } from "../features/cart/cartSlice";

      const calculatePriceAftreDiscount = (price, discount) => {
    if(!price || !discount) return 0; 
        return (price - (price * discount) / 100);
      };

//  ------------------------------------------------------------------------------------------------------
       const handleAddToCartWithAndWithoutLogin = async ({isLoggedIn,id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,setLocalCart,dispatch,toast}) => {
        console.log("isLoggedIn",isLoggedIn,id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail);
      
        if (!isLoggedIn) {
          // store in local storage
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push({
            productId: id,
            id,
            product: {
              id,
              title,
              description,
              price,
              discountPercentage,
              rating,
              stock,
              brand,
              category,
              thumbnail,
            },
            quantity: 1,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          setLocalCart(cart);
          toast.success("Item added to cart");
        } else {
          let productId = id;
          try {
            const result = await dispatch(
              addToCart({ userId: isLoggedIn.uid, productId, quantity: 1 })
            ).unwrap();
            console.log("result", result);
            if (result) {
                console.log("result item added cart");
              toast.success("Item added to cart");

              await dispatch(fetchCart(isLoggedIn.uid)).unwrap();
            }
          } catch (error) {
            console.error("Error adding item to cart:", error);
          }
        }       

       }




      export { calculatePriceAftreDiscount,handleAddToCartWithAndWithoutLogin };