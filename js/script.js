/* vanilla javascript */

/* ambil element berdasarkan class (banyak) */
const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
/* ambil element berdasarkan id (banyak) */
const level = document.querySelectorAll('#levels');
/* ambil element berdasarkan id (satu) */
let modal = document.getElementById("myModal");
const pop = document.querySelector('#pop');
/* ambil element berdasarkan class (satu) */
const papanSkor = document.querySelector('.papan-skor');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


let tanahSebelumnya;
let selesai;
let skor;
let wRandom;
let seconds;
let timer;

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
    tRandom.classList.add('muncul');

    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTikus();
        }
    }, wRandom);
}
/* funct untuk get lavel */
function getLevel() {
    for (let i = 0; i < level.length; i++) {
        const element = level[i].checked;
        if (element) {
            if (level[i].value == '1') { // mudah
                wRandom = randomWaktu(900, 2000);
            } else if (level[i].value == '2') { // sedang
                wRandom = randomWaktu(800, 1500);
            } else if (level[i].value == '1') { // sulit
                wRandom = randomWaktu(500, 1000);
            }
        }
    }
}
/* funct untuk button */
function mulai() {
    getLevel();
    seconds = 1000 * 60; // set 1 menit
    countDown();
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculkanTikus();
    setTimeout(() => {
        selesai = true;
    }, 59998);
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

/* funct untuk countDown timer */
function countDown() {
    if (seconds == 60000) {
        timer = setInterval(countDown, 1000)
    }
    seconds -= 1000;
    document.querySelector(".timer").innerHTML = '00:' + seconds / 1000 + ' ';
    if (seconds <= 0) {
        clearInterval(timer);
        modal.style.display = "block";
        document.querySelector(".timer").innerHTML = "00:00";
    }
}