"use client";

import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // Sanity client import
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image"; // Import next/image

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart] = useState([]); // Cart items, assuming it's an array of items
  const cartCount = cart.length; // Dynamic cart count

  // Fetch categories from Sanity CMS
  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{name, slug}`;
      const categoriesData = await client.fetch(query);
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // Fetch products based on search term or category selection
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
      setProducts([]); // Clear products if no search or category selected
    }
  }, [searchTerm, selectedCategory]);

  // Handle category click
  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSearchTerm(""); // Clear search when a category is clicked
  };

  return (
    <div className="p-5 text-[#2A254B]">
      {/* Header Section */}
      <div className="flex justify-between items-center lg:justify-center lg:relative">
        <IoIosSearch
          className="hidden lg:block lg:absolute lg:left-5 text-xl cursor-pointer"
          size={30}
          onClick={() => setIsSearchOpen((prev) => !prev)}
        />

        <div className="text-4xl text-[#22202E]">Avion</div>

        <div className="flex items-center lg:hidden">
          <IoIosSearch
            className="text-xl mr-4 text-[#726E8D] cursor-pointer"
            size={30}
            onClick={() => setIsSearchOpen((prev) => !prev)}
          />
          <HiOutlineMenu
            className="text-xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>

        <div className="hidden lg:flex gap-4 absolute right-5 text-[#726E8D]">
          <Link href="/cart">
            <div className="relative">
              <IoCartOutline className="text-xl" size={30} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Add Auth Links for Sign Up/Login */}
          <Link href="/auth/signup">
            <MdOutlineAccountCircle
              className="text-xl cursor-pointer"
              size={30}
            />
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-white relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Categories:</h4>
            <ul className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <li
                  key={category.slug.current}
                  className="cursor-pointer hover:underline text-[#726E8D]"
                  onClick={() => handleCategoryClick(category.slug.current)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <HiOutlineX
            className="absolute top-6 right-6 text-2xl cursor-pointer"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      )}

      {/* Show Products for the selected category or search */}
      {products.length > 0 && (
        <div className="mt-8 relative">
          <h4 className="text-lg font-semibold">
            {searchTerm
              ? `Search results for "${searchTerm}"`
              : `Products in "${selectedCategory}"`}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {products.map((product) => (
              <div
                key={product.slug.current}
                className="border p-4 rounded-lg shadow-md"
              >
                <Link href={`/products/${product.slug.current}`} passHref>
                  <Image
                    src={urlFor(product.image?.asset).url()}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                    width={500}
                    height={500}
                  />
                  <h5 className="text-md font-semibold mt-2">{product.name}</h5>
                  <p className="text-sm text-gray-500 mt-1">${product.price}</p>
                </Link>
              </div>
            ))}
          </div>

          <HiOutlineX
            className="absolute top-0 right-0 p-2 text-4xl cursor-pointer"
            onClick={() => setProducts([])} // Clear products
          />
        </div>
      )}

      <div className="w-full border-b-[1px] mt-5 mb-0 sm:my-5"></div>

      {/* Nav Bar */}
      <div className="hidden lg:flex justify-center">
        <ul className="flex gap-8 text-base text-[#726E8D]">
          <li className="hover:underline">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:underline">
            <Link href="/allproducts">All Product</Link>
          </li>
          <li className="hover:underline">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:underline">
            <Link href="/#ceramics">Ceramics</Link>
          </li>
          <li className="hover:underline">
            <Link href="/#tables">Tables</Link>
          </li>
          <li className="hover:underline">
            <Link href="/#tables">Chairs</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center p-5">
            <div className="text-xl font-bold">Avion</div>
            <HiOutlineX
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <div className="flex flex-col items-center mt-10 space-y-5 text-lg text-[#726E8D]">
            <div className="text-2xl">
              <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                <IoCartOutline />
              </Link>
            </div>
            <div className="text-2xl">
              <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                <MdOutlineAccountCircle />
              </Link>
            </div>
            <ul className="text-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/allproducts">All Products</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/#ceramics">Ceramics</Link>
              </li>
              <li>
                <Link href="/#tables">Tables</Link>
              </li>
              <li>
                <Link href="/#tables">Chairs</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
