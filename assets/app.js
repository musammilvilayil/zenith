if(document.querySelector('.student-home')&&!document.querySelector('link[href="/assets/student-projects.css"]')){const css=document.createElement('link');css.rel='stylesheet';css.href='/assets/student-projects.css';document.head.append(css)}

const WHATSAPP_NUMBER='919497665504';
const WHATSAPP_DISPLAY='+91 94976 65504';

document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{a.href=a.href.replace(/wa\.me\/\d+/,`wa.me/${WHATSAPP_NUMBER}`);if(/^\+91\s?62821/.test(a.textContent.trim()))a.textContent=WHATSAPP_DISPLAY});
document.querySelectorAll('body *').forEach(el=>{if(el.children.length===0&&el.textContent.includes('+91 62821 35504'))el.textContent=el.textContent.replace('+91 62821 35504',WHATSAPP_DISPLAY)});
const studentHome=document.querySelector('.student-home');if(studentHome){studentHome.querySelectorAll('p,a,strong').forEach(el=>{el.textContent=el.textContent.replace('100 curated','500 curated').replace('100 project ideas','500 project ideas');if(el.tagName==='STRONG'&&el.textContent.trim()==='100')el.textContent='500'})}

const menu=document.querySelector('.menu'),links=document.querySelector('.links');
if(menu)menu.onclick=()=>links.classList.toggle('open');
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links&&links.classList.remove('open')));

if(links&&!links.querySelector('a[href="/student-projects/"]')){const student=document.createElement('a');student.href='/student-projects/';student.textContent='Students';const work=links.querySelector('a[href="/work/"]');work?work.after(student):links.append(student)}
document.querySelectorAll('.footer h4').forEach(h=>{if(h.textContent.trim()==='Company'){const box=h.parentElement;if(!box.querySelector('a[href="/student-projects/"]')){const a=document.createElement('a');a.href='/student-projects/';a.textContent='Student projects';const work=box.querySelector('a[href="/work/"]');work?work.after(a):box.append(a)}}});

const form=document.querySelector('#enquiryForm');
if(form){
  const params=new URLSearchParams(location.search);
  const service=params.get('service'),project=params.get('project');
  if(service){const s=form.querySelector('[name=service]');if(s){[...s.options].forEach(o=>{if(o.value.toLowerCase()===service.toLowerCase()||o.textContent.toLowerCase()===service.toLowerCase())s.value=o.value})}}
  if(project){const m=form.querySelector('[name=message]');if(m&&!m.value)m.value=`I am interested in the student project idea: ${project}. Please share the detailed abstract, scope and implementation guidance.`}

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('button[type=submit]');
    const status=document.querySelector('#formStatus');
    const payload=Object.fromEntries(new FormData(form));
    payload.page=location.href;
    btn.disabled=true;btn.textContent='Sending…';status.textContent='Sending your project brief…';
    try{
      let delivered=false;
      try{
        const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        const result=await response.json().catch(()=>({}));
        delivered=response.ok&&result.delivered===true;
      }catch{}

      if(!delivered){
        const formSubmitPayload={...payload,_subject:`New Zenith website enquiry — ${payload.service||'General project'}`,_template:'table',_captcha:'false'};
        const fallback=await fetch('https://formsubmit.co/ajax/musammilvilayil@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(formSubmitPayload)});
        if(!fallback.ok)throw new Error('Email fallback failed');
      }

      status.textContent='Thank you. Your project brief was sent and an email notification has been triggered.';
      form.reset();
    }catch{
      const msg=encodeURIComponent(`Hello Zenith Softworks,\nName: ${payload.name||''}\nEmail: ${payload.email||''}\nPhone: ${payload.phone||''}\nProject: ${payload.service||''}\nBudget: ${payload.budget||''}\nTimeline: ${payload.timeline||''}\nDetails: ${payload.message||''}`);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,'_blank','noopener');
      status.textContent='Email delivery was unavailable, so WhatsApp was opened with your project brief.';
    }finally{btn.disabled=false;btn.textContent='Submit Project Brief'}
  });
}
