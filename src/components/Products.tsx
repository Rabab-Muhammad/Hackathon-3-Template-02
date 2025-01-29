

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Swal from "sweetalert2"; // Import SweetAlert2

// Product type definition
type Product = {
  slug: {
    current: string;
  };
  name: string;
  price: number;
  imageUrl: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(4); // Controls how many products are visible
  const productsPerPage = 4; // Number of products to load each time
  const [cart, setCart] = useState<Product[]>([]); // Cart state

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && category->name in ["Tableware","Tables","Cutlery"]]{
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

  // Fetch cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Function to add product to cart with SweetAlert2
  const handleAddToCart = (product: Product) => {
    // Check if product is already in the cart
    const productExists = cart.some((item) => item.slug.current === product.slug.current);
    
    if (productExists) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${product.name} is already in your cart.`,
      });
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persisting cart to localStorage

      // Show SweetAlert success popup
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${product.name} has been added to your cart.`,
        confirmButtonText: "OK",
      });
    }
  };

  // Handle "View Collection" and "Show Less" button
  const handleViewToggle = () => {
    if (visibleCount >= products.length) {
      setVisibleCount(productsPerPage); // Reset to initial count
    } else {
      setVisibleCount((prevCount) => prevCount + productsPerPage); // Load more products
    }
  };

  return (
    <div id="tables" className="w-full  md:px-20 p-10 text-[#2A254B]">
      {/* Cart Icon/Count Display */}
      <div className="fixed top-1 right-28 p-2 bg-[#2A254B] text-white rounded-full">
        <Link href="/cart">
          <span className="text-lg">cart ({cart.length})</span>
        </Link>
      </div>
      <div className="text-2xl font-semibold sm:text-[32px] my-5 text-[#2A254B]">
        Our popular products
      </div>
      <div className="text-[#2A254B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleCount).map((item) => (
          <div
            key={item.slug.current}
            className="bg-white p-4 rounded-md shadow-lg hover:shadow-2xl transition-all"
          >
            <Link href={`/products/${item.slug.current}`}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={375}
                width={305}
                className="object-cover h-72 rounded-md mb-2"
              />
              <p className="text-xl">{item.name}</p>
            </Link>
            <div className="flex justify-between items-center ">
              <p className="text-base">£{item.price}</p>
              {/* Add to Cart Button */}
              <Button
                className="mt-4 bg-[#2A254B] text-white rounded-md py-2 hover:bg-[#4C3F6B]"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Button to load more products or show less */}
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

export default Products;
