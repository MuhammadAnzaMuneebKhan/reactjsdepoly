/** @format */

let url = 'https://api.github.com/users';
const main = document.querySelector('#main');
const searchBox = document.querySelector('#search');
const getUsers = async (username) => {
  const response = await fetch(`${url}/${username}`);
  const data = await response.json();
  console.log(data);
  const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                  
                </div>
            </div>
        </div>
    `;
  main.innerHTML = card;
  getRepos(username);
};
getUsers('dcramer');
const getRepos = async (getUserNames) => {
  const repos = document.querySelector('#repos');
  const response = await fetch(`${url}/${getUserNames}/repos`);
  const data2 = await response.json();
  data2.forEach((item) => {
    const elem = document.createElement('a');
    elem.classList.add('repo');
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = '_blank';
    repos.appendChild(elem);
  });
};
const formSubmit = () => {
  if (searchBox.value != '') {
    getUsers(searchBox.value);
    searchBox.value = '';
  }
  return false;
};
searchBox.addEventListener('focusout', () => {
  formSubmit();
});
