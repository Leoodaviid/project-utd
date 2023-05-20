import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { MovieStorage } from "@/context/MovieContext";
import { authConfig } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VideoHub",
  description: "Repository movies",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <MovieStorage>{children}</MovieStorage>
        </SessionProvider>
      </body>
    </html>
  );
}
