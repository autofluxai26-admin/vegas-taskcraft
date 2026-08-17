import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Hostinger SMTP Transporter Setup
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // SSL port 465
  auth: {
    user: process.env.SMTP_USER || 'contact@vegastaskcraft.com',
    pass: process.env.SMTP_PASS || '',
  },
});

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

app.use(express.json({ limit: '50kb' }));

const BOOKINGS_FILE = path.join(process.cwd(), 'server', 'bookings.json');

// Initial default bookings if file doesn't exist
const initialBookings = [
  {
    id: 'VTC-768394',
    customer: 'Jonathan Rodriguez',
    phone: '(702) 772-4116',
    email: 'vegastaskcraft@gmail.com',
    address: '3722 S Las Vegas Blvd, High-Rise Condo #1804',
    service: '75" TV Mounting + IKEA King Bedroom Assembly + Soundbar',
    surface: 'Concrete / Masonry Wall in High-Rise Condo Tower',
    date: 'August 31, 2026',
    time: '11:30 AM - 01:30 PM',
    assignedTo: 'Jonathan Rodriguez',
    status: 'Confirmed',
    bookingType: 'Service Checkout',
    itemizedLines: [
      { name: '75" TV Mounting & Audio Bar', unitPrice: 200.00, qty: 1, subtotal: 200.00 },
      { name: 'IKEA Bedroom Assembly Labor', unitPrice: 120.00, qty: 4, subtotal: 480.00 },
      { name: 'Accent Wall & Heavy Mirror Add-on', unitPrice: 700.00, qty: 1, subtotal: 700.00 }
    ],
    total: 1380.00
  },
  {
    id: 'VTC-90412',
    customer: 'Elena Rostova',
    phone: '(702) 772-4116',
    email: 'elena.r@example.com',
    address: '10432 Summerlin Centre Dr, Las Vegas, NV 89135',
    service: '75" TV Mounting + Soundbar + In-Wall Cord Concealment',
    surface: 'Drywall over wood studs with Toggle Bolt anchors',
    date: 'August 28, 2026',
    time: '10:00 AM - 12:00 PM',
    assignedTo: 'Carlos Chavez',
    status: 'In Progress',
    bookingType: 'Service Checkout',
    itemizedLines: [
      { name: '75" Heavy TV Mounting', unitPrice: 150.00, qty: 1, subtotal: 150.00 },
      { name: 'In-Wall Cable Concealment Kit', unitPrice: 15.00, qty: 1, subtotal: 15.00 }
    ],
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
    date: 'August 28, 2026',
    time: '02:00 PM - 04:00 PM',
    assignedTo: 'Jonathan Rodriguez',
    status: 'Pending',
    bookingType: 'Service Checkout',
    itemizedLines: [
      { name: 'Standalone Heavy Mirror Contract', unitPrice: 90.00, qty: 1, subtotal: 90.00 },
      { name: 'Gallery Art Hanging', unitPrice: 60.00, qty: 2, subtotal: 120.00 }
    ],
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
    date: 'August 29, 2026',
    time: '09:00 AM - 11:00 AM',
    assignedTo: 'Carlos Chavez',
    status: 'Confirmed',
    bookingType: 'Service Checkout',
    itemizedLines: [
      { name: 'IKEA Furniture Assembly Labor', unitPrice: 120.00, qty: 2, subtotal: 240.00 }
    ],
    total: 240.00
  }
];

function loadBookings() {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading bookings file:', err);
  }
  return initialBookings;
}

