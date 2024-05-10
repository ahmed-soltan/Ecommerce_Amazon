import { getCurrentUser } from "@/actions/getCurrentUser";

import AccountContainer from "./AccountContainer";
import Container from "@/components/Container";

const Account = async () => {
  const user = await getCurrentUser();
  return (
    <div className="py-8">
      <Container>
        <AccountContainer user={user!} />
      </Container>
    </div>
  );
};

export default Account;
