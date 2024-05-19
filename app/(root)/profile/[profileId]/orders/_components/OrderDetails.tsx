import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order } from "@prisma/client";
import OrderList from "./OrderList";
import { Separator } from "@/components/ui/separator";

type OrderDetailsProps = {
  order: Order[];
  profileId:string
};

const OrderDetails = ({ order , profileId }: OrderDetailsProps) => {
  const allOrders = order.filter(
    (order) => order.paymentStatus === "complete"
  );;
  const deliveredOrders = order.filter((order) => order.deliveryStatus);
  const notShippedOrders = order.filter((order) => !order.deliveryStatus && order.paymentStatus === "complete");
  const canceledOrders = order.filter(
    (order) => order.paymentStatus === "open"
  );
  
  return (
    <div className="flex item-start flex-col gap-4">
      <Tabs defaultValue="orders" className="w-full overflow-x-auto">
        <TabsList>
          <TabsTrigger
            className="text-cyan-600 underline rounded-md"
            value="orders"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            className="text-cyan-600 underline rounded-md"
            value="buy-again"
          >
            Buy Again
          </TabsTrigger>
          <TabsTrigger
            className="text-cyan-600 underline rounded-md"
            value="not-shipped"
          >
            Not Yet Shipped
          </TabsTrigger>
          <TabsTrigger
            className="text-cyan-600 underline rounded-md"
            value="canceled-orders"
          >
            Canceled Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          {allOrders.length > 0 ? (
            <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
              <h1 className="font-medium text-3xl">Orders</h1>
              <Separator />
              {allOrders.map((order) => (
                <OrderList key={order.id} order={order}  profileId={profileId}/>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-center">
                Looks Like You Haven&apos;t Placed Orders
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="buy-again">
        {deliveredOrders.length > 0 ? (
            <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
              <h1 className="font-medium text-3xl">Buy Again</h1>
              <Separator />
              {deliveredOrders.map((order) => (
                <OrderList key={order.id} order={order}  profileId={profileId} delivered={true}/>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-center">
                Looks Like You Haven&apos;t Placed Orders
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="not-shipped">
        {notShippedOrders.length > 0 ? (
            <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
              <h1 className="font-medium text-3xl">Not Shipped Yet</h1>
              <Separator />
              {notShippedOrders.map((order) => (
                <OrderList key={order.id} order={order}  profileId={profileId}/>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-center">
                Looks Like You Haven&apos;t Placed Orders
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="canceled-orders">
        {canceledOrders.length > 0 ? (
            <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
              <h1 className="font-medium text-3xl">Canceled Orders</h1>
              <Separator />
              {canceledOrders.map((order) => (
                <OrderList key={order.id} order={order} canceled={true} profileId={profileId}/>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-center">
                Looks Like You Haven&apos;t Placed Orders
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* <div className="block md:hidden">
        {allOrders.length > 0 ? (
          <div className="bg-white p-5 rounded-md flex flex-col items-start gap-4">
            <h1 className="font-medium text-3xl">Orders</h1>
            <Separator />
            {allOrders.map((order) => (
              <OrderList key={order.id} order={order} profileId={profileId}/>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-center">
              Looks Like You Haven&apos;t Placed Orders
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default OrderDetails;