function saveBookings(bookings) {
  try {
    const dir = path.dirname(BOOKINGS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving bookings file:', err);
  }
}

let activeBookings = loadBookings();

function generateHtmlConfirmation(booking) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #F1F5F9; color: #0F172A; margin: 0; padding: 25px; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 2px solid #00F0FF; border-radius: 24px; overflow: hidden; padding: 35px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); }
    .logo-header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #E2E8F0; }
    .logo-img { width: 220px; height: auto; display: block; margin: 0 auto; }
    .status-badge { display: inline-block; background: #E0F2FE; border: 1.5px solid #0284C7; color: #0369A1; padding: 6px 18px; border-radius: 30px; font-weight: 800; font-size: 12px; text-transform: uppercase; margin-top: 15px; }
    h2 { color: #0F172A; text-align: center; margin-top: 25px; font-size: 24px; font-weight: 900; }
    .details-box { background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 16px; padding: 22px; margin: 25px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E2E8F0; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #475569; font-weight: 700; }
    .value { color: #0F172A; font-weight: 800; text-align: right; }
    .total-row { font-size: 19px; color: #0284C7; font-weight: 900; margin-top: 12px; text-align: right; }
    .footer-signature { text-align: center; margin-top: 30px; padding-top: 25px; border-top: 2px solid #E2E8F0; font-size: 13px; color: #475569; }
    .sig-logo { width: 140px; height: auto; display: block; margin: 0 auto 12px auto; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-header">
      <img src="https://vegastaskcraft.com/images/logo.png" alt="Vegas TaskCraft LLC" class="logo-img" />
      <div><span class="status-badge">✓ Appointment Confirmed</span></div>
    </div>

    <h2>Booking Confirmation</h2>
    <p style="text-align:center; color:#334155; font-size:15px; line-height:1.6;">
      Dear <strong>${booking.customer}</strong>, thank you for booking with Vegas TaskCraft LLC! Your appointment has been scheduled with precision craftsman guarantee.
    </p>

    <div class="details-box">
      <div class="row"><span class="label">Booking Code:</span><span class="value" style="color:#0284C7;">${booking.id}</span></div>
      <div class="row"><span class="label">Service Requested:</span><span class="value">${booking.service}</span></div>
      <div class="row"><span class="label">Appointment Date:</span><span class="value">${booking.date}</span></div>
      <div class="row"><span class="label">Time Window:</span><span class="value">${booking.time}</span></div>
      <div class="row"><span class="label">Assigned Craftsman:</span><span class="value">${booking.assignedTo}</span></div>
      <div class="row"><span class="label">Service Location:</span><span class="value">${booking.address}</span></div>
      <div class="total-row">Total Net Amount: $${(booking.total || 0).toFixed(2)} USD</div>
    </div>

    <p style="font-size:13px; color:#64748B; text-align:center; font-style:italic;">
      Our master technician will arrive with specialized tools, 3D laser levels, and heavy-duty anchors. Flat rate with 0% hidden taxes.
    </p>

    <div class="footer-signature">
      <img src="https://vegastaskcraft.com/images/logo.png" alt="Vegas TaskCraft LLC" class="sig-logo" />
      <strong style="color:#0F172A; font-size:15px; display:block; margin-bottom:4px;">Vegas TaskCraft LLC</strong>
      Residential Decor & Assembly Solutions<br/>
      Summerlin • Henderson • Las Vegas High-Rises<br/>
      📞 Direct Call/Text: <a href="tel:7027724116" style="color:#0284C7; font-weight:bold; text-decoration:none;">(702) 772-4116</a><br/>
      ✉️ Email: <a href="mailto:contact@vegastaskcraft.com" style="color:#0284C7; font-weight:bold; text-decoration:none;">contact@vegastaskcraft.com</a><br/>
      🌐 Web: <a href="https://vegastaskcraft.com" style="color:#0284C7; font-weight:bold; text-decoration:none;">www.vegastaskcraft.com</a>
    </div>
  </div>
</body>
</html>
`;
}

// Healthcheck Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), app: 'Vegas TaskCraft API' });
});

// GET: Retrieve all active bookings for website calendar & tech portal
app.get('/api/bookings', (req, res) => {
  activeBookings = loadBookings();
  return res.status(200).json({
    success: true,
    bookings: activeBookings
  });
});

// Zod Lead Validation Schema
const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().min(2),
  address: z.string().min(3),
  date: z.string().optional(),
  timeSlot: z.string().optional(),
  assignedTech: z.string().optional(),
  bookingType: z.string().optional(),
  totalAmount: z.number().optional(),
  itemizedLines: z.array(z.any()).optional(),
  notes: z.string().max(500).optional(),
});

// Endpoint: Capture Lead / Reservation
app.post('/api/lead', async (req, res) => {
  try {
    const validatedData = LeadSchema.parse(req.body);
    const bookingCode = req.body.bookingCode || ('VTC-' + Math.floor(100000 + Math.random() * 900000));
    const recipientEmail = validatedData.email || 'vegastaskcraft@gmail.com';

    const newBooking = {
      id: bookingCode,
      customer: validatedData.name,
      phone: validatedData.phone,
      email: recipientEmail,
      address: validatedData.address,
      service: validatedData.service,
      surface: 'Standard Wall Surface / Multi-Anchor',
      date: validatedData.date || 'August 31, 2026',
      time: validatedData.timeSlot || '11:30 AM - 01:30 PM',
      assignedTo: validatedData.assignedTech || (activeBookings.length % 2 === 0 ? 'Carlos Chavez' : 'Jonathan Rodriguez'),
      status: 'Confirmed',
      bookingType: validatedData.bookingType || 'Service Checkout',
      laborCost: validatedData.totalAmount || 150.00,
      hardwareCost: 0,
      total: validatedData.totalAmount || 150.00,
      itemizedLines: validatedData.itemizedLines || [
        { name: validatedData.service, unitPrice: validatedData.totalAmount || 150, qty: 1, subtotal: validatedData.totalAmount || 150 }
      ]
    };

    activeBookings.unshift(newBooking); // add at top
    saveBookings(activeBookings);

    console.log('📌 NUEVA RESERVA EN VIVO GUARDADA:', newBooking);

    // If SMTP_PASS is configured, send email directly via Hostinger SMTP from contact@vegastaskcraft.com
    if (process.env.SMTP_PASS) {
      smtpTransporter.sendMail({
        from: '"Vegas TaskCraft LLC" <contact@vegastaskcraft.com>',
        to: [recipientEmail, 'vegastaskcraft@gmail.com'],
        subject: `Appointment Confirmation - Vegas TaskCraft [${bookingCode}]`,
        html: generateHtmlConfirmation(newBooking)
      }).then(info => console.log('✅ Direct Hostinger SMTP Email sent:', info.messageId))
        .catch(err => console.error('Hostinger SMTP error:', err));
    }

    // Forward to n8n Webhook
    const n8nUrl = process.env.N8N_WEBHOOK_URL || 'https://n8nautofluxweb.autofluxai26.com/webhook/vegas-taskcraft-lead';
    fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking),
    })
    .then(r => console.log('n8n Webhook status:', r.status))
    .catch((err) => console.error('Error enviando a n8n:', err));

    return res.status(200).json({
      success: true,
      bookingCode,
      booking: newBooking,
      message: 'Reserva procesada exitosamente',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod Error:', error.errors);
      return res.status(400).json({ success: false, error: 'Datos no válidos', details: error.errors });
    }
    return res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🔒 Vegas TaskCraft Security API corriendo en puerto ${PORT}`);
});
