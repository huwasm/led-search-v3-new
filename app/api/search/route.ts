import { NextResponse } from 'next/server';
import openai from '../../lib/openai';
import supabase from '../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Get embeddings for the search query
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    });

    // Search Supabase for similar documents
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding.data[0].embedding,
      match_threshold: 0.7,
      match_count: 5,
    });

    if (error) {
      console.error('Error searching documents:', error);
      return NextResponse.json(
        { error: 'Failed to search documents' },
        { status: 500 }
      );
    }

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error processing search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 