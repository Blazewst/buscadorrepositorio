const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const languageSelect = document.getElementById("language");
const statusMsg = document.getElementById("status");
const repoCard = document.getElementById("repoCard");

let currentLanguage = "";

function setStatus(message, type = "") {
  statusMsg.textContent = message;
  statusMsg.className = `status-message ${type}`;
  repoCard.classList.add("hidden");
  refreshBtn.classList.add("hidden");
}

function showRepo(repo) {
  repoCard.innerHTML = `
    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    <p>${repo.description || "No description"}</p>
    <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🧑‍💻 ${repo.language || "Unknown"}</p>
  `;
  repoCard.classList.remove("hidden");
  refreshBtn.classList.remove("hidden");
}

async function fetchRandomRepo(language) {
  setStatus("Loading, please wait..", "loading");
  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=30`);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const repo = data.items[Math.floor(Math.random() * data.items.length)];
      setStatus(""); // Clear status
      showRepo(repo);
    } else {
      setStatus("No repositories found", "error");
    }
  } catch (err) {
    setStatus("Error fetching repositories", "error");
    refreshBtn.textContent = "Click to retry";
  }
}

searchBtn.addEventListener("click", () => {
  const language = languageSelect.value;
  if (!language) {
    setStatus("Please select a language");
    return;
  }
  currentLanguage = language;
  fetchRandomRepo(language);
});

refreshBtn.addEventListener("click", () => {
  if (currentLanguage) {
    fetchRandomRepo(currentLanguage);
  }
const toggleThemeBtn = document.getElementById('toggle-theme');
let isDarkMode = true;

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  isDarkMode = !isDarkMode;

  toggleThemeBtn.textContent = isDarkMode ? '🌙 Tema Oscuro' : '☀️ Tema Claro';
});


});
