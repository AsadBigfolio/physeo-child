import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: {
    absolute: '',
    default: '',
    template: '%s | The Supernatural University'
  },
  description: "Super Natural",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
