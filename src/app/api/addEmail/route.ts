import type { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { createDb } from '@/db';
import { mailing_list } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const DB = getRequestContext().env.DB;
  const drizzle = createDb(DB);

  type RequestBody = {
    email: string;
  };

  const { email }: RequestBody = await request.json();

  const lowerCaseEmail = email.toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!lowerCaseEmail || !emailRegex.test(lowerCaseEmail)) {
    return new Response(JSON.stringify({ error: 'Correo electrónico inválido o faltante' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const existingEmail = await drizzle
    .select()
    .from(mailing_list)
    .where(eq(mailing_list.email, lowerCaseEmail))
    .execute();

  if (existingEmail.length > 0) {
    return new Response(JSON.stringify({ error: 'El correo electrónico ya existe' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const res = await drizzle
    .insert(mailing_list)
    .values({
      email: lowerCaseEmail,
      name: '',
      subscribed_on: new Date().toISOString(),
      status: 'active'
    })
    .execute();

  return new Response(JSON.stringify(res), {
    headers: { 'Content-Type': 'application/json' }
  });
}
