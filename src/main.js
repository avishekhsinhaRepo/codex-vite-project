import './style.css'

const cruises = [
  {
    id: 1,
    name: 'Caribbean Escape',
    destination: 'Bahamas',
    departureDate: '2026-06-14',
    duration: '7 Nights',
    price: 1299,
    ship: 'Ocean Majesty',
    image:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Mediterranean Highlights',
    destination: 'Santorini',
    departureDate: '2026-07-02',
    duration: '10 Nights',
    price: 1799,
    ship: 'Sea Horizon',
    image:
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Northern Fjords Voyage',
    destination: 'Norway',
    departureDate: '2026-08-19',
    duration: '8 Nights',
    price: 1599,
    ship: 'Aurora Queen',
    image:
      'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Alaskan Adventure',
    destination: 'Alaska',
    departureDate: '2026-09-11',
    duration: '6 Nights',
    price: 1399,
    ship: 'Glacier Spirit',
    image:
      'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Tropical Asia Discovery',
    destination: 'Singapore',
    departureDate: '2026-11-05',
    duration: '9 Nights',
    price: 1699,
    ship: 'Coral Breeze',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
]

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="hero text-white">
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent py-3">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">CruiseBooking</a>
      </div>
    </nav>

    <div class="container py-5">
      <div class="row py-5 align-items-center">
        <div class="col-lg-7">
          <h1 class="display-4 fw-bold">Find Your Perfect Cruise Holiday</h1>
          <p class="lead text-light-emphasis">Book unforgettable cruise experiences to top destinations around the world.</p>
        </div>
      </div>
    </div>
  </header>

  <main class="container my-5">
    <section class="search-panel p-4 rounded-4 shadow-sm bg-white">
      <h2 class="h4 mb-3">Search Cruises</h2>
      <form id="searchForm" class="row g-3">
        <div class="col-md-5">
          <label for="destination" class="form-label">Destination</label>
          <input type="text" id="destination" class="form-control" placeholder="e.g. Bahamas" />
        </div>
        <div class="col-md-4">
          <label for="date" class="form-label">Departure Date</label>
          <input type="date" id="date" class="form-control" />
        </div>
        <div class="col-md-3 d-grid align-self-end">
          <button type="submit" class="btn btn-primary">Search</button>
        </div>
      </form>
    </section>

    <section class="mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h4 m-0">Available Cruises</h2>
        <span id="resultCount" class="badge text-bg-primary"></span>
      </div>
      <div id="results" class="row g-4"></div>
    </section>
  </main>
`

const resultsEl = document.querySelector('#results')
const resultCountEl = document.querySelector('#resultCount')
const searchForm = document.querySelector('#searchForm')

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function renderCruises(items) {
  resultCountEl.textContent = `${items.length} cruise${items.length !== 1 ? 's' : ''}`

  if (!items.length) {
    resultsEl.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info">No cruises found for the selected date and destination.</div>
      </div>
    `
    return
  }

  resultsEl.innerHTML = items
    .map(
      (cruise) => `
      <div class="col-md-6 col-lg-4">
        <article class="card h-100 border-0 shadow-sm">
          <img src="${cruise.image}" class="card-img-top cruise-img" alt="${cruise.name}" />
          <div class="card-body d-flex flex-column">
            <h3 class="h5 card-title">${cruise.name}</h3>
            <p class="card-text text-secondary mb-1"><strong>Destination:</strong> ${cruise.destination}</p>
            <p class="card-text text-secondary mb-1"><strong>Departure:</strong> ${formatDate(cruise.departureDate)}</p>
            <p class="card-text text-secondary mb-1"><strong>Duration:</strong> ${cruise.duration}</p>
            <p class="card-text text-secondary"><strong>Ship:</strong> ${cruise.ship}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
              <span class="fs-5 fw-bold text-primary">$${cruise.price}</span>
              <button class="btn btn-outline-primary btn-sm">Book Now</button>
            </div>
          </div>
        </article>
      </div>
    `,
    )
    .join('')
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const selectedDestination = document
    .querySelector('#destination')
    .value.trim()
    .toLowerCase()
  const selectedDate = document.querySelector('#date').value

  const filteredCruises = cruises.filter((cruise) => {
    const destinationMatch =
      !selectedDestination ||
      cruise.destination.toLowerCase().includes(selectedDestination)

    const dateMatch = !selectedDate || cruise.departureDate === selectedDate

    return destinationMatch && dateMatch
  })

  renderCruises(filteredCruises)
})

renderCruises(cruises)
