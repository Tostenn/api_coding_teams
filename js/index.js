// const mode = 'dev'; // Vous pouvez changer le mode
const url = `https://codingquote.vercel.app/api`;
const content = document.querySelector('.content')

const form = document.querySelector('form')
form.addEventListener('submit', e => e.preventDefault())

const select = [
    form.querySelector('select#mode'),
    form.querySelector('select#lgs')
]
// console.log(select);
/**
 * @returns @array
 */
function recu() {
    const option = {}

    for (const element of select) {
        if (element.value){
            option[element.getAttribute('name')] = element.value
        } 
    }
    return option
}
/**
 * 
 * @param {HTMLElement} element 
 * @param {string} content 
 */
function autoWrite(element,content) {
    let i = 0
    const t = setInterval(() => {
        element.innerHTML += content[i]
        i == (content.length - 1) ? clearInterval(t) : i++
    }, 30);
}
// autoWrite(content,'fgdb    err vggzgzg')
const generer = form.querySelector('button')
generer.onclick = ()=>{
    const agurment = recu()
    if (!agurment.mode){
        content.classList.add('alert')
        content.innerHTML = 'choisissez une méthode d\'abord'
        return
    } 
    content.classList.remove('alert')
    content.classList.remove('error')
    content.innerHTML = ''

    let urls = url + (agurment.lg ? '/' +agurment.lg : '' )
    urls +=  agurment.mode ? '?mode=' +agurment.mode : '' 
    console.log(urls);
    fetch(urls)
        .then(reponse => reponse.json())
        .then(data => {
                for (const [key,value] of Object.entries(data)) {
                    autoWrite(content, value)
                    break
                }
                content.previousElementSibling.querySelector('small').innerHTML = "\
                    <span>lg >> <i>"+(agurment.lg == 'en' ? 'En' : 'Fr')+"</i> </span>\
                    <span>mode >><i>"+agurment.mode+"</i></span>"
            })
        // .catch(() => {
        //     content.classList.add('error')
        //     content.innerHTML = 'une erreur est survenu verifier votre connection et réessayez'
        // });
        
}