const addPlayerBtn = document.getElementById("addPlayer");
const playersDiv = document.getElementById("players");
const randomBtn = document.getElementById("randomBtn");
const truthBtn = document.getElementById("truthBtn");
const dareBtn = document.getElementById("dareBtn");
const resultDiv = document.getElementById("result");

let players = [];
let selectedPlayer = null;
let hasAnswered = false; // status apakah pemain sudah pilih truth/dare

addPlayerBtn.addEventListener("click", () => {
  if (players.length >= 5) {
    alert("Maksimal 5 pemain!");
    return;
  }
  const name = prompt("Masukkan nama pemain:");
  if (name) {
    players.push(name);
    renderPlayers();
  }
});

function renderPlayers() {
  playersDiv.innerHTML = "";
  players.forEach((p) => {
    const div = document.createElement("div");
    div.className = "player";
    div.textContent = p;
    playersDiv.appendChild(div);
  });

  if (players.length >= 2) {
    randomBtn.style.display = "inline-block";
    resultDiv.textContent = "👉 Klik Acak Pemain untuk memulai!";
  } else {
    randomBtn.style.display = "none";
    truthBtn.style.display = "none";
    dareBtn.style.display = "none";
    resultDiv.textContent = "⚠️ Minimal 2 pemain untuk memulai!";
  }
}

randomBtn.addEventListener("click", () => {
  selectedPlayer = players[Math.floor(Math.random() * players.length)];
  hasAnswered = false; // reset status
  resultDiv.innerHTML = `🎯 Pemain terpilih: <b>${selectedPlayer}</b>`;
  truthBtn.style.display = "inline-block";
  dareBtn.style.display = "inline-block";
});

async function fetchAPI(url, type) {
  if (!selectedPlayer) {
    resultDiv.textContent = "⚠️ Acak pemain dulu!";
    return;
  }
  if (hasAnswered) {
    resultDiv.textContent = "⚠️ Silakan acak pemain dulu!";
    return;
  }
  try {
    resultDiv.textContent = "⏳ Loading...";
    const res = await fetch(url);
    const data = await res.json();
    resultDiv.innerHTML = `<b>${selectedPlayer}</b> (${type}): ${data.data || "Gagal ambil data"}`;
    hasAnswered = true; // pemain sudah pilih truth/dare
  } catch (err) {
    resultDiv.textContent = "❌ Error ambil data!";
  }
}

truthBtn.addEventListener("click", () => {
  fetchAPI("https://api.sxtream.xyz/randomtext/truth", "Truth");
});

dareBtn.addEventListener("click", () => {
  fetchAPI("https://api.sxtream.xyz/randomtext/dare", "Dare");
});