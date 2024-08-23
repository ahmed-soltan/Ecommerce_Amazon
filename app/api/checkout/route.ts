import { NextResponse } from "next/server";
import prisma from '../../../lib/prismadb';
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
            console.error("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const profile = await getCurrentProfile();
        if (!profile) {
            console.error("Profile not found");
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }
        
        const { products, amount } = body;
        
        // Validate the products array and amount
        if (!Array.isArray(products) || products.length === 0) {
            console.error("Invalid products array");
            return NextResponse.json({ error: "Invalid products" }, { status: 400 });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            console.error("Invalid amount");
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
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
                        unit_amount: Math.round(item.priceAfterDiscount * 100),
                        product_data: {
                            name: item.name,
                        },
                    },
                    quantity: item.quantity,
                };
            }),
            shipping_address_collection: { allowed_countries: ['DE', 'US' , 'EG'] },
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            metadata: {
                profileId: profile.id,
                orderId: order.id
            }
        });

        
        return NextResponse.json({ url: session.url });
    } catch (error) {
        // Log the error details
        console.error("Internal server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
