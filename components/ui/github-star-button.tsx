import * as React from "react"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    // Fetch the number of stars from the GitHub API
    fetch("https://api.github.com/repos/YacoubAl-hardari/Schedule-of-Worship-in-Ramadan")
      .then((response) => response.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count)
        }
      })
      .catch((error) => {
        console.error("Error fetching GitHub stars:", error)
      })
  }, [])

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => window.open("https://github.com/YacoubAl-hardari/Schedule-of-Worship-in-Ramadan", "_blank")}
    >
      <Star className="h-4 w-4" />
      <span>Star on GitHub</span>
      {stars !== null && <span className="text-sm">({stars})</span>}
    </Button>
  )
}