import { useEffect, useState } from "react"
import Statistics from "./components/Statistics"
import Table from "./components/Table"
import { ApiResponseStatistics, Product, ProductCount, ResponseAPIGraph, StatisticsInterface } from "./utils/Types";
import Bar_Chart from "./components/Bar_Chart";
import { GetMonth } from "./utils/getMonth";

interface ApiResponse {
  success: boolean;
  data: Product[];
  count: number
}

function App() {
  const [mainMonth, setMainMonth] = useState<string>("")
  const [month, setMonth] = useState("Mar");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState<number>()
  const [ProductData, setProductData] = useState<Product[]>([])
  const [StatisticData, setStatisticsData] = useState<StatisticsInterface>();
  const [productsCount, setProductCount] = useState<ProductCount[]>();


  async function GetData() {
    const data = await fetch(`/api/state/get?search=${search}&page=${page}`)
    const { data: res, success, count }: ApiResponse = await data.json();

    if (success === true) {
      setProductData(res)
      setTotalPageCount(count);
    } else {
      console.log("Could not fetch data!");
    }

  }

  async function dataStatistics() {
    const res = await fetch(`/api/state/stat?month=${month}`)
    const { data: statData, success }: ApiResponseStatistics = await res.json();

    if (success === true) {
      setStatisticsData(statData);
    } else {
      console.log("Could not fetch data!");
    }

  }

  async function getGraphData() {
    const res = await fetch(`/api/state/bar-chart?month=${month}`)
    const { productCount: counts, success }: ResponseAPIGraph = await res.json();

    if (success === true && counts !== undefined) {
      setProductCount(counts);
      setMainMonth(GetMonth(month));

    } else {
      console.log("Could not fetch data!");
    }
  }

  useEffect(() => {
    GetData();
    if (search) {
      const pages = (totalPageCount !== undefined ? totalPageCount : 0) / 10;

      console.log(pages);
      if (pages > 1) {
        return;
      } else {
        setPage(1);
      }
    }
  }, [search, page])

  useEffect(() => {
    dataStatistics();
    getGraphData();
  }, [month])

  return (
    <div className="bg-sky-100 w-screen p-8 m-auto h-full">
      <h2 className="w-[150px] h-[150px] text-lg font-bold flex items-center justify-center rounded-full text-center text-gray-600 bg-white m-auto">Transaction Dashboard</h2>
      <div className="w-screen">
        <div className="max-w-[90%] mx-auto my-4 h-12 flex flex-row justify-between px-11">
          <input type="text" value={search} className="w-[20%]  bg-orange-200 text-neutral-900 font-semibold rounded-md px-4 py-1 outline-none" placeholder="Search Transaction" onChange={(e) => { setSearch(e.target.value) }} />
          <select value={month} className="bg-orange-200 rounded-md w-[14%] px-2 h-[90%]" onChange={(e) => setMonth(e.target.value)} defaultValue={"mar"} name="month" id="month">
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

      <Statistics month={mainMonth} data={StatisticData !== undefined ? StatisticData : { totalItems: 0, totalNotSold: 0, totalSales: 0 }} />

      <div className="w-full max-h-max flex flex-col justify-center items-start p-4 gap-9">

        <div className="pt-6">
          <h3 className='font-bold text-xl'>Bar Char Stats - {mainMonth}</h3>
          <span className='text-xs'>{"( Select Month From Dropdown )"}</span>
        </div>

        <Bar_Chart productCount={productsCount !== undefined ? productsCount : []} />

      </div>

    </div>
  )
}

export default App
