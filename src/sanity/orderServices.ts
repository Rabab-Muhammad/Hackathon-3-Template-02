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
//       status: orderData.status || "Pending", // Default value if not provided
//     });

//     return response;
//   } catch (error) {
//     console.error("Error creating order:", error);
//     throw error;
//   }
// };



import { client } from "@/sanity/lib/client";


interface Product {
    name: string;
    price: number;
    quantity: number;
  }
  
  interface Order {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    products: Product[];
    totalAmount: number;
    shippingFee: number;
    grandTotal: number;
    status?: string;
  }
  

export const createOrder = async (orderData: Order) => {
  try {
    const response = await client.create({
      _type: "order",
      fullName: orderData.name,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      zipCode: orderData.zipCode,
      products: orderData.products.map((product: Product) => ({
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
