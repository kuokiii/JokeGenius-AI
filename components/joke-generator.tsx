"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Loader2, RefreshCw, Sparkles, MessageSquarePlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { JokeCategories } from "./joke-categories"
import { ShareJoke } from "./share-joke"
import { JokeHistory } from "./joke-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import confetti from "canvas-confetti"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function JokeGenerator() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("general")
  const [jokeHistory, setJokeHistory] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [favoriteJokes, setFavoriteJokes] = useState<string[]>([])
  const [usedJokes, setUsedJokes] = useState<Set<string>>(new Set())

  useEffect(() => {
    const savedJokes = localStorage.getItem("jokeHistory")
    if (savedJokes) {
      setJokeHistory(JSON.parse(savedJokes))
    }
  }, [])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteJokes")
    if (savedFavorites) {
      setFavoriteJokes(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    if (jokeHistory.length > 0) {
      localStorage.setItem("jokeHistory", JSON.stringify(jokeHistory))
    }
  }, [jokeHistory])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const generateJoke = async (isCustomPrompt = false) => {
    setIsLoading(true)
    setError(null)

    const userMessageContent = isCustomPrompt
      ? `Generate a unique joke about ${customPrompt}!`
      : `Generate a unique ${category} joke!`

    const userMessage: Message = {
      role: "user",
      content: userMessageContent,
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      const apiUrl = isCustomPrompt
        ? `/api/joke?prompt=${encodeURIComponent(customPrompt)}&used=${Array.from(usedJokes).join(",")}`
        : `/api/joke?category=${category}&used=${Array.from(usedJokes).join(",")}`

      const response = await fetch(apiUrl)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.error) {
        throw new Error(data.error)
      }

      setUsedJokes((prev) => new Set([...prev, data.joke]))

      const assistantMessage: Message = {
        role: "assistant",
        content: data.joke,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setJokeHistory((prev) => [data.joke, ...prev].slice(0, 10))
      triggerConfetti()

      if (isCustomPrompt) {
        setCustomPrompt("")
      }
    } catch (error) {
      console.error("Error generating joke:", error)
      setError(error instanceof Error ? error.message : "Failed to generate joke. Please try again.")
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I couldn't generate a joke right now. Please try again later!",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
  }

  const toggleFavorite = (joke: string) => {
    const updatedFavorites = favoriteJokes.includes(joke)
      ? favoriteJokes.filter((j) => j !== joke)
      : [...favoriteJokes, joke]
    setFavoriteJokes(updatedFavorites)
    localStorage.setItem("favoriteJokes", JSON.stringify(updatedFavorites))
  }

  const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop()?.content

  return (
    <Card className="w-full border bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-center flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          <span>AI Joke Bot</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          {lastAssistantMessage && <ShareJoke joke={lastAssistantMessage} />}
          <JokeHistory jokes={jokeHistory} favoriteJokes={favoriteJokes} toggleFavorite={toggleFavorite} />
          <ThemeToggle />
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="space-y-4 mb-4 min-h-[300px] max-h-[500px] overflow-y-auto p-2 rounded-lg bg-white/50 dark:bg-gray-900/50"
          role="log"
          aria-live="polite"
          aria-label="Joke conversation"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center p-3 rounded-md bg-red-50 dark:bg-red-900/20"
            >
              {error}
            </motion.div>
          )}
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-muted-foreground py-12 flex flex-col items-center"
            >
              <Sparkles className="h-12 w-12 mb-4 text-blue-500 dark:text-blue-400 animate-float" />
              <p>Choose a category or enter a custom topic to generate a joke!</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className={message.role === "assistant" ? "bg-blue-500" : "bg-purple-500"}>
                      <AvatarFallback>{message.role === "assistant" ? "AI" : "U"}</AvatarFallback>
                    </Avatar>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-purple-500 text-white dark:bg-purple-600"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {message.content}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          )}
        </div>

        <Tabs defaultValue="category" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="category">Choose Category</TabsTrigger>
            <TabsTrigger value="custom">Custom Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="category" className="space-y-4">
            <div className="mb-4">
              <JokeCategories onSelectCategory={handleCategoryChange} />
            </div>
            <Button
              onClick={() => generateJoke()}
              disabled={isLoading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Joke...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {messages.length === 0 ? "Generate a Joke" : "Another Joke, Please!"}
                </>
              )}
            </Button>
          </TabsContent>
          <TabsContent value="custom" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a topic for your joke..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => generateJoke(true)}
                disabled={isLoading || !customPrompt.trim()}
                className="bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquarePlus className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

