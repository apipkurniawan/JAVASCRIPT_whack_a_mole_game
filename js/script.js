/* vanilla javascript */

/* ambil element tanah */
const tanah = document.querySelectorAll('.tanah');
/* ambil element tikus */
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;


/* funct untuk mengambil bilangan random tanah */
function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}
/* funct untuk mengambil bilangan random waktu */
function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
/* funct untuk menampilkan tikus */
function munculkanTikus() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300, 1000);
    tRandom.classList.add('muncul');

    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTikus();
        }
    }, wRandom);
}
/* funct untuk button */
function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculkanTikus();
    setTimeout(() => {
        selesai = true;
    }, 10000);
}
/* function untuk mukul tikus */
function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul'); /* hilangkan class muncul */
    pop.play();
    papanSkor.textContent = skor; /* ubah skor di papan skor */
}

tikus.forEach(t => {
    t.addEventListener('click', pukul);
});