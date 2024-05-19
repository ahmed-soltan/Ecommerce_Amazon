import { getCurrentUser } from "@/actions/getCurrentUser";

import AccountContainer from "./AccountContainer";
import Container from "@/components/Container";
import {redirect} from 'next/navigation'
const Account = async () => {
  const user = await getCurrentUser();
  if(!user){
    return redirect('/login')
  }
  return (
    <div className="py-8">
      <Container>
        <AccountContainer user={user!} />
      </Container>
    </div>
  );
};

export default Account;
