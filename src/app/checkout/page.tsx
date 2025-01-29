// "use client";

// import React, { useState, useEffect } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import Swal from "sweetalert2"; // SweetAlert for notifications
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";

// const CheckoutPage = () => {
//   const [cart, setCart] = useState<any[]>([]);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch cart data from localStorage
//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => {
//       if (item.price && item.quantity) {
//         return total + item.price * item.quantity;
//       }
//       return total;
//     }, 0);
//   };

//   const handleQuantityChange = (slug: string, newQuantity: number) => {
//     // Ensure quantity is at least 1
//     newQuantity = Math.max(newQuantity, 1);

//     // Update the cart with the new quantity
//     const updatedCart = cart.map((item) =>
//       item.slug.current === slug ? { ...item, quantity: newQuantity } : item
//     );

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleRemoveItem = (slug: string) => {
//     // Remove the item from the cart based on the slug
//     const updatedCart = cart.filter((item) => item.slug.current !== slug);

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleCheckout = async () => {
//     if (!name || !email || !address) {
//       Swal.fire({
//         title: "Missing Information",
//         text: "Please fill in all required fields",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     setLoading(true);

//     // Simulate checkout process (you can integrate payment gateway here)
//     setTimeout(() => {
//       Swal.fire({
//         title: "Success",
//         text: "Your order has been placed successfully!",
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       // Clear cart after checkout
//       localStorage.removeItem("cart");
//       setCart([]);
//     }, 2000);
//   };

//   return (
//     <div className="bg-gray-50">
//       <Header />

//       <div className="w-full max-w-screen-xl mx-auto p-8 text-[#2A254B]">
//         <h2 className="text-3xl font-bold mb-6">Checkout</h2>

//         {/* Cart Summary */}
//         <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold mb-4">Cart Summary</h3>
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <div className="space-y-4">
//               {cart.map((product) => (
//                 <div
//                   key={product.slug.current}
//                   className="flex justify-between items-center border-b pb-4"
//                 >
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={
//                         product.image?.asset
//                           ? urlFor(product.image.asset).width(200).url()
//                           : product.imageUrl
//                       }
//                       alt={product.name}
//                       width={50}
//                       height={50}
//                       className="rounded-md"
//                     />
//                     <span className="text-lg">
//                       {product.name} (x{product.quantity})
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <input
//                       type="number"
//                       value={product.quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(
//                           product.slug.current,
//                           parseInt(e.target.value) || 1
//                         )
//                       }
//                       min="1"
//                       className="w-16 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                     />
//                     <span className="text-lg font-semibold">
//                       ${product.price * product.quantity}
//                     </span>
//                   </div>

//                   {/* Remove Button */}
//                   <Button
//                     onClick={() => handleRemoveItem(product.slug.current)}
//                     className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//               <div className="flex justify-between items-center pt-4 font-semibold text-lg">
//                 <span>Total</span>
//                 <span>${getTotalPrice()}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Shipping Information Form */}
//         <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
//           <div className="mt-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="name">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="email">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="address">
//               Shipping Address
//             </label>
//             <textarea
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your address"
//             />
//           </div>
//         </div>

//         {/* Proceed to Checkout Button */}
//         {cart.length > 0 && (
//           <Button
//             onClick={handleCheckout}
//             className={`w-full mt-6 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Place Order"}
//           </Button>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CheckoutPage;


"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2"; // SweetAlert for notifications
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Define a type for the cart product
type Product = {
  slug: {
    current: string;
  };
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  image?: {
    asset: {
      url: string;
    };
  };
};

const CheckoutPage = () => {
  const [cart, setCart] = useState<Product[]>([]); // Use the Product type here
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch cart data from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.price && item.quantity) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleQuantityChange = (slug: string, newQuantity: number) => {
    // Ensure quantity is at least 1
    newQuantity = Math.max(newQuantity, 1);

    // Update the cart with the new quantity
    const updatedCart = cart.map((item) =>
      item.slug.current === slug ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (slug: string) => {
    // Remove the item from the cart based on the slug
    const updatedCart = cart.filter((item) => item.slug.current !== slug);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if (!name || !email || !address) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    // Simulate checkout process (you can integrate payment gateway here)
    setTimeout(() => {
      Swal.fire({
        title: "Success",
        text: "Your order has been placed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear cart after checkout
      localStorage.removeItem("cart");
      setCart([]);
    }, 2000);
  };

  return (
    <div className="bg-gray-50">
      <Header />

      <div className="w-full max-w-screen-xl mx-auto p-8 text-[#2A254B]">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        {/* Cart Summary */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Cart Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product.slug.current}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        product.image?.asset
                          ? urlFor(product.image.asset).width(200).url()
                          : product.imageUrl
                      }
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <span className="text-lg">
                      {product.name} (x{product.quantity})
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.slug.current,
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                      className="w-16 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-lg font-semibold">
                      ${product.price * product.quantity}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <Button
                    onClick={() => handleRemoveItem(product.slug.current)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-semibold text-lg">
                <span>Total</span>
                <span>${getTotalPrice()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Information Form */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
          <div className="mt-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mt-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-4">
            <label className="block text-lg font-medium mb-2" htmlFor="address">
              Shipping Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Proceed to Checkout Button */}
        {cart.length > 0 && (
          <Button
            onClick={handleCheckout}
            className={`w-full mt-6 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </Button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
