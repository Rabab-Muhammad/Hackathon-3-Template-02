"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Swal from "sweetalert2";

// Product type definition
type Product = {
  slug: {
    current: string;
  };
  name: string;
  price: number;
  imageUrl: string;
};

const Likes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(4); // Controls how many products are visible
  const productsPerPage = 4; // Number of products to load each time
  const [cartCount, setCartCount] = useState(0); // State to hold cart count

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        setCartCount(cart.length); // Set the number of items in the cart
      }
    }
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && category->name in ["Crockey","Chairs"]]{
        slug,
        name,
        price,
        "imageUrl": image.asset->url
      }`;
      try {
        const result: Product[] = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product: Product) => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    // Add the product to the cart
    cart.push(product);

    // Update cart in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount(cart.length); // Update the cart count
    }

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      confirmButtonText: "OK",
    });
  };

  // Handle View Toggle
  const handleViewToggle = () => {
    setVisibleCount((prevCount) =>
      prevCount >= products.length
        ? productsPerPage
        : prevCount + productsPerPage
    );
  };

  return (
    <div id="ceramics" className="w-full md:px-20 p-10 text-[#2A254B] ">
      {/* Cart Icon with Item Count */}
      <Link href="/cart" className="absolute ">
        <div className="absolute top-2 ">
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount > 0 && cartCount}
          </span>
        </div>
      </Link>

      <div className="text-2xl font-semibold sm:text-[32px] my-5 text-[#2A254B]">
        You might also like
      </div>

      <div className="text-[#2A254B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleCount).map((prod) => (
          <div
            key={prod.slug.current}
            className="bg-white p-4 rounded-md shadow-lg hover:shadow-2xl transition-all"
          >
            <Link href={`/products/${prod.slug.current}`}>
              <Image
                src={prod.imageUrl}
                alt={prod.name}
                height={375}
                width={305}
                className="object-cover h-72 rounded-md mb-2"
              />
              <p className="text-xl">{prod.name}</p>
            </Link>
            <div className="flex justify-between items-center">
              <p className="text-base">£{prod.price}</p>
              <Button
                className="mt-4 bg-[#2A254B] text-white rounded-md py-2 hover:bg-[#4C3F6B]"
                onClick={() => handleAddToCart(prod)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-16">
        {products.length > productsPerPage && (
          <Button
            variant={"mybutton"}
            className="w-[170px] h-[56px]"
            onClick={handleViewToggle}
          >
            {visibleCount >= products.length ? "View Less" : "View Collection"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Likes;
