import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { searchMovies } from '@/lib/omdb';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const watchedMovies = await prisma.watchedMovie.findMany({
      where: { userId },
      orderBy: { watchedAt: 'desc' },
    });
    return NextResponse.json(watchedMovies);
  } catch (error) {
    console.error('Error fetching watched movies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, year } = body;

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'User ID and title are required' },
        { status: 400 }
      );
    }

    // Search for the movie in OMDB
    const searchQuery = year ? `${title} ${year}` : title;
    const movies = await searchMovies(searchQuery);

    if (!movies.length) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    // Use the first result from the search
    const movie = movies[0];

    // Check if the movie is already in the user's watched list
    const existingMovie = await prisma.watchedMovie.findFirst({
      where: {
        userId,
        imdbId: movie.imdbId,
      },
    });

    if (existingMovie) {
      return NextResponse.json(
        { error: 'Movie already in watched list' },
        { status: 400 }
      );
    }

    // Create the watched movie entry
    const watchedMovie = await prisma.watchedMovie.create({
      data: {
        userId,
        imdbId: movie.imdbId,
        title: movie.title,
        poster: movie.poster,
      },
    });

    return NextResponse.json(watchedMovie);
  } catch (error) {
    console.error('Error creating watched movie:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const imdbId = searchParams.get('imdbId');

  if (!userId || !imdbId) {
    return NextResponse.json(
      { error: 'User ID and IMDb ID are required' },
      { status: 400 }
    );
  }

  try {
    // Delete the watched movie entry
    await prisma.watchedMovie.deleteMany({
      where: {
        userId,
        imdbId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting watched movie:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 