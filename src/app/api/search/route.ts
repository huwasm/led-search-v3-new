import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // Generate an SQL-like query using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that converts natural language queries about LEDs into SQL-like filter conditions for Supabase.
          The available fields are:
          - peak_wavelength_nm (string)
          - wavelength_nm_from (number)
          - wavelength_nm_to (number)
          - packaging_type (string)
          - viewing_angle (number)
          - main_spec_description (string)
          
          Return only the filter conditions in a format that can be used with Supabase's .or() method.
          Example: For "UV LEDs around 280nm" return: peak_wavelength_nm.ilike.%280%,main_spec_description.ilike.%UV%`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const filterCondition = completion.choices[0].message.content || '';

    // Use the generated filter to search the database
    const { data, error } = await supabase
      .from('leddata')
      .select(`
        *,
        datasheet:datasheets(*)
      `)
      .or(filterCondition)
      .limit(10);

    if (error) throw error;

    return NextResponse.json({ results: data });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
} 