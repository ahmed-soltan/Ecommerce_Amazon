import { NextResponse } from "next/server";
import prisma from '../../../lib/prismadb'
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
            shipping_address_collection: { allowed_countries: ['DE', 'US' , "EG"] },
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            metadata: {
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
