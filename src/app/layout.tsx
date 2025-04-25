import "@/styles/globals.css";
import type { Metadata } from "next";
import NavigationBar from "@/components/navbar/NavigationBar";
import Footer from "@/components/footer/Footer";
import AuthWraper from "@/components/AuthWraper";
import ChakraWraper from "@/components/ChakraWraper";
export const metadata: Metadata = {
  title: "Spook",
  icons: "/images/SiteLogo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white font-roboto text-black relative flex flex-col">
        <ChakraWraper>
          <AuthWraper>
            <NavigationBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthWraper>
        </ChakraWraper>
      </body>
    </html>
  );
}
