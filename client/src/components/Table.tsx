import React from 'react'

const Table = () => {
    return (
        <main className='m-auto w-[75%] rounded-xl'>
            <div className="my-2">
                <table className="border-collapse border-3 overflow-x-auto rounded-lg border-slate-500 bg-orange-200 w-full">
                    <thead>
                        <tr>
                            <th className="border px-6 py-4 dark:border-neutral-500">Title</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Description</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Price</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Date of Sale</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Category</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Sold</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>

                        <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap border-x px-6 py-4 dark:border-neutral-500">
                                ransaction.title
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                transaction.description
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                transaction.price
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                transaction.dateOfSale
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                transaction.category
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                transaction.sold
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </main>

    )
}

export default Table


{/* <table className='table p-3 max-w-7xl'>
<thead className=''>
    <th>id</th>
    <th>title</th>
    <th>description</th>
    <th>price</th>
    <th>category</th>
    <th>sold</th>
    <th>image</th>
</thead>
<tbody className=''>
    <tr className='mx-4 p-10'>
        <td>1</td>
        <td>test</td>
        <td>Lorem ipsum commodi nesciunt consequatur provident corporis unde</td>
        <td>$32</td>
        <td>Game</td>
        <td>Not Sold</td>
        <td>img</td>
    </tr>
    <tr className='mx-4 p-10'>
        <td>1</td>
        <td>test</td>
        <td>Lorem ipsum commodi nesciunt consequatur provident corporis unde</td>
        <td>$32</td>
        <td>Game</td>
        <td>Not Sold</td>
        <td>img</td>
    </tr>
    <tr className='mx-4 p-10'>
        <td>1</td>
        <td>test</td>
        <td>Lorem ipsum commodi nesciunt consequatur provident corporis unde</td>
        <td>$32</td>
        <td>Game</td>
        <td>Not Sold</td>
        <td>img</td>
    </tr>
</tbody>
</table> */}