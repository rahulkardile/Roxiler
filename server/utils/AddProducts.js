import Product from "../models/product.model.js";

export async function GetData(url) {
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    console.log(data.length);

    data.map(async (i, index) => {
        try {

            await Product.create({
                id: i.id,
                title: i.title,
                description: i.description,
                category: i.category,
                image: i.image,
                dateOfSale: i.dateOfSale,
                price: i.price,
                sold: i.sold
            });

            console.log("Created! " + index);

        } catch (error) {
            console.log("Problem At : " + index);
            console.log(error);
        }

    })
}