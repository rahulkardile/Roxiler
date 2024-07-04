import { useEffect, useState } from "react"
import Statistics from "./components/Statistics"
import Table from "./components/Table"
import { Product } from "./utils/Types";

interface ApiResponse {
  success: boolean;
  data: Product[];
}

function App() {

  const [month, setMonth] = useState("mar");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [ProductData, setProductData] = useState<Product[]>([])


  async function GetData() {
    const data = await fetch(`/api/state/get?search=${search}&month=${month}&page=${page}`)
    const { data: res, success }: ApiResponse = await data.json();

    if (success === true) {
      setProductData(res)
    } else {
      console.log("Could not fetch data!");

    }

  }

  useEffect(() => {
    GetData().then(() => {
      if (ProductData.length < 10) {
        setPage(1);
      }
    })
  }, [search, page, month])

  return (
    <div className="bg-sky-100 p-8 m-auto h-full">
      <h2 className="w-[150px] h-[150px] text-lg font-bold flex items-center justify-center rounded-full text-center text-gray-600 bg-white m-auto">Transaction Dashboard</h2>

      <div className="max-w-screen-lg mx-auto my-4 h-12 flex flex-row justify-between px-11">

        <input type="text" value={search} className="w-[30%]  bg-orange-200 text-neutral-900 font-semibold rounded-md px-4 py-1 outline-none" placeholder="Search Transaction" onChange={(e) => { setSearch(e.target.value) }} />

        <select value={month} className="bg-orange-200 rounded-md w-32 px-2 h-[90%]" onChange={(e) => setMonth(e.target.value)} defaultValue={"mar"} name="month" id="month">
          <option className="p-3" value="jan">January</option>
          <option className="p-3" value="feb">February</option>
          <option className="p-3" value="mar">March</option>
          <option className="p-3" value="apr">April</option>
          <option className="p-3" value="may">May</option>
          <option className="p-3" value="jun">June</option>
          <option className="p-3" value="jul">July</option>
          <option className="p-3" value="aug">August</option>
          <option className="p-3" value="sep">September</option>
          <option className="p-3" value="oct">October</option>
          <option className="p-3" value="nov">November</option>
          <option className="p-3" value="dec">December</option>
        </select>

      </div>
      <Table data={ProductData} />
      <div className="max-w-screen-lg font-semibold mx-auto my-9 flex flex-row justify-between">
        <h4>Page No: {page}</h4>
        <div className="flex gap-3">
          <button disabled={page === 1 ? true : false} className="disabled:cursor-not-allowed disabled:text-gray-400" onClick={() => setPage(page - 1)}>Previous</button>
          <span>-</span>
          <button disabled={ProductData.length <= 9} onClick={() => setPage(page + 1)}>Next</button>
        </div>
        <h4>Per Page : 10</h4>
      </div>

      <Statistics />
    </div>
  )
}

export default App
