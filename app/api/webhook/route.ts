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

    const billingAddress = session.customer_details!.address
    const shippingAddress = session.shipping_details!.address


    if (event.type === "checkout.session.completed") {
      if (!profileId ) {
        return new NextResponse("No profileId ", {
          status: 401,
        });
      }
      
      await prisma.order.update({
        where:{
          id:orderId,
        },
        data: {
          paymentStatus:session.status,
          ShippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          BillingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
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
