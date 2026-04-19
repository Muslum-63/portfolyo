async function renderBlogList() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  try {
    const res   = await fetch('./data/posts.json');
    const posts = await res.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = posts.map(p => {
      const d = new Date(p.date);
      const dateStr = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
      return `
        <a href="post.html?slug=${p.slug}" class="fade-up group block bg-white rounded-2xl border border-[#DCE5D4] overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="aspect-video overflow-hidden">
            <img src="${p.cover}" alt="${p.title}" loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-6">
            <span class="inline-block text-xs font-semibold uppercase tracking-wider text-[#6B8E5A] bg-[#DCE5D4] rounded-full px-3 py-1 mb-3">${p.category}</span>
            <h2 class="text-lg font-bold text-[#1F2A1C] leading-snug mb-2 group-hover:text-[#6B8E5A] transition-colors">${p.title}</h2>
            <p class="text-sm text-[#6B7566] leading-relaxed mb-4">${p.excerpt}</p>
            <div class="flex items-center gap-3 text-xs text-[#6B7566]">
              <span>${dateStr}</span>
              <span>·</span>
              <span>${p.readMin} dk okuma</span>
            </div>
          </div>
        </a>`;
    }).join('');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  } catch (err) {
    grid.innerHTML = '<p class="col-span-3 text-center text-[#6B7566] py-12">Yazılar yüklenemedi.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderBlogList);
