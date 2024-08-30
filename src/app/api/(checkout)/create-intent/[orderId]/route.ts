// import { prisma } from "@/utils/connect"
// import { NextResponse } from "next/server"

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// export const POST = async ({ params }: { params: { orderId: string } }) => {
//     const { orderId } = params

//     const order = await prisma.order.findUnique({
//         where: {
//             id: orderId,
//         }
//     })
//     if (order) {

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: 100 * 100,
//             currency: "usd",
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });
//         await prisma.order.update({
//             where:{
//                 id: orderId,
//             },
//             data: {intent_id:paymentIntent.id}
//         })

//         return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 })
//     }
//     else {
//         return new NextResponse(JSON.stringify({ message: "Order not found!" }), { status: 404 })
//     }
// }


// import { prisma } from "@/utils/connect";
// import { NextResponse } from "next/server";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export const POST = async (req: Request, { params }: { params: { orderId: string } }) => {
//     const { orderId } = params;

//     try {
//         const order = await prisma.order.findUnique({
//             where: {
//                 id: orderId,
//             },
//         });

//         if (!order) {
//             return new NextResponse(JSON.stringify({ message: "Order not found!" }), { status: 404 });
//         }
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: order.price,
//             currency: "usd",
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });

//         await prisma.order.update({
//             where: {
//                 id: orderId,
//             },
//             data: { intent_id: paymentIntent.id },
//         });

//         return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
//     } catch (error) {
//         console.error("Error creating payment intent:", error);
//         return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
//     }
// };

import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(
    JSON.stringify({ message:"Order not found!" }),
    { status: 404 }
  );
}