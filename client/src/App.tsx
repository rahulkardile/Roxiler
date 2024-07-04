import Table from "./components/Table"

function App() {

  return (
    <div className="bg-sky-100 p-8 m-auto h-screen">

      <h2 className="w-[150px] h-[150px] text-lg font-bold flex items-center justify-center rounded-full text-center text-gray-600 bg-white m-auto">Transaction Dashboard</h2>

      <div className="max-w-screen-lg mx-auto my-4 h-12 flex flex-row justify-between px-11">
        <input type="text" className="w-[30%]  bg-orange-200 text-neutral-900 font-semibold rounded-md px-4 py-1 outline-none" placeholder="Search Transaction" />

        <select className="bg-orange-200 rounded-md w-32 px-2 h-[90%]" defaultValue={"mar"} name="month" id="month">
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
      <Table />
    </div>
  )
}

export default App
