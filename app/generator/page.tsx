import JokeGenerator from "@/components/joke-generator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function GeneratorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 md:p-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <div className="z-10 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              JokeGenius AI Generator
            </h1>
          </div>
          <ThemeToggle />
        </div>
        <JokeGenerator />
      </div>
    </main>
  )
}

