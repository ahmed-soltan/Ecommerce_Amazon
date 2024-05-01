import { NextResponse } from "next/server";
import prisma from '../../../lib/prismadb'
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getCurrentProfile } from "@/actions/getCurrentProfile";
import { cartProductType } from "@/app/(root)/product/[productId]/_components/ProductContainerDetails";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const profile = await getCurrentProfile();
        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }
        
        const { products, amount } = body;

        let stripeCustomer = await prisma.stripeCustomer.findUnique({
            where: {
                userId: user.id
            },
            select: {
                stripeCustomerId: true
            }
        });
        
        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.email!
            });

            stripeCustomer = await prisma.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id
                }
            });
        }

        const order = await prisma.order.create({
            data: {
                amount: amount,
                products: products,
                deliveryStatus: false,
                profileId: profile.id,
                paymentStatus: "open"
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: products.map((item: cartProductType) => {
                return {
                    price_data: {
                        currency: "usd",
                        unit_amount: item.priceAfterDiscount * 100,
                        product_data: {
                            name: item.name,
                        },
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.NEXTAUTH_URL}/`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            metadata: {
                // Include any metadata you need here
                profileId: profile.id,
                orderId: order.id
            }
        });

        console.log("SESSION : ", session);
        console.log("ORDER : ", order);
        
        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
