import { useEffect, useState } from 'react'
import Papa from 'papaparse';
import './App.css'
import UserCard from './components/UserCard';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import { Apple, Search } from 'lucide-react';
import logo from './assets/logo.png'

const getAgeFromDOB = (dobString) => {
  const dob = new Date(dobString);
  if (isNaN(dob)) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedUser, setSelectedUser] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    position: '',
    gender: '',
    ageRange: '',
    maritalStatus: '',
  })

  const numberperpage = 20

  const numberOfPages = Math.ceil(filteredData.length / numberperpage)
  // console.log(numberOfPages)


  const displayedData = filteredData?.slice(((page - 1) * numberperpage), (page * numberperpage))

  const fetchData = async () => {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQwLT2IUc8vWOrBFQmepClyimstsFQwT1oiCH8xTHbrSNi3-_4uKTYySEmbiPp6UW2-QD4HKtuvRTqq/pub?output=csv')

    const csvText = await response.text()

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });
    console.log(parsed.data)
    setOriginalData(parsed.data)
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
    const filtered = filteredData.filter((person) => {
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
    setFilteredData(originalData)
    let result = [...originalData]

    if (searchValue.trim()) {
      result = result.filter((person) => {
        const name = (person.Surname + ' ' + person['Other Names']).toLowerCase()
        console.log(name)
        return name.toLowerCase().includes(searchValue)
      })
      // setFilteredData(searchFiltered)
    }


    result = result.filter(app => {
      const age = getAgeFromDOB(app['Date of Birth']);
      let ageMatch = true;

      if (updatedFilters.ageRange) {
        if (updatedFilters.ageRange === '18-24') ageMatch = age >= 18 && age <= 24;
        else if (updatedFilters.ageRange === '25-34') ageMatch = age >= 25 && age <= 34;
        else if (updatedFilters.ageRange === '35-44') ageMatch = age >= 35 && age <= 44;
        else if (updatedFilters.ageRange === '45-54') ageMatch = age >= 45 && age <= 54;
        else if (updatedFilters.ageRange === '55+') ageMatch = age >= 55;
      }

      return (
        (!updatedFilters.gender || app['Gender'] === updatedFilters.gender) &&
        (!updatedFilters.position || app['Position Applying for'] === updatedFilters.position) &&
        ageMatch &&
        (!updatedFilters.maritalStatus || app['Marital Status'] === updatedFilters.maritalStatus)
      );
    });

    setFilteredData(result);
  };


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
  }

  const clearFilters = () => {
    setFilters({
      gender: '',
      position: '',
      ageRange: '',
      maritalStatus: '',
    });

    setFilteredData(originalData);
  }




  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <header className='header'>
        <img src={logo} alt="" />
        <h1 className=''>MCC Talent Directory</h1>
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
                <option value="Learning and Development Coordinator (MCC)">Learning and Development Coordinator (MCC)</option>

                <option value="Sales Partner(Wema Bank)">Sales Partner(Wema Bank)</option>
                <option value="Tele-Sales Supervisor (NB)">Tele-Sales Supervisor (NB)</option>
                <option value="Social Media & Content Executive">Social Media & Content Executive</option>
                <option value="IT Support Officer">IT Support Officer</option>

                <option value=">Graduate Trainees">Graduate Trainees</option>
                <option value="Office Assistants">Office Assistants</option>
                <option value="Business Development Executive (MCC)">Business Development Executive (MCC)</option>
                <option value="Motorised Sales Representative">Motorised Sales Representative</option>

              </select>
            </div>
            <div className="">
              <select name="gender" id="gender" value={filters.gender} onChange={handleFilterChange}>
                <option value="">Any gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <select name="ageRange" value={filters.ageRange} onChange={handleFilterChange}>
                <option value="">Any age</option>
                <option value="18-24">18-24 years</option>
                <option value="25-34">25-34 years</option>
                <option value="35-44">35-44 years</option>
                <option value="45-54">45-54 years</option>
                <option value="55+">55+ years</option>
              </select>
            </div>


            <div>
              <select name="maritalStatus" value={filters.maritalStatus} onChange={handleFilterChange}>
                <option value="">Any marital status</option>
                {Array.from(new Set(originalData.map(item => item['Marital Status'])))
                  .filter(Boolean)
                  .map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
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
