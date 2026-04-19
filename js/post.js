async function loadPost() {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const container = document.getElementById('post-content');
  const metaEl    = document.getElementById('post-meta');

  if (!slug || !container) { window.location.href = 'blog.html'; return; }

  try {
    const [mdRes, metaRes] = await Promise.all([
      fetch(`posts/${slug}.md`),
      fetch('data/posts.json')
    ]);

    if (!mdRes.ok) { window.location.href = '404.html'; return; }

    const mdText = await mdRes.text();
    const posts  = await metaRes.json();
    const meta   = posts.find(p => p.slug === slug);

    if (meta) {
      document.title = `${meta.title} — Dyt. Ayşen Yetim`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', meta.excerpt);

      const d = new Date(meta.date);
      const dateStr = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

      metaEl.innerHTML = `
        <div class="mb-4">
          <span class="inline-block text-xs font-semibold uppercase tracking-wider text-[#6B8E5A] bg-[#DCE5D4] rounded-full px-3 py-1">${meta.category}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-[#1F2A1C] leading-tight mb-4">${meta.title}</h1>
        <div class="flex items-center gap-4 text-sm text-[#6B7566] mb-8">
          <span>${dateStr}</span>
          <span>·</span>
          <span>${meta.readMin} dk okuma</span>
        </div>
        ${meta.cover ? `<img src="${meta.cover}" alt="${meta.title}" class="w-full rounded-2xl mb-10 max-h-96 object-cover">` : ''}
      `;
    }

    container.innerHTML = marked.parse(mdText);

  } catch (err) {
    container.innerHTML = '<p class="text-[#6B7566]">İçerik yüklenirken bir hata oluştu.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadPost);
