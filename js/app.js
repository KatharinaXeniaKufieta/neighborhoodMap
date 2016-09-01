function openNav() {
  document.getElementById('sidenav').style.left = '0px';
  document.getElementById('map').style.left = '300px';
  document.getElementById('map').style.width = 'calc(100% - 300px)';
}

function closeNav() {
  document.getElementById('sidenav').style.left = '-300px';
  document.getElementById('map').style.left = '0px';
  document.getElementById('map').style.width = '100%';
}
