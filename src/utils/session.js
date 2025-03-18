import authOptions from "./authOptions";
import { getServerSession } from "next-auth";

const loadSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default loadSession;
