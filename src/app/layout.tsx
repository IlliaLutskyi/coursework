import type { Metadata } from "next";
import "@/styles/globals.css";
import NavigationBar from "@/components/navbar/NavigationBar";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import Footer from "@/components/footer/Footer";
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
        <ChakraProvider>
          <NavigationBar />
          <main className="flex-grow ">{children}</main>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
