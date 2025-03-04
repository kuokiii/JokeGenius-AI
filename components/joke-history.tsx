"use client"

import { Button } from "@/components/ui/button"
import { ScrollText, Star } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShareJoke } from "./share-joke"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface JokeHistoryProps {
  jokes: string[]
  favoriteJokes: string[]
  toggleFavorite: (joke: string) => void
}

export function JokeHistory({ jokes, favoriteJokes, toggleFavorite }: JokeHistoryProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800"
          >
            <ScrollText className="h-4 w-4" />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-900 border-purple-200 dark:border-purple-800">
        <SheetHeader>
          <SheetTitle className="text-purple-600 dark:text-purple-400">Joke History</SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400">
            Your previously generated and favorite jokes
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="history" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <JokeList jokes={jokes} favoriteJokes={favoriteJokes} toggleFavorite={toggleFavorite} />
          </TabsContent>
          <TabsContent value="favorites" className="mt-4">
            <JokeList jokes={favoriteJokes} favoriteJokes={favoriteJokes} toggleFavorite={toggleFavorite} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

function JokeList({ jokes, favoriteJokes, toggleFavorite }: JokeHistoryProps) {
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <AnimatePresence>
        {jokes.map((joke, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="border border-purple-200 dark:border-purple-800 rounded-lg p-4 relative bg-purple-50 dark:bg-purple-900/50 backdrop-blur-sm"
          >
            <p className="mb-2 text-gray-800 dark:text-gray-200">{joke}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <ShareJoke joke={joke} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(joke)}
                className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-500"
              >
                <Star className={`h-4 w-4 ${favoriteJokes.includes(joke) ? "fill-current" : ""}`} />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

