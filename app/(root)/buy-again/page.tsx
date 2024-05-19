import { getCurrentProfile } from "@/actions/getCurrentProfile"
import Container from "@/components/Container"
import { redirect } from "next/navigation"
import BuyAgainProducts from "./_components/BuyAgainProducts"
import { Separator } from "@/components/ui/separator"

const BuyAgainPage = async() => {
    const profile = await getCurrentProfile()
    if(!profile){
        return redirect('/login')
    }
  return (
    <div className="p-6 bg-white">
        <Container>
            <h1 className="text-3xl text-slate-900 font-medium">Bug Again</h1>
            <Separator className="my-5"/>
            <BuyAgainProducts orders={profile.Order}/>
        </Container>
    </div>
  )
}

export default BuyAgainPage