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
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
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

  const handleCheckout = async () => {
    if (!name || !phone || !address || !city || !zipcode) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true); // Start loading

    // Display processing message
    Swal.fire({
      title: "Processing...",
      text: "Your order is being placed. Please wait.",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Show loading spinner
      },
    });

    // Simulate processing time (you can replace this with actual API calls if needed)
    setTimeout(() => {
      // After processing, show success message with shipping details
      Swal.fire({
        title: "Order Placed Successfully!",
        text: `Your order is confirmed. \nShipping to: ${address}, ${city} - ${zipcode}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the cart after order placement
      localStorage.removeItem("cart");
      setCart([]);
      setLoading(false); // Stop loading
    }, 2000); // You can change the timeout to reflect actual processing time
  };

  const getShippingFee = () => {
    return 200; // Static shipping fee
  };

  const getGrandTotal = () => {
    return getTotalPrice() + getShippingFee(); // Calculate the total including shipping fee
  };

  const applyPromoCode = () => {
    // You can implement your promo code logic here
    if (promoCode === "DISCOUNT10") {
      return getTotalPrice() * 0.9; // 10% discount
    }
    return getTotalPrice();
  };

  return (
    <div className="bg-gray-50">
      <Header />

      <div className="w-full max-w-screen-xl mx-auto p-8 text-[#2A254B]">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary (Left side) */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
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
                      <div className="text-lg">
                        <div>{product.name}</div> {/* Product Name */}
                        <div className="text-sm text-gray-500">{`Quantity: ${product.quantity}`}</div>{" "}
                        {/* Quantity below name */}
                      </div>
                    </div>

                    <span className="text-lg font-semibold">
                      ${product.price * product.quantity}
                    </span>
                  </div>
                ))}

                {/* Promotion Code */}
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Promo Code</span>
                  <div className="flex items-center gap-2">
                    {" "}
                    {/* Add gap between input and button */}
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-48 p-2 border rounded-md "
                      placeholder="Enter code"
                    />
                    <Button
                      onClick={() => applyPromoCode()} // Add the apply function to handle button click
                      className="h-11 px-4 rounded-md  bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex justify-between items-center pt-4 font-semibold text-lg">
                  <span>SubTotal</span>
                  <span>${getTotalPrice()}</span>
                </div>

                {/* Shipping Fee */}
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Shipping Fee</span>
                  <span>${getShippingFee()}</span>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center pt-4 font-semibold text-lg border-t">
                  <span>Total</span>
                  <span>${getGrandTotal()}</span> {/* Use getGrandTotal() */}
                </div>
              </div>
            )}
          </div>

          {/* Customer Info (Right side) */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Billing Information</h3>

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
              <label className="block text-lg font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-lg font-medium mb-2"
                htmlFor="address"
              >
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

            <div className="mt-4">
              <label className="block text-lg font-medium mb-2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your city"
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-lg font-medium mb-2"
                htmlFor="zipcode"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your zip code"
              />
            </div>

            {/* Place Order Button */}
            {cart.length > 0 && (
              <Button
                onClick={handleCheckout}
                className={`w-full mt-6 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
                disabled={loading}
              >
                {loading ? "Processing..." : "place order"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
