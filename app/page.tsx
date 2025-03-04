"use client"

import Link from "next/link"
import { Sparkles, Github, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="font-times text-2xl font-bold gradient-text">JokeGenius AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-roboto text-sm text-gray-600 dark:text-gray-400">@_kuoki</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <h2 className="font-times text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Generate Clean, Family-Friendly <span className="gradient-text">Jokes with AI</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-roboto text-xl text-gray-600 dark:text-gray-300"
          >
            Experience the joy of endless laughter with our AI-powered joke generator. Perfect for families, kids, and
            anyone who loves clean humor!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/generator">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-roboto text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Get Started
                <Sparkles className="ml-2 w-5 h-5 animate-float" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                title: "Family-Friendly",
                description: "All jokes are clean and suitable for all ages",
              },
              {
                title: "AI-Powered",
                description: "Powered by advanced AI for creative and unique jokes",
              },
              {
                title: "Multiple Categories",
                description: "Choose from various joke styles and themes",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl"
              >
                <h3 className="font-times text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="font-roboto text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} JokeGenius AI. All rights reserved. Developed by Nirupam Thapa aka kuoki
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://instagram.com/kuoki/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/kuokiii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

