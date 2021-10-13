module.exports = (status) => {
    if (status === 'eski mahsulot'){
        return 0
    }else if (status === 'yangi mahsulot'){
        return 1
    }else if (status === 'aksiya'){
        return 2
    }else{
        return 3
    }
}