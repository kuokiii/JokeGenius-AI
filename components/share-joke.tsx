"use client"

import { Button } from "@/components/ui/button"
import { Share2, Check, Copy } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface ShareJokeProps {
  joke: string
}

export function ShareJoke({ joke }: ShareJokeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joke)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareJoke = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Funny Joke",
          text: joke,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className={`rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white ${copied ? "bg-green-500/20" : ""}`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={shareJoke}
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share joke</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

