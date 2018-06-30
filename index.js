document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

function showRepositories(data) {
  const repos = data.items
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("results").innerHTML = repoList
}

function searchRepositories(){
  $(document).ready(function(){
  searchTerms = document.getElementById("searchTerms").value;
  $.get('https://api.github.com/search/repositories?q='+searchTerms, function(response) {
    console.log(response.items)
    showRepositories(response)
  }).fail(function(error) {
    console.log('Response err: ' + error);
  });
});
  
  
  $.get('https://api.github.com/search/repositories?q='+searchTerms).done({
    
  })
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}