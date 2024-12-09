import React from "react";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";

const Page = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto text-[#2A254B]">
      {/* Header Image */}
      <div>
        <Image
          src="/images/productlisting200.svg"
          alt="Product Listing Banner"
          height={209}
          width={1440}
          className="object-cover w-full"
        />
      </div>

      {/* Filter Section */}
      <div className="w-full h-[64px] py-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Left side - 4 Items */}
          <div className="flex gap-4 sm:gap-8 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <p className="font-medium">Category</p>
              <MdArrowDropDown className="text-xl" />
            </div>

            <div className="flex items-center gap-2">
              <p className="font-medium">Product Type</p>
              <MdArrowDropDown className="text-xl" />
            </div>

            <div className="flex items-center gap-2">
              <p className="font-medium">Price</p>
              <MdArrowDropDown className="text-xl" />
            </div>

            <div className="flex items-center gap-2">
              <p className="font-medium">Brand</p>
              <MdArrowDropDown className="text-xl" />
            </div>
          </div>

          {/* Right side - 2 Items */}
          <div className="flex gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <p className="font-medium">Sorting by:</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-medium">Date Added</p>
              <MdArrowDropDown className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {/* Product Items */}
        {[...Array(12)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={`/images/ceremic${(index % 4) + 1}.svg`}
              alt={`Product ${index + 1}`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">Product {index + 1}</p>
            <p className="text-sm">£{(index + 1) * 100}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mb-10">
        <button className="py-3 px-8 bg-[#F9F9F9] text-base sm:text-lg">
          View collection
        </button>
      </div>
    </div>
  );
};

export default Page;
