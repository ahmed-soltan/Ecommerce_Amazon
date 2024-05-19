import Container from "@/components/Container";
import CartDetails from "./_components/CartDetails";
import { getCurrentProfile } from "@/actions/getCurrentProfile";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProducts } from "@/actions/getProducts";

const CartPage = async() => {
  const user = await getCurrentUser()
  const profile = await getCurrentProfile()

  if(!profile || !user){
    return redirect('/login');
  }

  return (
    <div className="w-full my-10">
      <Container>
        <CartDetails orders={profile.Order} panned={user?.panned}/>
      </Container>
    </div>
  );
};

export default CartPage;
