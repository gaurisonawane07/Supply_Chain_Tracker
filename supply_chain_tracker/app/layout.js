import "./globals.css";
// INTERNAL IMPORT
import { TrackingProvider } from "@/context/Tracking"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
