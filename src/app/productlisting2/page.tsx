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


        {/* Product 1*/}
          <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic1.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Dandy chair </p>
            <p className="text-sm">£250</p>
          </div>


            {/* Product 2*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic2.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">Rustic Vase Set </p>
            <p className="text-sm">£155</p>
          </div>


            {/* Product 3*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic3.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Silky Vase</p>
            <p className="text-sm">£125</p>
          </div>


            {/* Product 4*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic4.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Lucy Lamp</p>
            <p className="text-sm">£399</p>
          </div>


            {/* Product 5*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/productlisting201.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Dandy chair</p>
            <p className="text-sm">£250</p>
          </div>


            {/* Product 6*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/produclisting202.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl"> Rustic Vase Set</p>
            <p className="text-sm">£155</p>
          </div>


            {/* Product 7*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/productlisting203.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Silky Vase </p>
            <p className="text-sm">£125</p>
          </div>



            {/* Product 8*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/productlisting204.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Lucy Lamp</p>
            <p className="text-sm">£399</p>
          </div>



            {/* Product 9*/}
            <div  className="flex flex-col">
            <Image
              src={`/images/ceremic1.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Dandy chair </p>
            <p className="text-sm">£250</p>
          </div>



            {/* Product 10*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic2.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">Rustic Vase Set</p>
            <p className="text-sm">£155</p>
          </div>



            {/* Product 11*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic3.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Silky Vase</p>
            <p className="text-sm">£125</p>
          </div>


            {/* Product 12*/}
            <div  className="flex flex-col ">
            <Image
              src={`/images/ceremic4.svg`}
              alt={`Product1`}
              width={305}
              height={375}
              className="object-cover mb-4"
            />
            <p className="text-xl">The Lucy Lamp</p>
            <p className="text-sm">£399</p>
          </div>
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
