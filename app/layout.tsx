import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto, Gideon_Roman as Times_New_Roman } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})
const timesNewRoman = Times_New_Roman({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-times",
})

export const metadata: Metadata = {
  title: "JokeGenius AI - Family-Friendly Joke Generator",
  description: "An AI-powered joke generator that creates clean, family-friendly jokes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} ${timesNewRoman.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'