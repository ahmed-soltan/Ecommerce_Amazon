import Container from "@/components/Container";
import CartDetails from "./_components/CartDetails";
import { getCurrentProfile } from "@/actions/getCurrentProfile";
import { getCurrentUser } from "@/actions/getCurrentUser";

const CartPage = async() => {
  const user = await getCurrentUser()

  return (
    <div className="w-full my-10">
      <Container>
        <CartDetails panned={user?.panned}/>
      </Container>
    </div>
  );
};

export default CartPage;
