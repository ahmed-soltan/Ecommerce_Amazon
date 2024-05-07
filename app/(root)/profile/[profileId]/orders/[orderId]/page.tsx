import { getOrderById } from "@/actions/getOrderById";
import Container from "@/components/Container";
import OrderContainerDetails from "./_components/OrderContainerDetails";
import { redirect } from "next/navigation";

const page = async ({
  params,
}: {
  params: { orderId: string; profileId: string };
}) => {
  const order = await getOrderById(params.orderId);
  if(!order){
    return redirect('/')
  }
  console.log(order)
  return (
    <div className="py-6">
      <Container>
       <OrderContainerDetails order={order}/>
      </Container>
    </div>
  );
};

export default page;
