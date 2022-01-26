const timeline = [
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "midudev",
    message: "Este es mi Adrit, ¡Wow, Twintter está funcionando y vivo 🕊!",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/lego/8.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "midudev",
    message: "Este es mi Adrit, ¡Wow, Twintter está funcionando y vivo 🕊!",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/lego/8.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "midudev",
    message: "Este es mi Adrit, ¡Wow, Twintter está funcionando y vivo 🕊!",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/lego/8.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "midudev",
    message: "Este es mi Adrit, ¡Wow, Twintter está funcionando y vivo 🕊!",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/lego/8.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
]

export default (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(timeline))
}
