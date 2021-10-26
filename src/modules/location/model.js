const {fetch,fetchAll} = require('../../lib/postgres')
const path = require("path");
const fs = require("fs");


const insert = async (file,{location,text,address,active}) => {
    let img_link = []
    for (let fileElement of file) {
        img_link.push(fileElement.name)
        fileElement.mv(path.join(process.cwd(),'src','uploads','images',fileElement.name))
    }
    let geoLocation = await fetch(
        'insert into geo_location (location,text,address,active,img_link) values ($1,$2,$3,$4,$5) RETURNING*',
        location,text,address,active,img_link
    )
    return geoLocation
}

const fetchLocation = async () => {
    let location = await fetchAll('select * from geo_location where deleted = false')
    for (let locationElement of location) {
        let images = locationElement.img_link
        for (let i = 0; i < images.length; i++) {
            images[i] = 'http://localhost:4500/' + images[i]
        }
    }
    return location
}

const updateLocation = async (file,{id,location,text,address,active}) => {
    let locate = await fetch('select * from geo_location where id = $1',id);
    let imgLinks = []
    if (file && !Array.isArray(file)){
        let fileName = file.name
        file.mv(path.join(process.cwd(),'src','uploads','images',fileName))
        imgLinks.push(fileName)
    }else if (file && Array.isArray(file)){
        for (let fileElement of file) {
            fileElement.mv(path.join(process.cwd(),'src','uploads','images',fileElement.name))
            imgLinks.push(fileElement.name)
        }
    }
    let geoLocation = await fetch(
        'update geo_location set location = $1,text = $2,address = $3,active = $4,img_link = $5 where id =$6 RETURNING*',
        location,text,address,active,imgLinks,id
    )
    for (let imgLink of locate.img_link) {
        fs.unlink(path.join(process.cwd(),'src','uploads','images',imgLink), (err) => console.log(err))
    }
    return geoLocation
}

const deleteLocation = async (id) => {
    let location = await fetch('update geo_location set deleted = true where id = $1 RETURNING*',id)
    return location
}

const fetchOne = async (id) => {
    let location = await fetch('select * from geo_location where id = $1 and deleted = false',id)
    let images = location.img_link
    for (let i = 0; i < images.length; i++) {
        images[i] = 'http://localhost:4500/' + images[i]
    }
    return location
}

module.exports = {
    insert,
    fetchLocation,
    updateLocation,
    deleteLocation,
    fetchOne
}