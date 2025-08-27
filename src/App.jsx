import { useEffect, useState } from 'react'
import Papa from 'papaparse';
import './App.css'
import UserCard from './components/UserCard';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import { Apple, Search } from 'lucide-react';
import logo from './assets/logo.png'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedUser, setSelectedUser] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    position: '',
    gender: '',
  })
  const numberperpage = 20

  const numberOfPages = Math.ceil(filteredData.length / numberperpage)
  // console.log(numberOfPages)


  const displayedData = filteredData?.slice(((page - 1) * 20), (page * 20) + 1)

  const fetchData = async () => {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQwLT2IUc8vWOrBFQmepClyimstsFQwT1oiCH8xTHbrSNi3-_4uKTYySEmbiPp6UW2-QD4HKtuvRTqq/pub?output=csv')

    const csvText = await response.text()

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });
    console.log(parsed.data)
    setData(parsed.data)
    setFilteredData(parsed.data)
  }


  const handleSearch = (value) => {
    setPage(1)
    setSearchValue(value)
    if (!value.trim()) {
      setFilteredData(data)
      return
    }
    const filtered = data.filter((person) => {
      const name = (person.Surname + ' ' + person['Other Names']).toLowerCase()
      console.log(name)
      return name.toLowerCase().includes(value)
    })

    setFilteredData(filtered)
  }

  const handleCardClick = (data) => {
    setSelectedUser(data)
    setModalOpen(true)
  }

  const changePage = (page) => {
    console.log(data)
    setPage(page)
    console.log(page)
  }

  const filterData = (updatedFilters) => {

    let filterString = ''
    let filterArr = []
    console.log(updatedFilters)

    Object.keys(updatedFilters).forEach(key => {
      filterArr.push({ [key]: updatedFilters[key] })
    });

    console.log(filterArr)

    for (const filter of filterArr) {
      console.log(filter)
      console.log(Object.values(filter))
      // console.log(Object.keys(updatedFilters), Object.values(updatedFilters))

      if (Object.values(filter)[0] === '') {
        filterString = filterString
      } else {
        if (filterString == '') {
          // filterString = Object.values(filter)[0]
          filterString = `${Object.keys(filter)} == ${Object.values(filter)[0]}`
        } else {
          filterString = `${filterString} && ${Object.keys(filter)} == ${Object.values(filter)[0]}`
        }
      }
    }

    console.log(filterString)

    filteredData.filter((person) => {

    })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    let updated
    // console.log(name, value)
    setFilters((prev) => {
      updated = { ...prev, [name]: value };
      // console.log("Updating filters to:", updated);
      filterData(updated)
      return updated;
    }
    )


    // const filtering

    // Object.keys(filters).forEach(key => {
    //   console.log("Key:", key);
    //   console.log("Value:", filters[key]);
    // });


    // console.log(filtering)
    // setFilteredData()
  }

  const clearFilters = () => {
    setFilters({
      gender: '',
      position: ''
    })
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <header className='header'>
        <img src={logo} alt="" />
        <h1 className=''>MCC Candidates Directory</h1>
        <p>Discover talented professionals from the applicant pool</p>
        <hr />
        <div className="filters">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for a candidate"
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <div className="">
              <select name="position" id="position" value={filters.position} onChange={handleFilterChange}>
                <option value="">Any position</option>
                <option value="Business Developer (NBC)">Business Developer (NBC)</option>
                <option value="Canvasser (NBC)">Canvasser (NBC)</option>
                <option value="Merchandiser (NBC)">Merchandiser (NBC)</option>
                <option value="HR & Office Admin Lagos (MCC)">HR & Office Admin Lagos (MCC)</option>
                <option value="Accountant (MCC)">Accountant (MCC)</option>
                <option value="Business and Customer Success Executive (MCC)">
                  Business and Customer Success Executive (MCC)
                </option>
                <option value="Customer Experience Officer (MCC)">Customer Experience Officer (MCC)</option>
                <option value="HR & Office Admin Abuja (MCC)">HR & Office Admin Abuja (MCC)</option>
                <option value="Sales Supervisor (NB)">Sales Supervisor (NB)</option>
              </select>
            </div>
            <div className="">
              <select name="gender" id="gender" value={filters.gender} onChange={handleFilterChange}>
                <option value="">Any gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button onClick={clearFilters}>Clear filters</button>
          </div>
        </div>

      </header>


      <div className='user-list'>
        {displayedData?.slice(0, 20).map((person, index) => (
          <div key={index} onClick={() => handleCardClick(person)}>
            <UserCard userData={person} />
          </div>
        ))}
      </div>
      <Modal modalData={selectedUser} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* <div className='pagination'>
        {Array.from({ length: numberOfPages }, (_, index) => (
          <button key={index} onClick={() => console.log(`Page ${index + 1}`)}>
            {index + 1}
          </button>
        ))}
      </div> */}

      <Pagination numberOfPages={numberOfPages} currentPage={page} setCurrentPage={changePage} />

    </>
  )
}

export default App
