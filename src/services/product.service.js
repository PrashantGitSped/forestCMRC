
const Category = require('../models/category.model.js')
const Product = require('../models/product.model.js')

async function createProduct(reqData){
    //console.log(reqData)
    let topLevel = await Category.findOne({name: reqData.topLevelCategory})


    if(!topLevel){
        topLevel = new Category({
            name : reqData.topLevelCategory,
            level:1
        })
        await topLevel.save()
    }
    //console.log("in herer2")
    let secondLevel = await Category.findOne({name: reqData.secondLevelCategory, parentCategory: topLevel._id})

    if(!secondLevel){
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })

        await secondLevel.save()
    }

    let thirdLevel = await Category.findOne({
        name:reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    })

    if(!thirdLevel){
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })
        await thirdLevel.save()
    }

    const product = new Product({
        title : reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPersent: reqData.discountPersent,
        imageUrl: reqData.imageUrl,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirdLevel._id
    })

    return await product.save()
}


async function deleteProduct(productId){
    const product = await findProductById(productId)
    await Product.findByIdAndDelete(productId)
    return "Product deleted successfully"
}

async function updateProduct(productId, reqData){
    return await Product.findByIdAndUpdate(productId, reqData)
}


async function findProductById(productId){
    const product = await Product.findById(productId).populate("category").exec()
    if(!product){
        throw new Error("Product not found with id:" + id)
    }
    return product
}

async function getAllProducts(reqQuery){
    let {category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize} = reqQuery
    pageSize = pageSize || 10
    //console.log(pageNumber)
    let query = Product.find().populate("category")
    if(category){
        const existCategory = await Category.findOne({name: category})
        if(existCategory){
            query = query.where("category").equals(existCategory._id)
        }
        else{
            return {content: [], currentPage:1, totalPage: 0}
        }
    }
    console.log("color outside:", color)
    if(color){
        console.log("color inside:", color)
        //color = "undefined" ?
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()))
        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"): null
        query = query.where("color").regex(colorRegex)
    }


    if(sizes){
        const sizesSet = new Set(sizes)
        query.query.where("sizes.name").in([...sizesSet])
    }

    if(minPrice && maxPrice){
        query =  query.where('discountedPrice').gte(minPrice).lte(maxPrice)
    }

    if(minDiscount){
        query = query.where("discountPersent").gte(minDiscount)
    }

    if(stock){
        if(stock ==  "in_stock"){
            query = query.where("quantity").gt(0)
        }
        if(stock == "out_of_stock"){
            query = query.where("quantity").gt(1)
        }
    }


    if(sort){
        const sortDirection = sort === "price_height" ? -1 :1
        query = query.sort({discountedPrice: sortDirection})
    }

    const totalProducts = await Product.countDocuments(query)


    const skip = (pageNumber-1)*pageSize

    /*
    console.log("pageNumber ",pageNumber )
    console.log("pageSize ",pageSize )
    console.log("(pageNumber-1) ", (pageNumber-1))
    console.log(skip)


     */
    query = query.skip(skip).limit(pageSize)

    const products = await query.exec()

    const totalPages = Math.ceil(totalProducts/pageSize)

    return { content : products, currentPage: pageNumber, totalPages}
}

async function createMultipleProducts(products){
    for(let product of products){
        await createProduct(product)
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProducts
}