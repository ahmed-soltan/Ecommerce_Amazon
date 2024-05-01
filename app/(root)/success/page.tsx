import Container from "@/components/Container"
import Success from "./_components/Success"
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getCurrentProfile } from "@/actions/getCurrentProfile";

const page = async() => {
    const profile =await getCurrentProfile()
    console.log(profile)
  return (
    <div className="p-6">
        <Container>
            <Success profileId={profile?.id!}/>
        </Container>
    </div>
  )
}

export default page