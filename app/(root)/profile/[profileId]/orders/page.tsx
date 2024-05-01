import { getCurrentProfile } from "@/actions/getCurrentProfile";
import Container from "@/components/Container";
import OrderDetails from "./_components/OrderDetails";
import { redirect } from "next/navigation";

const OrderPage = async () => {
  const profile = await getCurrentProfile();
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
