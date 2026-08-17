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

// 3. In-memory / Persistent Live Bookings Storage
const activeBookings = [
  {
    id: 'VTC-90412',
    customer: 'Elena Rostova',
    phone: '(702) 772-4116',
    email: 'elena.r@example.com',
    address: '10432 Summerlin Centre Dr, Las Vegas, NV 89135',
    service: '75" TV Mounting + Soundbar + In-Wall Cord Concealment',
    surface: 'Drywall over wood studs with Toggle Bolt anchors',
    date: 'August 2026 28',
    time: '10:00 AM - 12:00 PM',
    assignedTo: 'Carlos Chavez',
    status: 'In Progress',
    bookingType: 'Service Checkout',
    laborCost: 150.00,
    hardwareCost: 15.00,
    total: 165.00
  },
  {
    id: 'VTC-90415',
    customer: 'Marcus Vance',
    phone: '(702) 772-4116',
    email: 'marcus.vance@example.com',
    address: 'Veer Towers - 3722 S Las Vegas Blvd #1804',
    service: '90 lbs Heavy Mirror Installation + 4-Piece Gallery Wall',
    surface: 'Concrete / Masonry Wall in High-Rise Condo Tower',
    date: 'August 2026 28',
    time: '02:00 PM - 04:00 PM',
    assignedTo: 'Jonathan Rodriguez',
    status: 'Pending',
    bookingType: 'Service Checkout',
    laborCost: 180.00,
    hardwareCost: 30.00,
    total: 210.00
  },
  {
    id: 'VTC-90420',
    customer: 'Robert Vance',
    phone: '(702) 772-4116',
    email: 'robert.vance@example.com',
    address: '2214 Green Valley Pkwy, Henderson, NV 89014',
    service: 'IKEA King Bedroom Set Assembly + Desk ($120/hr)',
    surface: 'Hardwood floor / safety anti-tip wall anchoring',
    date: 'August 2026 29',
    time: '09:00 AM - 11:00 AM',
    assignedTo: 'Carlos Chavez',
    status: 'Confirmed',
    bookingType: 'Service Checkout',
    laborCost: 240.00,
    hardwareCost: 0.00,
    total: 240.00
  }
];

// Healthcheck Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), app: 'Vegas TaskCraft API' });
});

// GET: Retrieve all active bookings for website calendar & tech portal
app.get('/api/bookings', (req, res) => {
  return res.status(200).json({
    success: true,
    bookings: activeBookings
  });
});

// Zod Lead Validation Schema
const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional(),
  service: z.string().min(2),
  address: z.string().min(3),
  date: z.string().optional(),
  timeSlot: z.string().optional(),
  assignedTech: z.string().optional(),
  bookingType: z.string().optional(),
  totalAmount: z.number().optional(),
  notes: z.string().max(500).optional(),
});

// Endpoint: Capture Lead / Reservation
app.post('/api/lead', (req, res) => {
  try {
    const validatedData = LeadSchema.parse(req.body);
    const bookingCode = 'VTC-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      id: bookingCode,
      customer: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email || 'client@example.com',
      address: validatedData.address,
      service: validatedData.service,
      surface: 'Standard Wall Surface / Multi-Anchor',
      date: validatedData.date || 'August 2026 28',
      time: validatedData.timeSlot || '10:00 AM - 12:00 PM',
      assignedTo: validatedData.assignedTech || (activeBookings.length % 2 === 0 ? 'Carlos Chavez' : 'Jonathan Rodriguez'),
      status: 'Confirmed',
      bookingType: validatedData.bookingType || 'Service Checkout',
      laborCost: validatedData.totalAmount || 150.00,
      hardwareCost: 0,
      total: validatedData.totalAmount || 150.00
    };

    activeBookings.push(newBooking);

    console.log('📌 NUEVA RESERVA EN VIVO:', newBooking);

    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      }).catch((err) => console.error('Error enviando a n8n:', err));
    }

    return res.status(200).json({
      success: true,
      bookingCode,
      booking: newBooking,
      message: 'Reserva procesada exitosamente',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Datos no válidos', details: error.errors });
    }
    return res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🔒 Vegas TaskCraft Security API corriendo en puerto ${PORT}`);
});
