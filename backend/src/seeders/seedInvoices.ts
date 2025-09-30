import { Invoice } from "../models/Invoice.js";
import { nanoid } from 'nanoid';

export const seedInvoices = async ( userId: string ) => {
  try {
    await Invoice.deleteMany({ userId });

    const invoices = [
      {
        id: nanoid(),
        number: "1023494-2304",
        status: "partial",
        issueDate: "March 30th, 2023",
        dueDate: "May 19th, 2023",
        currency: "$",
        sender: {
          name: "Fabulous Enterprise",
          email: "info@fabulousenterise.co",
          phone: "+386 989 271 3115",
          address: "133 Hart Ridge Road, 45436 Gaines, MI",
        },
        customer: {
          name: "Olaniyi Ojo Adewale",
          email: "info@customeremail.com",
          phone: "+386 989 271 3115",
        },
        items: [
          {
            id: nanoid(),
            title: "Email Marketing",
            description:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
            quantity: 10,
            rate: 1500,
            amount: 15000,
          },
          {
            id: nanoid(),
            title: "Video looping effect",
            description: "",
            quantity: 6,
            rate: 110500,
            amount: 6663000,
          },
          {
            id: nanoid(),
            title: "Graphic design for emails",
            description: "Tsit voluptatem accusantium",
            quantity: 7,
            rate: 2750,
            amount: 19250,
          },
          {
            id: nanoid(),
            title: "Video looping effect",
            description: "",
            quantity: 6,
            rate: 110500,
            amount: 6663000,
          },
        ],
        subtotal: 6697200,
        discount: 167430,
        total: 6529770,
        note: "Thank you for your patronage",
        userId,
      },
    ];

    await Invoice.insertMany(invoices);
  } catch (error) {
    console.error("❌ Error seeding invoices", error);
  }
}
