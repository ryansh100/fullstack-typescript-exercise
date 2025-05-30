'use client'

import * as React from 'react';
import { Movie } from '@/lib/omdb';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

interface WatchedMoviesProps {
  userId: string;
}

interface AddMovieFormData {
  title: string;
  year?: string;
}

export default function WatchedMovies({ userId }: WatchedMoviesProps) {
  const [watchedMovies, setWatchedMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState<AddMovieFormData>({
    title: '',
    year: '',
  });

  const fetchWatchedMovies = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/watched-movies?userId=${userId}`);
      const data = await response.json();
      setWatchedMovies(data);
    } catch (error) {
      console.error('Error fetching watched movies:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    fetchWatchedMovies();
  }, [fetchWatchedMovies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/watched-movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title: formData.title,
          year: formData.year || undefined,
        }),
      });
      setFormData({
        title: '',
        year: '',
      });
      fetchWatchedMovies();
    } catch (error) {
      console.error('Error adding movie to watched:', error);
    }
  };

  const handleDelete = async (imdbId: string) => {
    try {
      await fetch(`/api/watched-movies?userId=${userId}&imdbId=${imdbId}`, {
        method: 'DELETE',
      });
      fetchWatchedMovies();
    } catch (error) {
      console.error('Error removing movie from watched:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Watched Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="w-full h-64 bg-gray-200 rounded-lg mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Add New Movie</h2>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Movie Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter movie title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year (Optional)</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g., 2024"
                />
              </div>
              <Button type="submit">Add Movie</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Watched Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchedMovies.map((movie) => (
            <Card key={movie.imdbId}>
              <CardContent className="p-4">
                {movie.poster !== 'N/A' && (
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg mb-2"
                  />
                )}
                <CardTitle className="text-lg font-semibold mb-1">{movie.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{movie.year}</p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleDelete(movie.imdbId)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 