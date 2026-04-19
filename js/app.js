/* ── Navbar scroll efekti ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobil menü ── */
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu   = document.getElementById('mobile-menu');
mobileToggle?.addEventListener('click', () => mobileMenu?.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    mobileMenu?.classList.remove('open');
  });
});

/* ── Fade-up animasyonu ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ── Hizmetler render ── */
async function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;
  const icons = {
    video: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    clinic: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>`,
    target: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9Zm0 4a5 5 0 1 0 0 10A5 5 0 0 0 12 7Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></svg>`
  };
  try {
    const res  = await fetch('./data/services.json');
    const data = await res.json();
    container.innerHTML = data.map(s => `
      <div class="fade-up bg-white rounded-2xl border border-[#DCE5D4] p-8 flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div class="w-14 h-14 rounded-2xl bg-[#DCE5D4] flex items-center justify-center text-[#6B8E5A] mb-6">
          ${icons[s.icon] || icons.target}
        </div>
        <h3 class="text-xl font-bold mb-3 text-[#1F2A1C]">${s.title}</h3>
        <p class="text-[#6B7566] text-sm leading-relaxed mb-5">${s.desc}</p>
        <ul class="space-y-2 mb-8 flex-1">
          ${s.includes.map(item => `
            <li class="flex items-start gap-2 text-sm text-[#374532]">
              <svg class="w-4 h-4 mt-0.5 text-[#6B8E5A] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              ${item}
            </li>`).join('')}
        </ul>
        <a href="#iletisim" class="mt-auto w-full text-center rounded-full border-2 border-[#6B8E5A] text-[#6B8E5A] font-semibold py-2.5 px-4 hover:bg-[#6B8E5A] hover:text-white transition-colors duration-200">
          ${s.cta}
        </a>
      </div>`).join('');
    container.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
  } catch (e) { console.error('Hizmetler yüklenemedi', e); }
}

/* ── Testimonials slider ── */
async function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;
  try {
    const res  = await fetch('./data/testimonials.json');
    const data = await res.json();
    track.innerHTML = data.map(t => `
      <div class="testimonial-slide flex-shrink-0 px-3">
        <div class="bg-white rounded-2xl border border-[#DCE5D4] p-7 h-full flex flex-col">
          <svg class="w-8 h-8 text-[#6B8E5A] mb-4 opacity-60" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/></svg>
          <p class="text-[#374532] leading-relaxed mb-6 flex-1 text-sm italic">${t.quote.replace(/<!--.*?-->/g, '').trim()}</p>
          <div>
            <p class="font-semibold text-[#1F2A1C] text-sm">${t.name}</p>
            <p class="text-[#6B7566] text-xs mt-0.5">${t.context}</p>
          </div>
        </div>
      </div>`).join('');

    const slides   = track.querySelectorAll('.testimonial-slide');
    const total    = slides.length;
    let current    = 0;
    let interval;
    const visibleCount = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    const goTo = (idx) => {
      const max = total - visibleCount();
      current = Math.max(0, Math.min(idx, max));
      track.style.transform = `translateX(-${current * (100 / visibleCount())}%)`;
      document.getElementById('prev-btn')?.classList.toggle('opacity-40', current === 0);
      document.getElementById('next-btn')?.classList.toggle('opacity-40', current >= max);
    };

    const startAuto = () => { interval = setInterval(() => goTo(current + 1 <= total - visibleCount() ? current + 1 : 0), 6000); };
    const stopAuto  = () => clearInterval(interval);

    document.getElementById('prev-btn')?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    document.getElementById('next-btn')?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    track.parentElement?.addEventListener('mouseenter', stopAuto);
    track.parentElement?.addEventListener('mouseleave', startAuto);

    goTo(0);
    startAuto();
  } catch (e) { console.error('Yorumlar yüklenemedi', e); }
}

/* ── Form submit ── */
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const msg = document.getElementById('form-msg');
  btn.disabled = true;
  btn.textContent = 'Gönderiliyor...';
  try {
    const res = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { Accept: 'application/json' } });
    if (res.ok) {
      msg.textContent = 'Mesajınız alındı, en kısa sürede dönüş yapacağım.';
      msg.className = 'mt-3 text-sm text-green-700';
      contactForm.reset();
    } else {
      throw new Error();
    }
  } catch {
    msg.textContent = 'Bir hata oluştu. Lütfen WhatsApp üzerinden ulaşın.';
    msg.className = 'mt-3 text-sm text-red-600';
  }
  btn.disabled = false;
  btn.textContent = 'Mesaj Gönder';
});

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderTestimonials();
});
