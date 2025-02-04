// import { client } from "@/sanity/lib/client";

// export const createOrder = async (orderData: any) => {
//   try {
//     const response = await client.create({
//       _type: "order",
//       fullName: orderData.name,
//       phone: orderData.phone,
//       email: orderData.email,
//       address: orderData.address,
//       city: orderData.city,
//       zipCode: orderData.zipcode,
//       products: orderData.products.map((product: any) => ({
//         name: product.name,
//         price: product.price,
//         quantity: product.quantity,
//       })),
//       totalAmount: orderData.totalAmount,
//       shippingFee: orderData.shippingFee,
//       grandTotal: orderData.grandTotal,
//     });

//     return response;
//   } catch (error) {
//     console.error("Error creating order:", error);
//     throw error;
//   }
// };

import { client } from "@/sanity/lib/client";

export const createOrder = async (orderData: any) => {
  try {
    const response = await client.create({
      _type: "order",
      fullName: orderData.name,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      zipCode: orderData.zipcode,
      products: orderData.products.map((product: any) => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
      totalAmount: orderData.totalAmount,
      shippingFee: orderData.shippingFee,
      grandTotal: orderData.grandTotal,
      status: orderData.status || "Pending", // Default value if not provided
    });

    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
