const menu=document.querySelector('.menu'),links=document.querySelector('.links');if(menu)menu.onclick=()=>links.classList.toggle('open');
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
const form=document.querySelector('#enquiryForm');if(form){form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('button[type=submit]');const status=document.querySelector('#formStatus');btn.disabled=true;btn.textContent='Sending…';try{const payload=Object.fromEntries(new FormData(form));const r=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!r.ok)throw Error();status.textContent='Thank you. Your project brief has been received.';form.reset()}catch{const d=Object.fromEntries(new FormData(form));const msg=encodeURIComponent(`Hello Zenith Softworks,
Name: ${d.name||''}
Email: ${d.email||''}
Project: ${d.service||''}
Budget: ${d.budget||''}
Timeline: ${d.timeline||''}
Details: ${d.message||''}`);window.open('https://wa.me/916282135504?text='+msg,'_blank');status.textContent='Opening WhatsApp so you can send the brief directly.'}finally{btn.disabled=false;btn.textContent='Submit Project Brief'}})}
