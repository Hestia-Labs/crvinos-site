import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface QuestionEmailProps {
  senderEmail?: string;
  question?: string;
  senderName?: string;
}

const defaultSenderEmail = "no-reply@example.com";
const defaultQuestion = "No question provided.";
const baseUrl = process.env.SITE_URL ? process.env.SITE_URL : "https://crvinos-site.pages.dev";
const defaultName = "CRVinos";

export default function QuestionEmail({
  senderEmail = defaultSenderEmail,
  question = defaultQuestion,
  senderName = defaultName
}: QuestionEmailProps) {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <Preview style={preview}>Nuevo Mensaje Enviado</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={`${baseUrl}/img/crvinos-email.png`}
              width="auto"
              height="64"
              alt="Logo de CRVinos"
              style={logo}
            />
          
            <Text style={heading}>Nuevo Mensaje Enviado</Text>
            <Text style={text}><strong>De:</strong> {senderEmail}</Text>
            <Text style={text}><strong>Nombre:</strong> {senderName}</Text>
            <Text style={text}><strong>Mensaje:</strong> {question}</Text>
            <Section style={buttonContainer}>
              <Button style={button} href={`mailto:${senderEmail}`}>
                Responder a {senderEmail}
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
  marginBottom: "60px",
  color: "#8D131E",
  textAlign: "center" as const,
};

const text = {
  fontSize: "18px",
  margin: "10px 0",
  color: "#333",
  fontFamily: "'Cormorant Garamond', serif",
};

const buttonContainer = {
  marginTop: "70px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#8D131E",
  color: "#FFFBF7",
  padding: "10px 20px",
  textDecoration: "none",
  borderRadius: "5px",
  display: "inline-block",
};
