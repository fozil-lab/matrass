const {fetch,fetchAll} = require('../../lib/postgres')
const  path = require('path')
const  fs = require('fs')


const insert =(file,title) => {
    try {
        let fileName = file.name;
        file.mv(path.join(process.cwd(),'src', 'uploads', 'images', fileName), async (err) => console.log(err))
        let carousel = fetch('insert into carousel (title,img_link) values ($1,$2) RETURNING*',title,fileName)
        return carousel
    } catch (err){
        console.log(err)
    }
}

const fetchCarousel = async () => {
    let response = await fetchAll('select * from carousel where active = true');
    for (let carousel of response) {
        carousel.img_link = 'http://localhost:4500/' + carousel.img_link
    }
    console.log(response)
    return response
}

const updateCarousel = async (id,title,file) => {
    let carousel = await fetch('select * from carousel where id=$1',id);
    console.log(carousel)
    if(file){
        fs.unlinkSync(path.join(process.cwd(),'src','uploads','images',carousel.img_link));
        let fileName = file.name;
        file.mv(path.join(process.cwd(),'src', 'uploads', 'images', fileName), async (err) => console.log(err))
        let carousel = await fetch('update carousel set title = $2,img_link = $3 where id = $1 RETURNING*',id,title ? title : carousel.title,fileName)
        return carousel
    }else {
        let carousel = await fetch('update carousel set title = $2,img_link = $3 where id = $1 RETURNING*',id,title ? title : carousel.title)
        return carousel
    }
}

const deleteCarousel = async (id) => {
    let carousel = await fetch('update carousel set active = false where id = $1',id)
    return true
}

module.exports = {
    insert,
    fetchCarousel,
    updateCarousel,
    deleteCarousel
}