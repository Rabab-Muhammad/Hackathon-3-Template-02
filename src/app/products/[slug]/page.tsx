import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Like from "@/components/Like";
import ProductDetailHeader from "@/components/ProductDetailHeader";
import TopBar from "@/components/TopBar";
import Brand from "@/components/Brand";
import ClubBenefits from "@/components/ClubBenefits";
import Footer2 from "@/components/Footer2";
import { Button } from "@/components/ui/button";

// Function to fetch the product based on the slug
async function fetchProduct(slug: string) {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await fetchProduct(params.slug);

  // If product is not found, show a 404 page
  if (!product) {
    notFound();
  }

  return (
    <div>
      <TopBar />
      <ProductDetailHeader />

      <div className="max-w-screen-xl mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Product Image (Left Side) */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2">
            <Image
              src={urlFor(product.image?.asset).width(600).height(400).url()}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Info Section (Right Side) */}
          <div className="md:w-1/2 md:pl-8 space-y-6">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>

            {/* Product Features */}
            <div className="mt-4">
              <h3 className="font-semibold">Features:</h3>
              <ul className="list-disc pl-6 text-sm text-gray-600">
                {product.features?.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Quantity & Availability */}
            <div className="mt-4">
              <p className="font-semibold">
                Quantity:{" "}
                {product.quantity > 0 ? product.quantity : "Out of Stock"}
              </p>
            </div>

            {/* Product Dimensions */}
            <div className="mt-3">
              <h3 className="font-semibold">Dimensions:</h3>
              <p className="text-sm">
                Height: {product.dimensions?.height} | Width:{" "}
                {product.dimensions?.width} | Depth: {product.dimensions?.depth}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium">${product.price}</p>

              <Button
                disabled={product.quantity === 0}
                className="mt-2 py-4 px-5 bg-[#2A254B] text-white disabled:opacity-50"
              >
                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Like />
      <Brand />
      <ClubBenefits />
      <Footer2 />
    </div>
  );
};

export default ProductPage;
