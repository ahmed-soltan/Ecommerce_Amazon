import { getCurrentProfile } from "@/actions/getCurrentProfile"
import Container from "@/components/Container";
import Success from "./_components/Success";

const page = async() => {
    const profile = await getCurrentProfile();

  return (
    <div className="p-6">
        <Container>
            <Success profile={profile!}/>
        </Container>
    </div>
  )
}

export default page