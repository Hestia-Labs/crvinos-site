import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface ExperienceBookingEmailProps {
  name: string;
  email: string;
  phone: string;
  date: string;
  experienceTitle: string;
  participants?: number;
  eventType?: string;
  tourTime?: string;
  comments?: string;
}

const baseUrl = process.env.SITE_URL ? process.env.SITE_URL : "https://crvinos-site.pages.dev";

export default function ExperienceBookingEmail({
  name,
  email,
  phone,
  date,
  experienceTitle,
  participants,
  eventType,
  tourTime,
  comments
}: ExperienceBookingEmailProps) {
  // Format date for better readability
  const formattedDate = new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Html>
      <Head>
        {/* No font import needed */}
      </Head>
      <Preview style={preview}>Nueva Reserva de Experiencia: {experienceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={`${baseUrl}/img/CRVino-logo.png`}
              width="auto"
              height="64"
              alt="Logo de CRVinos"
              style={logo}
            />
          
            <Text style={heading}>Nueva Reserva de Experiencia</Text>
            <Text style={subheading}>{experienceTitle}</Text>

            <Section style={detailSection}>
              <Text style={sectionTitle}>Información de Contacto</Text>
              <Text style={text}><strong>Nombre:</strong> {name}</Text>
              <Text style={text}><strong>Email:</strong> {email}</Text>
              <Text style={text}><strong>Teléfono:</strong> {phone}</Text>
            </Section>

            <Section style={detailSection}>
              <Text style={sectionTitle}>Detalles de la Reserva</Text>
              <Text style={text}><strong>Fecha Solicitada:</strong> {formattedDate}</Text>
              
              {participants && (
                <Text style={text}><strong>Número de Participantes:</strong> {participants}</Text>
              )}
              
              {tourTime && (
                <Text style={text}><strong>Horario Preferido:</strong> {tourTime}</Text>
              )}
              
              {eventType && (
                <Text style={text}><strong>Tipo de Evento:</strong> {eventType}</Text>
              )}
            </Section>

            {comments && (
              <Section style={detailSection}>
                <Text style={sectionTitle}>Comentarios Adicionales</Text>
                <Text style={text}>{comments}</Text>
              </Section>
            )}
            
            <Section style={buttonContainer}>
              <Button style={button} href={`mailto:${email}`}>
                Responder a {name}
              </Button>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const preview = {
  backgroundColor: "#FFFBF7",
  color: "#8D131E",
  fontSize: "20px",
  fontFamily: "'Cormorant Garamond', serif",
  padding: "20px",
};

const main = {
  backgroundColor: "#FFFBF7",
  fontFamily: "'Cormorant Garamond', serif",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const logo = {
  display: "block",
  margin: "0 auto 20px",
};

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#8D131E",
  textAlign: "center" as const,
};

const subheading = {
  fontSize: "24px",
  fontWeight: "normal",
  marginBottom: "40px",
  color: "#8D131E",
  textAlign: "center" as const,
  fontStyle: "italic",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#8D131E",
  borderBottom: "1px solid #8D131E",
  paddingBottom: "5px",
};

const detailSection = {
  marginBottom: "30px",
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const text = {
  fontSize: "18px",
  lineHeight: "26px",
  margin: "10px 0",
  color: "#333",
  fontFamily: "'Cormorant Garamond', serif",
};

const buttonContainer = {
  marginTop: "40px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#8D131E",
  color: "#FFFBF7",
  padding: "12px 24px",
  textDecoration: "none",
  borderRadius: "5px",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
}; 