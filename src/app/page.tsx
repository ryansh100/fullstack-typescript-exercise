import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import WatchedMovies from "@/components/WatchedMovies"

// Temporary userId for demonstration
const TEMP_USER_ID = "demo-user-123"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Movie Tracker</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Watched Movies</CardTitle>
              <CardDescription>Keep track of movies you've watched</CardDescription>
            </CardHeader>
            <CardContent>
              <WatchedMovies userId={TEMP_USER_ID} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
