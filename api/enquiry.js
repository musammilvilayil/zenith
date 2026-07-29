const buckets=new Map();
const clean=value=>String(value??'').trim().slice(0,4000);
const escapeHtml=value=>clean(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});

  const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
  const now=Date.now();
  const recent=(buckets.get(ip)||[]).filter(time=>now-time<10*60*1000);
  if(recent.length>=5)return res.status(429).json({error:'Too many requests. Please try again later.'});
  recent.push(now);buckets.set(ip,recent);

  const body=req.body||{};
  if(body.website)return res.status(200).json({ok:true,delivered:true});

  const name=clean(body.name),email=clean(body.email),phone=clean(body.phone),company=clean(body.company);
  const service=clean(body.service),budget=clean(body.budget),timeline=clean(body.timeline),message=clean(body.message),page=clean(body.page);
  if(!name||!email||!message)return res.status(400).json({error:'Name, email and project details are required.'});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({error:'Please provide a valid email address.'});

  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey)return res.status(503).json({ok:false,delivered:false,code:'EMAIL_NOT_CONFIGURED'});

  const to=process.env.NOTIFY_EMAIL||'musammilvilayil@gmail.com';
  const from=process.env.FROM_EMAIL||'Zenith Website <onboarding@resend.dev>';
  const subject=`New Zenith enquiry — ${service||'General project'} — ${name}`;
  const html=`<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#17201e">
    <h1 style="font-size:24px">New Zenith Softworks enquiry</h1>
    <table style="width:100%;border-collapse:collapse">
      ${[['Name',name],['Email',email],['Phone',phone],['Company / Institution',company],['Project category',service],['Budget',budget],['Timeline',timeline],['Source page',page]].map(([label,value])=>`<tr><td style="padding:10px;border:1px solid #d7ddda;font-weight:700">${label}</td><td style="padding:10px;border:1px solid #d7ddda">${escapeHtml(value)||'—'}</td></tr>`).join('')}
    </table>
    <h2 style="font-size:18px;margin-top:24px">Project details</h2>
    <p style="white-space:pre-wrap;background:#f2f4f2;padding:16px">${escapeHtml(message)}</p>
    <p style="font-size:12px;color:#65706d">Received ${new Date().toISOString()} · IP ${escapeHtml(ip)}</p>
  </div>`;

  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:email,subject,html})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)return res.status(502).json({ok:false,delivered:false,error:'Email provider rejected the message',provider:result});
    return res.status(200).json({ok:true,delivered:true,id:result.id});
  }catch(error){
    return res.status(502).json({ok:false,delivered:false,error:'Email delivery failed'});
  }
}
