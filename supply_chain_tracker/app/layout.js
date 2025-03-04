import "./globals.css";
// INTERNAL IMPORT
import { TrackingProvider } from "@/context/TrackingContext"; 
import { NavBar, Footer } from "@/components/page";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TrackingProvider>
        <NavBar />
          {children}
        </TrackingProvider>
        <Footer />
      </body>
    </html>
  );
}
