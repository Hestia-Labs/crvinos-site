'use server';

import { Resend } from 'resend';
import QuestionEmail from '@/emails/Question';
import ExperienceBookingEmail from '@/emails/Experience';

// Debug the API key to see if it's properly loaded
const resendApiKey = process.env.RESEND_API_KEY || '';
const adminEmail = process.env.ADMIN_EMAIL || '';



// Initialize Resend with debugging
const resend = new Resend(resendApiKey);

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

export async function sendExperienceBooking(
    name: string,
    email: string,
    phone: string,
    date: string,
    experienceTitle: string,
    participants?: number,
    eventType?: string,
    tourTime?: string,
    comments?: string
) {
   
    
    try {
        if (!resendApiKey) {
            throw new Error('Resend API key is not configured');
        }
        
        if (!adminEmail) {
            throw new Error('Admin email is not configured');
        }
        
        const response = await resend.emails.send({
            from: 'reservas@crvinosmx.com',
            to: adminEmail,
            subject: `Nueva Reserva | ${experienceTitle} | ${name}`,
            react: ExperienceBookingEmail({
                name,
                email,
                phone,
                date,
                experienceTitle,
                participants,
                eventType,
                tourTime,
                comments
            }),
        });
        

        
        if (response.error) {
            throw new Error(`Resend API Error: ${response.error.message}`);
        }
        
        return { message: 'Booking notification sent successfully' };
    } catch (error: unknown) {
        console.error('Error sending booking email:', error);
        if (error instanceof Error) {
            return { error: 'Error sending booking notification: ' + error.message };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
}