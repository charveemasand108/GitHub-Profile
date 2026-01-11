const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username)
    createUserCard(data)
    getRepos(username)
  } catch (err) {
    main.innerHTML = '<h2>User not found</h2>'
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(`${APIURL}${username}/repos?sort=created`)
    addReposToCard(data.slice(0, 5))
  } catch (err) {
    console.log(err)
  }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />

      <div class="user-info">
        <h2>${user.name || user.login}</h2>
        <p>${user.bio || 'No bio available'}</p>

        <ul>
          <li><span>${user.followers}</span> Followers</li>
          <li><span>${user.following}</span> Following</li>
          <li><span>${user.public_repos}</span> Repos</li>
        </ul>

        <div id="repos"></div>
      </div>
    </div>
  `

  main.innerHTML = cardHTML
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos')

  repos.forEach(repo => {
    const repoEl = document.createElement('a')
    repoEl.classList.add('repo')
    repoEl.href = repo.html_url
    repoEl.target = '_blank'
    repoEl.innerText = repo.name

    reposEl.appendChild(repoEl)
  })
}

form.addEventListener('submit', e => {
  e.preventDefault()

  const user = search.value.trim()

  if (user) {
    getUser(user)
    search.value = ''
  }
})
