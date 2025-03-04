"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const categories = [
  { value: "general", label: "General", emoji: "😄" },
  { value: "puns", label: "Puns", emoji: "🤪" },
  { value: "dad", label: "Dad Jokes", emoji: "👨" },
  { value: "programming", label: "Programming", emoji: "💻" },
  { value: "science", label: "Science", emoji: "🔬" },
  { value: "animal", label: "Animal", emoji: "🐶" },
  { value: "food", label: "Food", emoji: "🍔" },
  { value: "wordplay", label: "Wordplay", emoji: "🔤" },
  { value: "music", label: "Music", emoji: "🎵" },
  { value: "sports", label: "Sports", emoji: "⚽" },
  { value: "movies", label: "Movies", emoji: "🎬" },
  { value: "history", label: "History", emoji: "📜" },
  { value: "space", label: "Space", emoji: "🚀" },
  { value: "weather", label: "Weather", emoji: "🌦️" },
  { value: "travel", label: "Travel", emoji: "✈️" },
]

interface JokeCategoriesProps {
  onSelectCategory: (category: string) => void
}

export function JokeCategories({ onSelectCategory }: JokeCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("general")

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    onSelectCategory(category)
  }

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border border-purple-300 dark:border-purple-700">
      <div className="p-4 grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <motion.div key={category.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`w-full justify-start text-left ${
                selectedCategory === category.value
                  ? "bg-purple-500 text-white"
                  : "bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900"
              }`}
              onClick={() => handleCategoryClick(category.value)}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
}

