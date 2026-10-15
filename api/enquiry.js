// Vercel serverless endpoint. Configure RESEND_API_KEY, FROM_EMAIL and NOTIFY_EMAIL.
// Rate limiting is best-effort: serverless instances do not share memory.
const buckets = new Map();
const MAX_BODY = 16_000;
const SERVICES = new Set(['Business website','Website redesign','Growth website','E-commerce website','Web application','Mobile application','Startup MVP','Branding and UI/UX','AI and automation','IoT system','Website maintenance','Academic project guidance','Other','Join Zenith Talent']);
const clean = (value, length = 500) => String(value ?? '').trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, length);
const escapeHtml = value => clean(value, 4_000).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
const validPhone = value => /^[+()\d][+()\d\s-]{6,24}$/.test(value);
const validUrl = value => { if (!value) return true; try { const url = new URL(value); return /^https?:$/.test(url.protocol); } catch { return false; } };
function rateLimited(ip) { const now = Date.now(), recent = (buckets.get(ip) || []).filter(time => now - time < 10 * 60 * 1000); recent.push(now); buckets.set(ip, recent); return recent.length > 5; }
function validate(body) {
  const fields = { name:clean(body.name,100), email:clean(body.email,254).toLowerCase(), phone:clean(body.phone,30), company:clean(body.company,160), service:clean(body.service,80), budget:clean(body.budget,80), timeline:clean(body.timeline,80), source:clean(body.source,80), role:clean(body.role,100), portfolio:clean(body.portfolio,500), message:clean(body.message,4000), page:clean(body.page,500) };
  if (!fields.name || !fields.email || !fields.phone || !fields.message) return { error:'Please complete your name, email, phone number and details.' };
  if (!validEmail(fields.email)) return { error:'Please enter a valid email address.' };
  if (!validPhone(fields.phone)) return { error:'Please enter a valid phone number.' };
  if (fields.service && !SERVICES.has(fields.service)) return { error:'Please choose a valid service.' };
  if (!validUrl(fields.portfolio)) return { error:'Portfolio link must start with http:// or https://.' };
  if (fields.service === 'Join Zenith Talent' && (!fields.company || !fields.role)) return { error:'Please complete your current role and primary role.' };
  return { fields };
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({ error:'Use an application/json request.' });
  if (Number(req.headers['content-length'] || 0) > MAX_BODY) return res.status(413).json({ error:'Submission is too large.' });
  const origin = String(req.headers.origin || ''), allowed = (process.env.SITE_URL || 'https://zenithsoftworks.in').replace(/\/$/, '');
  if (origin && origin !== allowed && !origin.endsWith('.vercel.app')) return res.status(403).json({ error:'This submission origin is not allowed.' });
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  // Honeypot and a short completion threshold deter ordinary automated submissions.
  if (clean(body.website) || (body.form_started_at && (Date.now() - Number(body.form_started_at) < 1500 || Date.now() - Number(body.form_started_at) > 86_400_000))) return res.status(200).json({ ok:true });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return res.status(429).json({ error:'Too many submissions. Please wait a few minutes and try again.' });
  const checked = validate(body); if (checked.error) return res.status(400).json({ error:checked.error });
  const fields = checked.fields, isTalent = fields.service === 'Join Zenith Talent';
  const rows = isTalent ? [['Name',fields.name],['Email',fields.email],['Phone',fields.phone],['Current course / role',fields.company],['Primary role',fields.role],['Weekly availability',fields.budget],['Experience level',fields.timeline],['Portfolio / GitHub',fields.portfolio],['Source page',fields.page]] : [['Name',fields.name],['Email',fields.email],['Phone',fields.phone],['Business / organisation',fields.company],['Requested service',fields.service],['Budget',fields.budget],['Timeline',fields.timeline],['Found Zenith through',fields.source],['Source page',fields.page]];
  const html = `<div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;color:#17201e"><h1>${isTalent ? 'New Zenith Talent application' : 'New Zenith client enquiry'}</h1><table style="width:100%;border-collapse:collapse">${rows.map(([label,value]) => `<tr><td style="padding:10px;border:1px solid #d7ddda;font-weight:700;width:34%">${escapeHtml(label)}</td><td style="padding:10px;border:1px solid #d7ddda">${escapeHtml(value) || '—'}</td></tr>`).join('')}</table><h2>Details</h2><p style="white-space:pre-wrap;background:#f2f4f2;padding:16px">${escapeHtml(fields.message)}</p></div>`;
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.NOTIFY_EMAIL) return res.status(503).json({ error:'Email delivery is not configured. Please use WhatsApp instead.', code:'EMAIL_NOT_CONFIGURED' });
  try {
    const response = await fetch('https://api.resend.com/emails', { method:'POST', headers:{ Authorization:`Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type':'application/json' }, body:JSON.stringify({ from:process.env.FROM_EMAIL, to:[process.env.NOTIFY_EMAIL], reply_to:fields.email, subject:isTalent ? `Talent application — ${fields.role} — ${fields.name}` : `Client enquiry — ${fields.service || 'General'} — ${fields.name}`, html }) });
    if (!response.ok) { console.error('Email provider rejected a Zenith enquiry', response.status); return res.status(502).json({ error:'Email delivery could not be confirmed. Please use WhatsApp instead.' }); }
    return res.status(200).json({ ok:true, delivered:true });
  } catch { return res.status(502).json({ error:'Email delivery failed. Please use WhatsApp instead.' }); }
}
