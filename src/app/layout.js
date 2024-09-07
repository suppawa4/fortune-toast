import localFont from "next/font/local";
import { AppBar, Container } from "@mui/material";
import { Prompt } from "next/font/google";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Fortune Toast",
  description: "Fortune Tarot Toast",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${prompt.className} antialiased`}>
        <div
          style={{
            backgroundImage: `url('/purple-bg.jpg')`,
            backgroundAttachment: "fixed",
          }}
          className="w-full min-h-screen"
        >
          <AppBar
          className="py-7"
            position="static"
            style={{ background: "transparent", boxShadow: "none" }}
          >
            <Container className="flex justify-center">
              <h1 className="font-semibold text-3xl">🍞Fortune Toast🔮</h1>
            </Container>
          </AppBar>
          {children}
        </div>
      </body>
    </html>
  );
}
