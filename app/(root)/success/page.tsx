import { getCurrentProfile } from "@/actions/getCurrentProfile"
import Container from "@/components/Container";
import Success from "./_components/Success";
import { redirect } from "next/navigation";

const page = async() => {
    const profile = await getCurrentProfile();
    if(!profile){
      return redirect('/login')
    }
  return (
    <div className="p-6">
        <Container>
            <Success profile={profile!}/>
        </Container>
    </div>
  )
}

export default page