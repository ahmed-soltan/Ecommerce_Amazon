import { getCurrentProfile } from "@/actions/getCurrentProfile";
import Container from "@/components/Container";
import OrderDetails from "./_components/OrderDetails";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";

const OrderPage = async () => {
  const user = await getCurrentUser();
  if(!user){
    return redirect('/login')
  }
  const profile = await getCurrentProfile(user.id);
  if(!profile){
    return redirect('/login')
  }
  return (
    <div className="py-6">
      <Container>
        <OrderDetails order={profile?.Order} profileId={profile.id}/>
      </Container>
    </div>
  );
};

export default OrderPage;
