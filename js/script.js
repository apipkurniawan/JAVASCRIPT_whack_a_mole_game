/* vanilla javascript */

/* ambil element tanah */
const tanah = document.querySelectorAll('.tanah');
/* ambil element tikus */
const tikus = document.querySelectorAll('.tikus');
let tanahSebelumnya;


/* funct untuk menampilkan tikus */
function tampilkanTikus(tanah) {
    const t = randomTanah(tanah);
    tRandom.classList.add('muncul');
}

/* funct untuk mengambil bilangan random tanah */
function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length); /* bulatkan kebawah */
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}