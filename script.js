// Change this to your GitHub username
const username = "Miaritiana";

async function fetchGitHubProfile() {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) return;
  const data = await res.json();
  document.getElementById('avatar').src = data.avatar_url;
  document.getElementById('name').textContent = data.name || data.login;
  document.getElementById('bio').textContent = data.bio || "";
  document.getElementById('github-link').href = data.html_url;
}

async function fetchGitHubRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
  if (!res.ok) return;
  const repos = await res.json();
  const reposList = document.getElementById('repos-list');

  reposList.innerHTML = "";
  repos.forEach(repo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <p>${repo.description || ""}</p>
      <small>⭐ ${repo.stargazers_count} | Forks: ${repo.forks_count}</small>
    `;
    reposList.appendChild(li);
  });
}

fetchGitHubProfile();
fetchGitHubRepos();