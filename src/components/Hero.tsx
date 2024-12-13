import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full flex flex-col md:flex-row px-4 md:px-10 md:mx-16 pl-4 md:pl-0 text-[#2A254B]">
    
      <div className="w-full md:w-[760px] h-auto md:h-[584px] bg-[#2A254B] my-0 md:my-10">
        <div className="p-4 md:p-14 text-white">
          <p className="text-[24px] md:text-[32px] md:pr-48">
            The furniture brand for the future, with timeless designs
          </p>
          <button className="bg-[#F9F9F926] py-[12px] px-[24px] md:py-[16px] md:px-[32px] text-sm md:text-base my-4 md:my-10">
            View collection
          </button>
          <p className="text-base md:text-lg mt-10 md:mt-36 md:pr-5">
            A new era in eco-friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors, and a beautiful way
            to display things digitally using modern web technologies.
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-start mt-10">
        <Image
          src={"/images/hero-right.svg"}
          alt="hero"
          height={584}
          width={520}
        />
      </div>
    </div>
  );
};

export default Hero;

// import React from "react";
// import Image from "next/image";

// const Hero = () => {
//   return (
//     <div className="w-full flex flex-col md:flex-row px-4 md:px-10 md:mx-16 pl-4 md:pl-0 text-[#2A254B]">
//       {/* Left Content Section */}
//       <div className="w-full md:w-[760px] h-auto bg-[#2A254B] my-6 md:my-10">
//         <div className="p-4 md:p-14 text-white">
//           {/* Heading */}
//           <p className="text-[20px] md:text-[32px] leading-[28px] md:leading-[40px] md:pr-48">
//             The furniture brand for the future, with timeless designs
//           </p>
//           {/* Button */}
//           <button className="bg-[#F9F9F926] py-3 px-6 text-sm md:text-base my-4 md:my-10">
//             View collection
//           </button>
//           {/* Description */}
//           <p className="text-sm md:text-lg mt-6 md:mt-36 md:pr-5 leading-[22px] md:leading-[28px]">
//             A new era in eco-friendly furniture with Avelon, the French luxury
//             retail brand with nice fonts, tasteful colors, and a beautiful way
//             to display things digitally using modern web technologies.
//           </p>
//         </div>
//       </div>

//       {/* Right Image Section */}
//       <div className="flex justify-center md:items-start md:mt-10">
//         <Image
//           src={"/images/hero-right.svg"}
//           alt="hero"
//           height={400} // Reduced size for better scaling on mobile
//           width={360} // Reduced size for better scaling on mobile
//           className="w-full md:w-auto h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// export default Hero;

