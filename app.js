// =============================================
//  BEM Activity Management System — app.js
// =============================================

// NAVIGATION
const titles = {
  dashboard: 'Dashboard Mingguan',
  agenda: 'Agenda Rapat',
  monitoring: 'Monitoring Proker',
  program: 'Program Kerja',
  laporan: 'Laporan & LPJ'
};

function go(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('pageTitle').textContent = titles[page];
  if (btn) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
  }
}

// MODALS
function openModal(id) {
  document.getElementById('modal-' + id).classList.add('open');
}

function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.overlay').forEach(ov => {
    ov.addEventListener('click', e => {
      if (e.target === ov) ov.classList.remove('open');
    });
  });
});

// SAVE RAPAT
function saveRapat() {
  const judul = document.getElementById('f-judul').value || 'Agenda Rapat Baru';
  const tgl   = document.getElementById('f-tgl').value;
  const jam   = document.getElementById('f-jam').value;
  const pic   = document.getElementById('f-pic').value;
  const lok   = document.getElementById('f-lok').value || '—';

  const d = new Date(tgl);
  const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const fmtDate = `${String(d.getDate()).padStart(2,'0')} ${bulan[d.getMonth()]} ${d.getFullYear()}`;

  const uid   = 'r' + Date.now();
  const btnId = 'b' + Date.now();

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${fmtDate}</td>
    <td><div class="td-name">${judul}</div></td>
    <td>${pic}</td>
    <td>${lok}</td>
    <td>${jam} WIB</td>
    <td><span class="badge b-blue" id="${uid}">Terjadwal</span></td>
    <td><button class="btn btn-primary btn-sm" id="${btnId}"
        onclick="selesaikanRapat('${uid}','${btnId}')">Selesaikan</button></td>
  `;
  document.getElementById('agendaBody').appendChild(tr);

  closeModal('rapat');
  showToast(`Agenda "${judul}" berhasil ditambahkan!`);

  document.getElementById('f-judul').value  = '';
  document.getElementById('f-lok').value    = '';
  document.getElementById('f-notes').value  = '';
}

// SELESAIKAN RAPAT
function selesaikanRapat(badgeId, btnId) {
  const badge = document.getElementById(badgeId);
  badge.className = 'badge b-green';
  badge.textContent = '';
  const dot = document.createElement('span');
  dot.style.cssText = 'display:inline-block;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65;margin-right:4px;vertical-align:middle';
  badge.appendChild(dot);
  badge.appendChild(document.createTextNode('Selesai'));

  const btn = document.getElementById(btnId);
  btn.className  = 'btn btn-outline btn-sm';
  btn.textContent = 'Lihat';
  btn.onclick    = () => showToast('Status sudah final');

  showToast('Rapat berhasil diselesaikan!');
}

function saveProker() {
  closeModal('proker');
  showToast('Program kerja berhasil ditambahkan!');
}

// TOAST
let _toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// TABS
function switchTab(btn, tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-lpj').style.display = tab === 'lpj' ? '' : 'none';
  document.getElementById('tab-dok').style.display = tab === 'dok' ? '' : 'none';
}
