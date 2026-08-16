import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Cybersecurity Headers (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// 2. Strict CORS Configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST'],
  })
);

app.use(express.json({ limit: '10kb' }));

// 3. Rate Limiting for AI Endpoint
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Límite de solicitudes alcanzado. Por favor intenta en 1 minuto.' },
});

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiados intentos de reserva. Por favor intenta más tarde.' },
});

// Healthcheck Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), app: 'Vegas TaskCraft API' });
});

// Zod Lead Validation Schema
const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  service: z.string().min(2),
  address: z.string().min(3),
  timeSlot: z.string().optional(),
  notes: z.string().max(500).optional(),
});

// Endpoint: Capture Lead / Reservation
app.post('/api/lead', leadLimiter, (req, res) => {
  try {
    const validatedData = LeadSchema.parse(req.body);
    const bookingCode = 'VTC-' + Math.floor(100000 + Math.random() * 900000);

    console.log('📌 NUEVA RESERVA RECIBIDA EN LAS VEGAS:', {
      bookingCode,
      ...validatedData,
      timestamp: new Date().toISOString(),
    });

    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingCode, ...validatedData }),
      }).catch((err) => console.error('Error enviando a n8n:', err));
    }

    return res.status(200).json({
      success: true,
      bookingCode,
      message: 'Reserva procesada exitosamente',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Datos no válidos', details: error.errors });
    }
    return res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// Endpoint: AI Chat Assistant (Proxy OpenAI / n8n)
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    if (process.env.N8N_CHAT_WEBHOOK_URL) {
      const n8nRes = await fetch(process.env.N8N_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await n8nRes.json();
      return res.json({ reply: data.output || data.reply });
    }

    let reply = 'Con gusto te asistimos en Vegas TaskCraft. Realizamos montaje de TV, ensamblaje de muebles IKEA/Wayfair, cortinas, pintura y Smart Home en todo Las Vegas Valley.';
    let actionButton = { label: 'Reservar Servicio' };

    const lower = message.toLowerCase();
    if (lower.includes('tv') || lower.includes('televisor')) {
      reply = 'El montaje de TV en Las Vegas cuesta $100 (hasta 42"), $150 (hasta 65") y $200 (65" en adelante). Incluye anclajes Toggle Bolt y nivelación láser.';
      actionButton = { label: 'Reservar Montaje de TV', service: 'Montaje de TV & Home Theater' };
    } else if (lower.includes('ikea') || lower.includes('mueble')) {
      reply = '¡Armamos todo tipo de muebles de IKEA, Wayfair y Amazon en Summerlin, Henderson y North LV por $120 la hora!';
      actionButton = { label: 'Reservar Ensamblaje', service: 'Ensamblaje de Muebles' };
    } else if (lower.includes('smart') || lower.includes('cámara') || lower.includes('seguridad')) {
      reply = 'Ofrecemos automatización de 3 puntos (TV, comedor, cocina) con Alexa ($180) y sistemas de cámaras outdoor WiFi con energía solar ($250).';
      actionButton = { label: 'Reservar Smart Home', service: 'Smart Home & Seguridad' };
    }

    return res.json({ reply, actionButton });
  } catch (err) {
    console.error('Error en /api/chat:', err);
    return res.status(500).json({ error: 'Error procesando solicitud de IA' });
  }
});

app.listen(PORT, () => {
  console.log(`🔒 Vegas TaskCraft Security API corriendo en puerto ${PORT}`);
});
