/* vanilla javascript */

/* ambil element */
const tanah = document.querySelectorAll('.tanah');
const waktu = document.getElementById('waktu');
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
    let wkt = Number(waktu.value) * 60000;
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculkanTikus();
    setTimeout(() => {
        selesai = true;
    }, wkt);
}
/* function untuk mukul tikus */
function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul'); /* hilangkan class muncul */
    pop.play();
    papanSkor.textContent = skor; /* ubah skor di papan skor */
}
/* untuk auto sembunyi */
tikus.forEach(t => {
    t.addEventListener('click', pukul);
});

/* funct untuk validasi number */
function validate(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}