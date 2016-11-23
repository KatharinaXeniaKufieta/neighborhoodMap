// These are locations shown to the user. Normally
// we'd have these in a database instead
var locations = [
  {
    title: 'Variety',
    query: 'Variety',
    tags: 'coffee, muffins',
    position: {lat: 40.715407, lng: -73.944341},
    description: 'My fav coffee. Not sure I can live without it any more!',
    iconImage: 'img/icons/coffee.png',
    searchTerm: 'coffee',
    gif: 'https://i.giphy.com/YU0HoCQidyGEE.gif',
    id: 'ChIJwbb1LlFZwokR43Wu0vdntIY',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'Momo Sushi Shack',
    query: 'Momo+Sushi+Shack',
    tags: 'sushi',
    position: {lat: 40.70512, lng: -73.933463},
    description: 'Best sushi ever. You will never look at sushi the same way again.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'sushi',
    gif: 'https://i.giphy.com/X2QBmjCQAHtle.gif',
    id: 'ChIJ34aX5gBcwokREbremOF3FIY',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'David Barton Gym',
    query: 'David+Barton+Gym',
    tags: 'gym, church',
    position: {lat: 40.741026, lng: -73.993689},
    description: 'A gym within a church! Working out has just gotten more spiritual and beautiful.',
    iconImage: 'img/icons/weightlifting.png',
    searchTerm: 'gym',
    gif: 'https://i.giphy.com/hlh2xvhZOfzji.gif',
    id: 'ChIJfVpqH7tZwokRj7_AISE81bQ',
    liked: false,
    owner: 'Kathi'
  }, {
    title: 'Cafe Mogador Williamsburg',
    query: 'Cafe+Mogador+Williamsburg',
    tags: 'food, maroccan',
    position: {lat: 40.719726, lng: -73.959983},
    description: 'My fav maroccan restaurant. Try the lamb tagine!',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'healthy+food',
    gif: 'https://i.giphy.com/l0O9yqyFbuxZoBifu.gif',
    id: 'ChIJN5X_gWdZwokRck9rk2guJ1M',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'Smorgasburg',
    query: 'Smorgasburg',
    tags: 'food, coffee',
    position: {lat: 40.72102, lng: -73.962178},
    description: 'Amazing food in a flea market style flair.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'amazing+food',
    gif: 'https://i.giphy.com/3F3QVLy3w6OfC.gif',
    id: 'ChIJ9-C4sWdZwokRjDucHJ5DepI',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'BARC Shelter',
    query: 'BARC+Shelter',
    tags: 'dogs, cats, pets, shelter',
    position: {lat: 40.716199, lng: -73.963794},
    description: 'You can go on walks with dogs here, or hang out with cats.',
    iconImage: 'img/icons/dog.png',
    searchTerm: 'puppy+cute',
    gif: 'https://i.giphy.com/eij3Aplt9hquI.gif',
    id: 'ChIJATsQiSO5QIYRHxyHdLT_FOQ',
    liked: false,
    owner: 'Kathi'
  }, {
    title: 'DUMBO Boulders',
    query: 'DUMBO+Boulders',
    tags: 'climbing',
    position: {lat: 40.704272, lng: -73.989235},
    description: 'Outdoor bouldering.',
    iconImage: 'img/icons/climbing.png',
    searchTerm: 'climbing',
    gif: 'https://i.giphy.com/NotDYMTH9HUiI.gif',
    id: 'ChIJGw950zNawokRBX_7jOyaUH4',
    liked: false,
    owner: 'Kathi'
  }, {
    title: 'The Cliffs at LIC',
    query: 'The+Cliffs+at+LIC',
    tags: 'climbing',
    position: {lat: 40.748649, lng: -73.948733},
    description: 'Awesome climbing gym.',
    iconImage: 'img/icons/climbing.png',
    searchTerm: 'climbing',
    gif: 'https://i.giphy.com/NotDYMTH9HUiI.gif',
    id: 'ChIJxe0RxCdZwokRK3vM_8IU7Vk',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'Champs',
    query: 'Champs',
    tags: 'food, vegan, vegetarian, american, diner, coffee',
    position: {lat: 40.70844, lng: -73.9409},
    description: 'My fav vegan diner.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'burger',
    gif: 'https://i.giphy.com/jKaFXbKyZFja0.gif',
    id: 'ChIJg3HOgFdZwokRCpfl0k-McHg',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'John Brown Smokehouse',
    query: 'John+Brown+Smokehouse',
    tags: 'meat, barbecue, BBQ, beer',
    position: {lat: 40.748871, lng: -73.950122},
    description: 'The Burnt Ends are amazing.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'meat+barbecue',
    gif: 'https://i.giphy.com/3o7ZeESgACwwfmWXPa.gif',
    id: 'ChIJfSp0FS1fwokR8PYGmnV6vYs',
    liked: false,
    owner: 'KJ'
  }, {
    title: 'Tørst',
    query: 'Torst',
    tags: 'beer',
    position: {lat: 40.723405, lng: -73.950758},
    description: 'Delicious!! beer but noisy on weekends.',
    iconImage: 'img/icons/beer.png',
    searchTerm: 'beer',
    gif: 'https://i.giphy.com/YPBvdXHxANHHi.gif',
    id: 'ChIJd-13VURZwokR32Qz0s3y61A',
    liked: false,
    owner: 'KJ'
  }, {
    title: 'OKONOMI // YUJI Ramen',
    query: 'OKONOMI+//+YUJI+Ramen',
    tags: 'japanese, breakfast',
    position: {lat: 40.712538, lng: -73.948781},
    description: 'Traditional Japanese breakfast. Get here early.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'japanese+food',
    gif: 'https://i.giphy.com/Xh2NX0GGpSDWU.gif',
    id: 'ChIJ2YwyMVhZwokRE47dTb7x1fo',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'Nitehawk Cinema',
    query: 'Nitehawk+Cinema',
    tags: 'movies, food',
    position: {lat: 40.715977, lng: -73.96254},
    description: 'Movie theater and restaurant! Get tickets and get here 30 minutes before movie.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'theater+movies',
    gif: 'https://i.giphy.com/egg7yrA1IrgD6.gif',
    id: 'ChIJMza4HWFZwokREyXlhbnRf5E',
    liked: false,
    owner: 'Kathi, KJ'
  }, {
    title: 'Falansai',
    query: 'Falansai',
    tags: 'vietnamese, food',
    position: {lat: 40.706764, lng: -73.928765},
    description: 'Great vietnamese food. Get the dishes, skip their pho.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'vietnamese+food',
    gif: 'https://i.giphy.com/KPhMdE9q0HO6s.gif',
    id: 'ChIJc11gFQJcwokRcOejfRbBPpo',
    liked: false,
    owner: 'KJ'
  }, {
    title: 'Roberta\'s',
    query: 'Robertas',
    tags: 'pizza, food',
    position: {lat: 40.705077, lng: -73.933592},
    description: 'Best, most exclusive pizza in Williamsburg. SO GOOD.',
    iconImage: 'img/icons/noodles.png',
    searchTerm: 'pizza',
    gif: 'https://i.giphy.com/BPofSmBGnwJIQ.gif',
    id: 'ChIJ87Mc5wBcwokRAj4JNcwppaE',
    liked: false,
    owner: 'Kathi'
  }, {
    title: 'Gantry Plaza State Park',
    query: 'Gantry+Plaza+State+Park',
    tags: 'park, view',
    position: {lat: 40.74549, lng: -73.958697},
    description: 'Love this park, wish I could live closeby!',
    iconImage: 'img/icons/forest.png',
    searchTerm: 'nature+tree',
    gif: 'https://i.giphy.com/OQxmEv6imvBdu.gif',
    id: 'ChIJ6ztPaSJZwokRJqv7TPowwxA',
    liked: false,
    owner: 'Kathi'
  }, {
    title: 'Lower East Side Tenement Museum',
    query: 'Lower+East+Side+Tenement+Museum',
    tags: 'museum',
    position: {lat: 40.718796, lng: -73.99007},
    description: 'Here you can learn about life in NYC in the early 20th century. My favorite museum in the city.',
    iconImage: 'img/icons/museum.png',
    searchTerm: 'museum+nyc',
    gif: 'https://i.giphy.com/l41YkDA3c3j2zJJLy.gif',
    id: 'ChIJ20bVJYdZwokRhI7esP3mYM0',
    liked: false,
    owner: 'Kathi'
  }, {
    title: 'Strand Bookstore',
    query: 'Strand+Bookstore',
    tags: 'books, shopping',
    position: {lat: 40.733228, lng: -73.990716},
    description: 'Really big and charming bookstore',
    iconImage: 'img/icons/museum.png',
    searchTerm: 'books+bookstore+shopping',
    gif: 'https://i.giphy.com/2JS3lrvRhyIrC.gif',
    id: 'ChIJnSKGEJlZwokRaeEH1kdd348',
    liked: false,
    owner: 'KJ'
  }, {
    title: 'Brooklyn Bridge Park',
    query: 'Brooklyn+Bridge+Park',
    tags: 'park, view',
    position: {lat: 40.700291, lng: -73.996699},
    description: 'Walk across the Brooklyn Bridge from Manhattan and end up here',
    iconImage: 'img/icons/forest.png',
    searchTerm: 'nature+skyline+brooklyn+bridge',
    gif: 'http://i.giphy.com/PmEQpCs0xSpC8.gif',
    id: 'ChIJjaFpo0ZawokRBcOFUZ13CaE',
    liked: false,
    owner: 'KJ'
  }, {
    title: 'Washington Square Park',
    query: 'Washington+Square+Park',
    tags: 'park, manhattan, architecture',
    position: {lat: 40.730823, lng: -73.997332},
    description: 'Really nice and lively park in a nice area of the city',
    iconImage: 'img/icons/forest.png',
    searchTerm: 'park+city+manhattan',
    gif: 'http://i.giphy.com/77yNkpKptFZrq.gif',
    id: 'ChIJjX494pBZwokRGH620d9eYfo',
    liked: false,
    owner: 'KJ'
  }, {
    title: 'New York Public Library 5th Ave',
    query: 'New+York+Public+Library',
    tags: 'books, museum, architecture',
    position: {lat: 40.753182, lng: -73.982253},
    description: 'Gorgeous library, and it\'s next to the nice Bryant Park.',
    iconImage: 'img/icons/museum.png',
    searchTerm: 'books+museum+manhattan',
    gif: 'http://i.giphy.com/3o6ozkeXSb0Cm25CzS.gif',
    id: 'ChIJqaiomQBZwokRTHOaUG7fUTs',
    liked: false,
    owner: 'KJ'
  }
];
