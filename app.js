const projects = [
  { title: 'Project 01', ball: 'Poké Ball', focus: 'A place for your first project.', description: 'Every adventure starts somewhere. This entry is ready for a project you want to share: what you built, why it matters, and what you learned along the way.' },
  { title: 'Project 02', ball: 'Great Ball', focus: 'A place for your next experiment.', description: 'A home for an idea you took a little further. Add the problem you explored, the decisions you made, and the details that make the finished work yours.' },
  { title: 'Project 03', ball: 'Ultra Ball', focus: 'A place for a bigger challenge.', description: 'Use this entry to unpack a project with a few more moving parts. Show the process, explain the tradeoffs, and give visitors a closer look at the result.' },
  { title: 'Project 04', ball: 'Master Ball', focus: 'A place for something special.', description: 'Save this spot for a project you are especially excited about. A useful tool, an unexpected experiment, or something that only you would think to make.' },
];

const dialog = document.querySelector('#entry-dialog');
const content = document.querySelector('#entry-content');
const counter = document.querySelector('#entry-counter');
const projectButtons = [...document.querySelectorAll('[data-project]')];
let currentProject = 0;
let lastTrigger;

function showDialog(trigger) {
  if (!dialog.open) { lastTrigger = trigger || document.activeElement; dialog.showModal(); }
  dialog.scrollTop = 0;
  document.querySelector('#close-dialog').focus({ preventScroll: true });
}

function openProject(index, trigger) {
  currentProject = (index + projects.length) % projects.length;
  const project = projects[currentProject];
  const number = String(currentProject + 1).padStart(2, '0');
  const orb = projectButtons[currentProject].querySelector('.orb').outerHTML;
  counter.textContent = `POKÉDEX / ENTRY ${number}`;
  content.innerHTML = `<article class="entry-body"><h2 id="entry-title">${project.title}</h2><p class="entry-description">${project.focus}</p><div class="entry-art">${orb}<div class="entry-art-copy">${project.ball}<span>PROJECT SLOT ${number} / 04</span></div></div><p class="entry-description">${project.description}</p><dl class="entry-meta"><div><dt>STATUS</dt><dd>Awaiting its adventure</dd></div><div><dt>TECHNOLOGIES</dt><dd>To be added</dd></div></dl><p class="placeholder-note">Placeholder entry. Real project details, images, and links are coming later.</p></article>`;
  document.querySelector('#dialog-navigation').hidden = false;
  document.querySelector('#project-position').textContent = `${number} / 04`;
  showDialog(trigger);
}

function openAbout(trigger) {
  counter.textContent = 'POKÉDEX / TRAINER PROFILE';
  content.innerHTML = `<article class="entry-body"><h2 class="about-name" id="entry-title">Kenneth<br>Romero Linares</h2><div class="entry-art about-art" aria-hidden="true">HELLO, WORLD!</div><p class="entry-description">Welcome to my little corner of the internet.</p><p class="about-note">This is a growing collection of projects, ideas, and experiments. Pick a Poké Ball to explore an entry, or give the Pokédex a little swing.</p><p class="placeholder-note">This portfolio is taking shape. A personal bio, résumé, and contact details will be added here.</p><button class="view-projects" id="about-projects">Explore the projects →</button></article>`;
  document.querySelector('#dialog-navigation').hidden = true;
  content.querySelector('#about-projects').addEventListener('click', () => openProject(0));
  showDialog(trigger);
}

projectButtons.forEach(button => button.addEventListener('click', () => openProject(Number(button.dataset.project), button)));
document.querySelector('[data-action="projects"]').addEventListener('click', event => openProject(0, event.currentTarget));
document.querySelector('[data-action="about"]').addEventListener('click', event => openAbout(event.currentTarget));
document.querySelector('#previous-project').addEventListener('click', () => openProject(currentProject - 1));
document.querySelector('#next-project').addEventListener('click', () => openProject(currentProject + 1));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close(); });
dialog.addEventListener('close', () => { if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true }); });

const dex = document.querySelector('#pokedex');
const anchor = document.querySelector('#pokedex-anchor');
const scene = document.querySelector('#lanyard-scene');
const strap = document.querySelector('#strap');
const stitch = document.querySelector('#strap-stitch');
const shadow = document.querySelector('.strap-shadow');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
let dragging = false;
let moved = false;
let origin = { x: 0, y: 0 };
let position = { x: 0, y: 0, angle: -8 };
let velocity = { x: 0, y: 0, angle: 0 };
let lastTime = 0;
let frame = 0;

function renderDex() {
  anchor.style.transform = `translate(${position.x}px,${position.y}px) rotate(${position.angle}deg)`;
  const x = 300 + position.x, y = 220 + position.y;
  const d = `M160 -80 Q${195 + position.x * .15} 80 ${x} ${y} Q${382 + position.x * .15} 60 455 -80`;
  [strap, stitch, shadow].forEach(path => path.setAttribute('d', d));
}

function tick(time) {
  const step = Math.min((time - (lastTime || time - 16)) / 16.667, 2);
  lastTime = time;
  if (!dragging) {
    for (const key of ['x', 'y', 'angle']) {
      const target = key === 'angle' ? -8 : 0;
      velocity[key] += (target - position[key]) * .022 * step;
      velocity[key] *= Math.pow(.925, step);
      position[key] += velocity[key] * step;
    }
  }
  renderDex();
  if (!dragging && (Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.angle + 8) + Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.angle) > .06)) frame = requestAnimationFrame(tick);
  else { frame = 0; lastTime = 0; }
}

function settle() {
  if (motionPaused) { position = { x: 0, y: 0, angle: -8 }; velocity = { x: 0, y: 0, angle: 0 }; renderDex(); return; }
  if (!frame) frame = requestAnimationFrame(tick);
}

dex.addEventListener('pointerdown', event => {
  if (event.button !== 0) return;
  dragging = true; moved = false;
  origin = { x: event.clientX, y: event.clientY, px: position.x, py: position.y };
  velocity = { x: 0, y: 0, angle: 0 };
  dex.setPointerCapture(event.pointerId);
});
dex.addEventListener('pointermove', event => {
  if (!dragging) return;
  const scale = scene.getBoundingClientRect().width / 600;
  const dx = (event.clientX - origin.x) / scale, dy = (event.clientY - origin.y) / scale;
  if (Math.hypot(dx, dy) > 6) moved = true;
  if (!moved) return;
  const x = Math.max(-125, Math.min(125, origin.px + dx));
  const y = Math.max(-45, Math.min(85, origin.py + dy));
  velocity.x = (x - position.x) * .4;
  velocity.y = (y - position.y) * .4;
  position = { x, y, angle: -8 - x * .12 };
  renderDex();
});
function release() { if (!dragging) return; dragging = false; settle(); }
dex.addEventListener('pointerup', release);
dex.addEventListener('pointercancel', () => { moved = true; release(); });
dex.addEventListener('lostpointercapture', release);
dex.addEventListener('click', event => { if (event.detail === 0 || !moved) openAbout(dex); moved = false; });

function updateMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  document.querySelector('#motion-toggle').setAttribute('aria-pressed', String(motionPaused));
  document.querySelector('#motion-label').textContent = motionPaused ? 'Resume motion' : 'Pause motion';
  if (motionPaused) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; settle(); }
}
document.querySelector('#motion-toggle').addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; updateMotion(); });
updateMotion();
renderDex();
