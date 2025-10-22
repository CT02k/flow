import NextAuth from "next-auth";
import { options } from "@/lib/nextauth";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
