// export default {
//   name: "order",
//   title: "Order",
//   type: "document",
//   fields: [
//     { name: "fullName", title: "Full Name", type: "string" },
//     { name: "phone", title: "Phone", type: "string" },
//     { name: "email", title: "Email", type: "string" },
//     { name: "address", title: "Address", type: "string" },
//     { name: "city", title: "City", type: "string" },
//     { name: "zipCode", title: "Zip Code", type: "string" },
//     {
//       name: "products",
//       title: "Products",
//       type: "array",
//       of: [
//         {
//           type: "object",
//           fields: [
//             { name: "name", title: "Product Name", type: "string" },
//             { name: "price", title: "Price", type: "number" },
//             { name: "quantity", title: "Quantity", type: "number" },
//           ],
//         },
//       ],
//     },
//     { name: "totalAmount", title: "Total Amount", type: "number" },
//     { name: "shippingFee", title: "Shipping Fee", type: "number" },
//     { name: "grandTotal", title: "Grand Total", type: "number" },
//     {
//       name: "status",
//       title: "Status",
//       type: "string",
//       initialValue: "Pending", // Default status
//       options: {
//         list: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
//       },
//     },
//   ],
// };


const orderSchema = {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      { name: "fullName", title: "Full Name", type: "string" },
      { name: "phone", title: "Phone", type: "string" },
      { name: "email", title: "Email", type: "string" },
      { name: "address", title: "Address", type: "string" },
      { name: "city", title: "City", type: "string" },
      { name: "zipCode", title: "Zip Code", type: "string" },
      {
        name: "products",
        title: "Products",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "name", title: "Product Name", type: "string" },
              { name: "price", title: "Price", type: "number" },
              { name: "quantity", title: "Quantity", type: "number" },
            ],
          },
        ],
      },
      { name: "totalAmount", title: "Total Amount", type: "number" },
      { name: "shippingFee", title: "Shipping Fee", type: "number" },
      { name: "grandTotal", title: "Grand Total", type: "number" },
      {
        name: "status",
        title: "Status",
        type: "string",
        initialValue: "Pending", // Default status
        options: {
          list: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        },
      },
    ],
  };
  
  export default orderSchema;
  