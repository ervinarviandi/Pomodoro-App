import type { Metadata } from "next";
import { Signika_Negative } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/atoms/theme-provider";

const signika = Signika_Negative({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pomodoro App Ervin Arviandi",
  description: "pmodoro app ",
  icons: {
    icon: "/assets/164.Clock-Is-Ticking.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={signika.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <link
            rel="icon"
            href="/assets/164.Clock-Is-Ticking.png"
            sizes="any"
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
