"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { HiOutlineX } from "react-icons/hi";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// Define interfaces for category and product types
interface Category {
  name: string;
  slug: { current: string };
}

interface Product {
  name: string;
  price: number;
  image: { asset: { _ref: string } };
  slug: { current: string };
}

const ProductDetailHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]); // Cart state to store items

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{name, slug}`;
      const categoriesData = await client.fetch(query);
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchProducts = async () => {
        const query = `*[_type == "product" && name match "${searchTerm}*"]{
          name,
          price,
          image,
          slug
        }`;
        const productsData = await client.fetch(query);
        setProducts(productsData);
      };
      fetchProducts();
    } else if (selectedCategory) {
      const fetchCategoryProducts = async () => {
        const query = `*[_type == "product" && references(*[_type == "category" && slug.current == "${selectedCategory}"]._id)]{
          name,
          price,
          image,
          slug
        }`;
        const categoryProductsData = await client.fetch(query);
        setProducts(categoryProductsData);
      };
      fetchCategoryProducts();
    } else {
      setProducts([]);
    }
  }, [searchTerm, selectedCategory]);

  // Handle adding product to the cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist to localStorage
      return updatedCart;
    });
  };

  // Cart icon component with item count
  const CartIcon = () => (
    <Link href="/cart">
      <div className="relative">
        <IoCartOutline className="text-xl ml-4" size={30} />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
    </Link>
  );

  return (
    <header className="w-full h-20 bg-white flex items-center px-6 md:px-10">
      <div className="flex justify-between items-center w-full">
        <div className="text-4xl text-[#22202E]">Avion</div>

        <nav className="hidden md:flex justify-center">
          <ul className="flex space-x-6 text-[#726E8D]">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/allproducts">All Products</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <IoIosSearch
            className="text-xl cursor-pointer"
            size={30}
            onClick={() => setIsSearchOpen((prev) => !prev)}
          />
          {/* Cart Icon with Item Count */}
          <CartIcon />
          <Link href="/profile">
            <MdOutlineAccountCircle className="text-xl ml-4" size={30} />
          </Link>
          <IoMdMenu
            className="text-xl ml-4 cursor-pointer md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full bg-white p-4 md:hidden">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/allproducts">All Products</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
          <HiOutlineX
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="absolute top-20 left-0 w-full p-4 bg-white shadow-md border rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Categories:</h4>
            <ul className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <li
                  key={category.slug.current}
                  className="cursor-pointer hover:underline text-[#726E8D]"
                  onClick={() => setSelectedCategory(category.slug.current)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <HiOutlineX
            className="absolute top-6 right-5 text-2xl cursor-pointer"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      )}

      {/* Products Search Results */}
      {products.length > 0 && (
        <div className="absolute top-36 left-0 w-full p-4 bg-white shadow-md border rounded-lg">
          <h4 className="text-lg font-semibold">Search Results</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {products.map((product) => (
              <div
                key={product.slug.current}
                className="border p-4 rounded-lg shadow-md"
              >
                <Link href={`/products/${product.slug.current}`} passHref>
                  <Image
                    src={urlFor(product.image?.asset).url()}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h5 className="text-md font-semibold mt-2">{product.name}</h5>
                  <p className="text-sm text-gray-500 mt-1">${product.price}</p>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-2 py-2 bg-[#2A254B] text-white rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <HiOutlineX
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={() => setProducts([])}
          />
        </div>
      )}
    </header>
  );
};

export default ProductDetailHeader;
