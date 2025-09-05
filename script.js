const addPlayerBtn = document.getElementById("addPlayer");
const playersDiv = document.getElementById("players");
const gameBtns = document.getElementById("gameBtns");
const truthBtn = document.getElementById("truthBtn");
const dareBtn = document.getElementById("dareBtn");
const resultDiv = document.getElementById("result");

let players = [];

addPlayerBtn.addEventListener("click", () => {
  if (players.length >= 4) {
    alert("Maksimal 4 pemain!");
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

  if (players.length > 0) {
    gameBtns.style.display = "block";
    resultDiv.textContent = "👉 Pilih Truth atau Dare!";
  }
}

async function fetchAPI(url) {
  try {
    resultDiv.textContent = "⏳ Loading...";
    const res = await fetch(url);
    const data = await res.json();
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    resultDiv.textContent = `${randomPlayer}: ${data.result || "Gagal ambil data"}`;
  } catch (err) {
    resultDiv.textContent = "❌ Error ambil data!";
  }
}

truthBtn.addEventListener("click", () => {
  fetchAPI("https://api.sxtream.xyz/randomtext/truth");
});

dareBtn.addEventListener("click", () => {
  fetchAPI("https://api.sxtream.xyz/randomtext/dare");
});