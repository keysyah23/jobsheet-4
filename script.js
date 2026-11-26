// script.js — Buku Nilai Digital
// Fitur: Automatic Letter Grade Detector

const KKM = 75; // Kriteria Ketuntasan Minimal

const inputNama = document.getElementById('input-nama');
const inputSkor = document.getElementById('input-skor');
const btnEvaluasi = document.getElementById('btn-evaluasi');
const boxHasil = document.getElementById('box-hasil');

function evaluasiSkor(nama, skor) {
  // 1. Tentukan status kelulusan berdasarkan KKM
  let statusKelulusan;
  if (skor >= KKM) {
    statusKelulusan = 'LULUS (Tuntas)';
  } else {
    statusKelulusan = 'BELUM LULUS (Remedial)';
  }

  // 2. Automatic Letter Grade Detector — struktur if / else if / else bertingkat
  let labelGrade;
  if (skor >= 90) {
    labelGrade = '(Grade: A - Istimewa)';
  } else if (skor >= 80) {
    labelGrade = '(Grade: B - Baik)';
  } else if (skor >= 75) {
    labelGrade = '(Grade: C - Cukup)';
  } else {
    labelGrade = '(Grade: D - Kurang)';
  }

  return {
    nama: nama,
    status: statusKelulusan,
    grade: labelGrade,
    lulus: skor >= KKM
  };
}

function tampilkanHasil() {
  const nama = inputNama.value.trim();
  const nilai = inputSkor.value.trim();
  const skor = Number(nilai);

  // Validasi input
  if (nama === '') {
    boxHasil.className = 'box-hasil status-error';
    boxHasil.innerHTML = '<p class="status-line">Masukkan nama siswa terlebih dahulu.</p>';
    return;
  }
  if (nilai === '' || Number.isNaN(skor) || skor < 0 || skor > 100) {
    boxHasil.className = 'box-hasil status-error';
    boxHasil.innerHTML = '<p class="status-line">Masukkan skor yang valid (0–100).</p>';
    return;
  }

  const hasil = evaluasiSkor(nama, skor);

  boxHasil.className = 'box-hasil ' + (hasil.lulus ? 'status-lulus' : 'status-remedial');
  boxHasil.innerHTML = `
    <p class="status-line">${hasil.nama} — Skor ${skor}: ${hasil.status}</p>
    <p class="grade-line">${hasil.grade}</p>
  `;
}

btnEvaluasi.addEventListener('click', tampilkanHasil);

inputSkor.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tampilkanHasil();
});

inputNama.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tampilkanHasil();
});