const btn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(btn&&nav){
  btn.addEventListener('click',()=>{
    const opened=nav.classList.toggle('open');
    btn.setAttribute('aria-expanded',String(opened));
  });
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
  }));
}