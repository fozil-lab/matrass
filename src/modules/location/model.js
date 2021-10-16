const {fetch,fetchAll} = require('../../lib/postgres')
const path = require("path");
const fs = require("fs");


const insert = async (file,{location,text,address}) => {
    let img_link = []
    for (let fileElement of file) {
        img_link.push(fileElement.name)
        fileElement.mv(path.join(process.cwd(),'src','uploads','images',fileElement.name))
    }
    let geoLocation = await fetch(
        'insert into geo_location (location,text,address,active,img_links) values ($1,$2,$3,$4) RETURNING*',
        location,text,address,img_link
    )
    return geoLocation
}

const fetchLocation = async () => {
    let location = await fetchAll('select * from geo_location where deleted = false')
    for (let locationElement of location) {
        for (let imgLinkElement of locationElement.img_link) {
            imgLinkElement = 'http://localhost:4500/' + imgLinkElement
        }
    }
    return location
}

const updateLocation = async (file,{id,location,text,address,active}) => {
    let locate = await fetch('select * from geo_location where id = $1',id);
    let imgLinks = []
    for (let imgLink of locate.img_link) {
        fs.unlink(path.join(process.cwd(),'src','uploads','images',imgLink), (err) => console.log(err))
    }
    for (let fileElement of file) {
        fileElement.mv(path.join(process.cwd(),'src','uploads','images',fileElement.name))
        imgLinks.push(fileElement.name)
    }
    let geoLocation = await fetch(
        'update statistics set location = $1,text = $2,address = $3,active = $4,img_link = $5 where id =$6 RETURNING*',
        location,text,address,active,imgLinks,id
    )
    return geoLocation
}

const deleteLocation = async (id) => {
    let location = await fetch('update geo_location set deleted = true where id $1 RETURNING*',id)
    return location
}

module.exports = {
    insert,
    fetchLocation,
    updateLocation,
    deleteLocation
}