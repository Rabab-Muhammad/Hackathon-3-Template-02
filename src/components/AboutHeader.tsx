"use client";

import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Product {
  name: string;
  price: number;
  image: { asset: { _ref: string } };
  slug: { current: string };
}

interface Category {
  name: string;
  slug: { current: string };
}

const AboutHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{
        name,
        slug
      }`;
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
    } else {
      setProducts([]);
    }
  }, [searchTerm, selectedCategory]);

  // Handle category click
  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSearchTerm(""); // Clear search when a category is clicked
  };

  return (
    <div className="p-5 text-[#2A254B] relative">
      {/* Top Header */}
      <div className="flex justify-between items-center lg:justify-between lg:relative">
        {/* Left Section - Logo */}
        <div className="text-4xl text-[#22202E] ml-4">Avion</div>

        <div className="hidden lg:flex gap-4 items-center text-base text-[#726E8D] absolute right-5">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>

          <IoIosSearch
            className="text-xl cursor-pointer"
            size={30}
            onClick={() => setIsSearchOpen(true)}
          />

          <Link href="/cart">
            <div className="relative">
              <IoCartOutline className="text-xl" size={30} />
            </div>
          </Link>
          <MdOutlineAccountCircle size={30} />
        </div>

        <div className="flex items-center lg:hidden">
          <HiOutlineMenu
            className="text-xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-10 p-5">
          <div className="flex justify-between items-center">
            <HiOutlineX
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <div className="mt-5">
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              {/* Add more links here */}
            </ul>
          </div>
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
            className="absolute top-6 right-5 text-2xl cursor-pointer"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      )}

      {/* Search Results */}
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
              </div>
            ))}
          </div>
          <HiOutlineX
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={() => setProducts([])}
          />
        </div>
      )}
    </div>
  );
};

export default AboutHeader;
