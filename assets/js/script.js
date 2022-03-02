let q = el => document.querySelector(el)
let qAll = el => document.querySelectorAll(el)
let createE = el => document.createElement(el)


let pictureFile = q('[type="file"]'),
    file_Button = q('.file_Button'),
    previewPicture = q('.preview'),
    contentPicture = q('.picture-content')
    
let imgPreview = createE('img'),
    acceptPhoto = createE('div'),
    btnAccept = createE('button'),
    btnRefuse = createE('button')

let pictureName


file_Button.addEventListener('click', ()=>{
    pictureFile.click()
    pictureFile.value = ''
    acceptPhoto.setAttribute('class', 'accept-photo')

    btnAccept.setAttribute('class', 'accept')
    btnAccept.innerHTML = "Accept"

    btnRefuse.setAttribute('class', 'refuse')
    btnRefuse.innerHTML = "Refuse"

    pictureFile = q('[type="file"]')
    
    //best event for mobile support
    pictureFile.addEventListener('change', ()=>{

        if(pictureFile.files.length == 1) {

            let pictureSelect = pictureFile.files[0]

            pictureName = pictureFile.files[0].name
            pictureName = pictureName.slice(0,-4)

            previewPicture.appendChild(acceptPhoto)
            acceptPhoto.appendChild(btnAccept)
            acceptPhoto.appendChild(btnRefuse)
            previewPicture.appendChild(imgPreview)
            
            imgPreview.src = URL.createObjectURL(pictureSelect)
        }
    
    })
})


let deleteModal = ()=>{
    imgPreview.remove()
    acceptPhoto.remove()
}


btnRefuse.addEventListener('click', deleteModal)

let year = new Date().getFullYear()

btnAccept.addEventListener('click', ()=>{

    let month = new Date().getMonth()
    let date = new Date().getDate()
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()

    switch(month) {
        case 0: month = 'January'; break;
        case 1: month = 'February'; break;
        case 2: month = "March"; break;
        case 3: month = 'April'; break;
        case 4: month = "May"; break;
        case 5: month = 'June'; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
    }
    switch(hours) {
        case 0: hours = "00"; break;                         
        case 1: hours = "01"; break;          
        case 2: hours = "02"; break;
        case 3: hours = "03"; break;
        case 4: hours = "04"; break;
        case 5: hours = "05"; break;
        case 6: hours = "06"; break;
        case 7: hours = "07"; break;
        case 8: hours = "08"; break;
        case 9: hours = "09"; break;
    }

    switch(minutes) {
        case 0: minutes = "00"; break;
        case 1: minutes = "01"; break;
        case 2: minutes = "02"; break;
        case 3: minutes = "03"; break;
        case 4: minutes = "04"; break;
        case 5: minutes = "05"; break;
        case 6: minutes = "06"; break;
        case 7: minutes = "07"; break;
        case 8: minutes = "08"; break;
        case 9: minutes = "09"; break;
    }

    let modalWidget = `
            <div class="widget" style="order: -${contentPicture.childElementCount};">
                <button title="Remove image"></button>
                <div class="picture">
                    <img src="${imgPreview.src}" alt="${pictureName}" />
                </div>
                <div class="dateRecord">
                    Published on  ${month} ${date}, ${year} - ${hours}h${minutes}
                </div>
            </div>
    `
    contentPicture.innerHTML += modalWidget
    
    deleteModal()

    qAll('.widget button').forEach((wdDel)=>{
        wdDel.addEventListener('click', widgetRemove)
    })
})

function widgetRemove() {
    this.parentNode.style.opacity = 0
    setTimeout(()=> this.parentNode.remove(), 300)
}



let emojiOne =  q('.emoji p:first-child')
let emojiTwo = q('.emoji p:last-child')

function emojiOut() { 
    emojiTwo.style.display = 'block'
    emojiOne.style.display = 'none'
}

function emojiOver() {
    emojiTwo.style.display = 'none'
    emojiOne.style.display = 'block'
}

q('#footer a').addEventListener('mouseover', emojiOut)
q('#footer a').addEventListener('mouseout', emojiOver)

q('#footer .year').innerHTML = year