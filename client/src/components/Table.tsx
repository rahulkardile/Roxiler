import { FC } from 'react'
import { Product } from '../utils/Types';

interface TableProps {
    data: Product[];
}

const Table: FC<TableProps> = ({ data }) => {

    return (
        <main className='m-auto w-min'>
            <div className="m-auto">
                <table className="border-collapse border-3 overflow-x-auto border-slate-500 bg-orange-200 w-full">
                    <thead>
                        <tr>
                            <th className="border px-6 py-4 dark:border-neutral-500">Id</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Title</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Description</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Price</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Date of Sale</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Category</th>
                            <th className="border px-6 py-4 dark:border-neutral-500">Sold</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>

                        {
                            data.length >= 0 ? data.map((item, index) => (
                                <tr className="border-b dark:border-neutral-500" key={index}>
                                    <td className="whitespace-nowrap border-x px-6 py-4 dark:border-neutral-500">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap border-x px-6 py-4 dark:border-neutral-500">
                                        {item.title.length >= 15 ? item.title.substring(0, 15) + " . . ." : item.title}
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {item.description.length >= 15 ? item.description.substring(0, 15) + " . . ." : item.description}
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {item.price}
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {item.dateOfSale}
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {item.category}
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {item.sold ? "Sold" : "Not Sold"}
                                    </td>
                                </tr>
                            )) : ""
                        }


                    </tbody>
                </table>
            </div>
        </main>

    )
}

export default Table;