import { useEffect, useState } from "react"
import Statistics from "./components/Statistics"
import Table from "./components/Table"
import { ApiResponseStatistics, Product, StatisticsInterface } from "./utils/Types";

interface ApiResponse {
  success: boolean;
  data: Product[];
}

function App() {

  const [month, setMonth] = useState("Mar");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [ProductData, setProductData] = useState<Product[]>([])
  const [StatisticData, setStatisticsData] = useState<StatisticsInterface>();


  async function GetData() {
    const data = await fetch(`/api/state/get?search=${search}&page=${page}`)
    const { data: res, success }: ApiResponse = await data.json();

    if (success === true) {
      setProductData(res)
    } else {
      console.log("Could not fetch data!");
    }

  }

  async function DataStatistics() {
    const res = await fetch(`/api/state/stat?month=${month}`)
    const { data: statData, success }: ApiResponseStatistics = await res.json();

    if (success === true) {
      setStatisticsData(statData);
    } else {
      console.log("Could not fetch data!");
    }

  }

  useEffect(() => {
    GetData();

      if (ProductData.length < 9) {
        setPage(1);
      }
  
    }, [search, page])

  useEffect(() => {
    DataStatistics();
  }, [month])

  return (
    <div className="bg-sky-100 p-8 m-auto h-full">
      <h2 className="w-[150px] h-[150px] text-lg font-bold flex items-center justify-center rounded-full text-center text-gray-600 bg-white m-auto">Transaction Dashboard</h2>

      <div className="max-w-screen-lg mx-auto my-4 h-12 flex flex-row justify-between px-11">

        <input type="text" value={search} className="w-[30%]  bg-orange-200 text-neutral-900 font-semibold rounded-md px-4 py-1 outline-none" placeholder="Search Transaction" onChange={(e) => { setSearch(e.target.value) }} />

        <select value={month} className="bg-orange-200 rounded-md w-32 px-2 h-[90%]" onChange={(e) => setMonth(e.target.value)} defaultValue={"mar"} name="month" id="month">
          <option className="p-3" value="Jan">January</option>
          <option className="p-3" value="Feb">February</option>
          <option className="p-3" value="Mar">March</option>
          <option className="p-3" value="Apr">April</option>
          <option className="p-3" value="May">May</option>
          <option className="p-3" value="Jun">June</option>
          <option className="p-3" value="Jul">July</option>
          <option className="p-3" value="Aug">August</option>
          <option className="p-3" value="Sep">September</option>
          <option className="p-3" value="Oct">October</option>
          <option className="p-3" value="Nov">November</option>
          <option className="p-3" value="Dec">December</option>
        </select>

      </div>
      <Table data={ProductData} />
      <div className="max-w-screen-lg font-semibold mx-auto my-9 flex flex-row justify-between">
        <h4>Page No: {page}</h4>
        <div className="flex gap-3">
          <button disabled={page === 1 ? true : false} className="disabled:cursor-not-allowed disabled:text-gray-400" onClick={() => setPage(page - 1)}>Previous</button>
          <span>-</span>
          <button disabled={ProductData.length < 9} className="disabled:cursor-not-allowed disabled:text-gray-400" onClick={() => setPage(page + 1)}>Next</button>
        </div>
        <h4>Per Page : 10</h4>
      </div>

      <Statistics month={month} data={StatisticData !== undefined ? StatisticData : { totalItems: 0, totalNotSold: 0, totalSales: 0 }} />
    </div>
  )
}

export default App
