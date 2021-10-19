const {fetch,fetchAll} = require('../../lib/postgres.js')
const checkStatus = require('../../lib/statusCheck.js')
const path = require('path');
const fs = require('fs');
const {debugLog} = require("express-fileupload/lib/utilities");

const insertProducts = `
insert into products 
(product_name,price,yuklama,kafolat,olchami,sigimi,description,category_id,status,aksiya_price,img_links)
values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING*
`

const update = `
update products set product_name=$2,price=$3,yuklama = $4,kafolat = $5, olchami = $6,
sigimi = $7,description = $8,category_id = $9,status = $10,aksiya_price = $11,img_links = $12
where product_id = $1 RETURNING*
`




const insert = async (file,{productName,price,yuklama,kafolat,olchami,sigimi,description,category,status,aksiyaPrice}) => {
    try {
        let imgLinks = []
        for (let fileElement of file) {
            imgLinks.push(fileElement.name)
            fileElement.mv(path.join(process.cwd(),'src', 'uploads', 'images', fileElement.name), async (err) => console.log(err))
        }
        let categoryId = await fetch('select * from categories where category_name = $1',category)
        let product = await fetch(insertProducts,
            productName,
            price,yuklama,
            kafolat,olchami,sigimi,
            description,categoryId.category_id,
            checkStatus(status),aksiyaPrice,imgLinks
        )
        console.log(product)
        return product
    } catch (err) {
        console.log(err)
    }
}

const fetchProducts = async () => {
    try {
        let products = await fetchAll(`select
        p.product_id,p.product_name,p.price,p.yuklama,
        p.kafolat,p.olchami,p.sigimi,p.active,p.description,
        p.date,p.aksiya_price,p.status,p.img_links,c.category_name  
        from products p inner join categories c using(category_id)
        where p.deleted = false`)
        console.log(products)
        for (let productElement of products) {
            delete productElement.category_id
            let images = productElement.img_links
            for (let i = 0; i < images.length; i++) {
                images[i] = 'http://localhost:4500/' + images[i]
            }
        }
        return products
    } catch (err) {
        console.log(err)
    }
}

const updateProducts = async (file,{id,productName,price,yuklama,kafolat,olchami,sigimi,description,category,status,aksiyaPrice}) => {
    try {
        let product = await fetch('select * from products where product_id = $1',id);
        let imgLinks = []

        for (let fileElement of file) {
            fileElement.mv(path.join(process.cwd(),'src','uploads','images',fileElement.name))
            imgLinks.push(fileElement.name)
        }
        let categoryId = await fetch('select * from categories where category_name = $1',category)
        let products = await fetch(update,
            id,productName,price,
            yuklama,kafolat,olchami,sigimi,
            description,categoryId.category_id,
            checkStatus(status),aksiyaPrice,imgLinks
        )
        for (let imgLink of product.img_links) {
            fs.unlink(path.join(process.cwd(),'src','uploads','images',imgLink), (err) => console.log(err))
        }
        return products
    } catch (err) {
        return err
    }
}

const updateActive = async (id) => {
    try{
        id = parseInt(id)
        console.log(id)
        let product = await fetch('update products set active = NOT active where product_id = $1 RETURNING*',id)
        console.log(product)
        return product
    } catch (err){
        console.log(err)
    }
}

const deleteProducts = async (id) => {
    try {
        let product = await fetch('update products set deleted = true where product_id = $1 RETURNING*',id)
        return product
    } catch (err) {
        return err
    }
}

const fetchOne = async (id) => {
    let product = await fetch('select * from products p inner join categories c using(category_id) where p.product_id = $1',id)
    delete product.category_id
    for (let imgLink of product.img_links) {
        imgLink = 'http://localhost:4500/' + imgLink
    }
    return product
}

module.exports = {
    insert,
    fetchProducts,
    updateProducts,
    deleteProducts,
    fetchOne,
    updateActive
}