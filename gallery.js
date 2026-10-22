// Public slide galleries contain exported presentation pages, not project source.
async function initializeGalleries() {
  const response = await fetch('galleries.json', {cache:'no-cache'});
  if (!response.ok) throw new Error('Gallery data could not be loaded');
  const galleries = await response.json();
  const dialog = document.createElement('dialog');
  dialog.className = 'slide-dialog';
  dialog.innerHTML = '<div class="slide-dialog-bar"><span></span><button type="button" aria-label="关闭大图">关闭 ×</button></div><img alt="">';
  document.body.append(dialog);
  dialog.querySelector('button').onclick = () => dialog.close();
  dialog.onclick = event => { if (event.target === dialog) dialog.close(); };
  const states = [];
  for (const gallery of Object.values(galleries)) {
    const article = document.getElementById(gallery.project);
    if (!article) continue;
    let index = 0;
    let playing = false;
    let inView = false;
    const element = document.createElement('section');
    element.className = 'project-gallery';
    element.setAttribute('aria-roledescription', '轮播');
    element.setAttribute('aria-label', gallery.label + '精选页面');
    element.tabIndex = 0;
    element.innerHTML = `<div class="gallery-header"><span>项目图解</span><span class="gallery-count"></span></div>
      <button class="gallery-stage" type="button" aria-label="放大查看当前页面"><img loading="lazy" alt=""><span>放大查看 ↗</span></button>
      <div class="gallery-footer"><div class="gallery-title"></div><div class="gallery-controls"><button type="button" class="gallery-prev" aria-label="${gallery.label}上一页">←</button><button type="button" class="gallery-play">自动播放</button><button type="button" class="gallery-next" aria-label="${gallery.label}下一页">→</button></div></div>
      <div class="gallery-dots" role="group" aria-label="选择展示页面"></div>`;
    const image = element.querySelector('img');
    const title = element.querySelector('.gallery-title');
    const count = element.querySelector('.gallery-count');
    const dots = element.querySelector('.gallery-dots');
    const playButton = element.querySelector('.gallery-play');
    gallery.items.forEach((item, position) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(position + 1).padStart(2, '0');
      button.setAttribute('aria-label', item.title);
      button.title = item.title;
      button.onclick = () => { setPlaying(false); show(position); };
      dots.append(button);
    });
    function show(position) {
      index = (position + gallery.items.length) % gallery.items.length;
      const item = gallery.items[index];
      image.src = item.src;
      image.alt = gallery.label + '：' + item.title;
      title.textContent = item.title;
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(gallery.items.length).padStart(2, '0')}`;
      [...dots.children].forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    }
    function setPlaying(value) {
      playing = value;
      playButton.textContent = playing ? '暂停播放' : '自动播放';
      playButton.setAttribute('aria-pressed', String(playing));
    }
    element.querySelector('.gallery-prev').onclick = () => { setPlaying(false); show(index - 1); };
    element.querySelector('.gallery-next').onclick = () => { setPlaying(false); show(index + 1); };
    playButton.onclick = () => setPlaying(!playing);
    element.querySelector('.gallery-stage').onclick = () => {
      setPlaying(false);
      const item = gallery.items[index];
      dialog.querySelector('img').src = item.src;
      dialog.querySelector('img').alt = image.alt;
      dialog.querySelector('span').textContent = item.title;
      dialog.showModal();
    };
    element.onkeydown = event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); setPlaying(false); show(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    };
    let touchStart;
    element.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
    element.addEventListener('touchend', event => {
      const offset = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(offset) > 60) { setPlaying(false); show(index + (offset > 0 ? -1 : 1)); }
    }, {passive:true});
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, {threshold:0.35}).observe(element);
    states.push(() => { if (playing && inView && !document.hidden && !dialog.open) show(index + 1); });
    article.append(element);
    show(0); setPlaying(false);
  }
  setInterval(() => states.forEach(advance => advance()), 7000);
}
initializeGalleries().catch(error => { console.error(error); });
