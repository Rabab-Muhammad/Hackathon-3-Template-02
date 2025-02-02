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

interface CeremicsProps {
  cart: Product[]; // Cart items
  setCart: React.Dispatch<React.SetStateAction<Product[]>>; // Setter for cart state
}

// Cart Icon Component
const CartIcon = ({ cartItemCount }: { cartItemCount: number }) => (
  <Link href="/cart">
    <div className="absolute">
      {cartItemCount > 0 && (
        <span className="absolute top-2 right-[75px] bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </div>
  </Link>
);

const Ceremics: React.FC<CeremicsProps> = ({ cart = [], setCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(4); // Controls how many products are visible
  const productsPerPage = 4; // Number of products to load each time

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && category->name in ["Ceramics","Plant Pots"]]{
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
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist cart to localStorage
      return updatedCart;
    });
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      confirmButtonText: "OK",
    });
  };

  // Handle View Toggle
  const handleViewToggle = () => {
    if (visibleCount >= products.length) {
      setVisibleCount(productsPerPage);
    } else {
      setVisibleCount((prevCount) => prevCount + productsPerPage);
    }
  };

  return (
    <div id="ceramics" className="w-full md:px-20 p-10 text-[#2A254B]">
      {/* Cart Icon with Item Count */}
      <div className="absolute top-4 right-4">
        <CartIcon cartItemCount={cart.length} />
      </div>

      <div className="text-2xl font-semibold sm:text-[32px] my-5 text-[#2A254B]">
        New Ceremic
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

export default Ceremics;
