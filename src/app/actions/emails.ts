'use server';

import { Resend } from 'resend';
import QuestionEmail from '@/emails/Question'; 

const resend = new Resend(process.env.RESEND_API_KEY || '');
const adminEmail = process.env.ADMIN_EMAIL || '';



export async function sendQuestion(
    senderEmail: string, 
    question: string,
    senderName: string
) {
    try {
        await resend.emails.send({
            from: 'contacto@crvinosmx.com',
            to: adminEmail,
            subject: `Nuevo Mensaje Enviado | ${senderName}`,
            react: (
              QuestionEmail({ senderEmail, question, senderName })
            ),
        });
        return { message: 'Email sent successfully' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: 'Error sending email: ' + error.message };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
}