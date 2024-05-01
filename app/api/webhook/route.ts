import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;


  try {
    const payloadString = JSON.stringify(body, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: process.env.STRIPE_WEBHOOK_SECRET!,
    });
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log(`WebHook Error: ${error.message}`);
    return new NextResponse(`WebHook Error: ${error.message}`, {
      status: 401,
    });
  }

    const session = event.data.object as Stripe.Checkout.Session;
    const profileId = session?.metadata?.profileId;
    const orderId = session?.metadata?.orderId;
    const amount = session?.metadata?.amount as string;
    const quantity = session?.metadata?.quantity as string;


    if (event.type === "checkout.session.completed") {
      if (!profileId ) {
        return new NextResponse("No profileId ", {
          status: 401,
        });
      }
      console.log("PROFILE_ID" , profileId);
      console.log(session)
      

      await prisma.order.update({
        where:{
          id:orderId,
        },
        data: {
          paymentStatus:session.status
        },
      });
    } else {
      return new NextResponse("Event Type is not checkout.session.completed", {
        status: 200,
      });
    }

    return new NextResponse(null, {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
