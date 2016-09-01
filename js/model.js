// These are locations shown to the user. Normally
// we'd have these in a database instead
var locations = [
  {
    title: 'Variety',
    query: 'Variety',
    position: {lat: 40.715407, lng: -73.944341},
    description: 'My fav coffee. Not sure I can live without it any more!',
    iconImage: 'img/icons/coffee.png',
    searchTerm: 'coffee',
    gif: 'http://i.giphy.com/YU0HoCQidyGEE.gif',
    id: 'ChIJwbb1LlFZwokR43Wu0vdntIY',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'Momo Sushi Shack',
    query: 'Momo+Sushi+Shack',
    position: {lat: 40.70512, lng: -73.933463},
    description: 'Best sushi ever. You will never look at sushi the same way again.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'sushi',
    gif: 'http://i.giphy.com/X2QBmjCQAHtle.gif',
    id: 'ChIJ34aX5gBcwokREbremOF3FIY',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'David Barton Gym',
    query: 'David+Barton+Gym',
    position: {lat: 40.741026, lng: -73.993689},
    description: 'A gym within a church! Working out has just gotten more spiritual and beautiful.',
    iconImage: 'img/icons/weightlifting.png',
    searchTerm: 'gym',
    gif: 'http://i.giphy.com/hlh2xvhZOfzji.gif',
    id: 'ChIJfVpqH7tZwokRj7_AISE81bQ',
    liked: false,
    owner: ['Kathi']
  }, {
    title: 'Cafe Mogador Williamsburg',
    query: 'Cafe+Mogador+Williamsburg',
    position: {lat: 40.719726, lng: -73.959983},
    description: 'My fav maroccan restaurant. Try the lamb tagine!',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'healthy+food',
    gif: 'http://i.giphy.com/l0O9yqyFbuxZoBifu.gif',
    id: 'ChIJN5X_gWdZwokRck9rk2guJ1M',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'Smorgasburg',
    query: 'Smorgasburg',
    position: {lat: 40.72102, lng: -73.962178},
    description: 'Amazing food in a flea market style flair.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'amazing+food',
    gif: 'http://i.giphy.com/3F3QVLy3w6OfC.gif',
    id: 'ChIJ9-C4sWdZwokRjDucHJ5DepI',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'BARC Shelter',
    query: 'BARC+Shelter',
    position: {lat: 40.716199, lng: -73.963794},
    description: 'You can go on walks with dogs here, or hang out with cats.',
    iconImage: 'img/icons/dog.png',
    searchTerm: 'puppy+cute',
    gif: 'http://i.giphy.com/eij3Aplt9hquI.gif',
    id: 'ChIJATsQiSO5QIYRHxyHdLT_FOQ',
    liked: false,
    owner: ['Kathi']
  }, {
    title: 'DUMBO Boulders',
    query: 'DUMBO+Boulders',
    position: {lat: 40.704272, lng: -73.989235},
    description: 'Outdoor bouldering.',
    iconImage: 'img/icons/climbing.png',
    searchTerm: 'climbing',
    gif: 'http://i.giphy.com/NotDYMTH9HUiI.gif',
    id: 'ChIJGw950zNawokRBX_7jOyaUH4',
    liked: false,
    owner: ['Kathi']
  }, {
    title: 'The Cliffs at LIC',
    query: 'The+Cliffs+at+LIC',
    position: {lat: 40.748649, lng: -73.948733},
    description: 'Awesome climbing gym.',
    iconImage: 'img/icons/climbing.png',
    searchTerm: 'climbing',
    gif: 'http://i.giphy.com/NotDYMTH9HUiI.gif',
    id: 'ChIJxe0RxCdZwokRK3vM_8IU7Vk',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'Champs',
    query: 'Champs',
    position: {lat: 40.70844, lng: -73.9409},
    description: 'My fav vegan diner.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'burger',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJg3HOgFdZwokRCpfl0k-McHg',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'John Brown Smokehouse',
    query: 'John+Brown+Smokehouse',
    position: {lat: 40.748871, lng: -73.950122},
    description: 'The Burnt Ends are amazing.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'meat+barbecue',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJfSp0FS1fwokR8PYGmnV6vYs',
    liked: false,
    owner: ['KJ']
  }, {
    title: 'Tørst',
    query: 'Torst',
    position: {lat: 40.723405, lng: -73.950758},
    description: 'Delicious!! beer but noisy on weekends.',
    iconImage: 'img/icons/beer.png',
    searchTerm: 'beer',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJd-13VURZwokR32Qz0s3y61A',
    liked: false,
    owner: ['KJ']
  }, {
    title: 'OKONOMI // YUJI Ramen',
    query: 'OKONOMI+//+YUJI+Ramen',
    position: {lat: 40.712538, lng: -73.948781},
    description: 'Traditional Japanese breakfast. Get here early.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'japanese+food',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJ2YwyMVhZwokRE47dTb7x1fo',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'Nitehawk Cinema',
    query: 'Nitehawk+Cinema',
    position: {lat: 40.715977, lng: -73.96254},
    description: 'Movie theater and restaurant! Get tickets and get here 30 minutes before movie.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'movies',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJMza4HWFZwokREyXlhbnRf5E',
    liked: false,
    owner: ['Kathi', 'KJ']
  }, {
    title: 'Falansai',
    query: 'Falansai',
    position: {lat: 40.706764, lng: -73.928765},
    description: 'Great vietnamese food. Get the dishes, skip their pho.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'vietnamese+food',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJc11gFQJcwokRcOejfRbBPpo',
    liked: false,
    owner: ['KJ']
  }, {
    title: 'Roberta\'s',
    query: 'Robertas',
    position: {lat: 40.705077, lng: -73.933592},
    description: 'Best, most exclusive pizza in Williamsburg. SO GOOD.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'pizza',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJ87Mc5wBcwokRAj4JNcwppaE',
    liked: false,
    owner: ['Kathi']
  }, {
    title: 'Gantry Plaza State Park',
    query: 'Gantry+Plaza+State+Park',
    position: {lat: 40.74549, lng: -73.958697},
    description: 'Love this park, wish I could live closeby!',
    iconImage: 'img/icons/forest.png',
    searchTerm: 'park',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJ6ztPaSJZwokRJqv7TPowwxA',
    liked: false,
    owner: ['Kathi']
  }, {
    title: 'Lower East Side Tenement Museum',
    query: 'Lower+East+Side+Tenement+Museum',
    position: {lat: 40.718796, lng: -73.99007},
    description: 'Here you can learn about life in NYC in the early 20th century. My favorite museum in the city.',
    iconImage: 'img/icons/forest.png',
    searchTerm: 'old+house',
    gif: 'http://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJ20bVJYdZwokRhI7esP3mYM0',
    liked: false,
    owner: ['Kathi']
  }
];
