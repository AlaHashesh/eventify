import { useQuery } from '@tanstack/react-query'

interface Event {
  id: number;
  title: string;
  description: string | null;
  capacity: number | null;
  created_at: string;
}

const fetchEventsReal = async (): Promise<Event[]> => {
  const response = await fetch('http://localhost:8000/events/')
  if (!response.ok) {
    throw new Error('Could not connect to the backend. Is it attached running?')
  }
  return response.json()
}

const fetchEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Event Title #1",
          description: "Event Description #1",
          capacity: 10,
          id: 1,
          created_at: "2026-03-28T00:00:00"
        },
        {
          title: "Event Title #2",
          description: "Event Description #3",
          capacity: 15,
          id: 2,
          created_at: "2026-03-28T00:00:00"
        },
      ])
    }, 1000)
  })
}


function App() {
  const { data: events = [], isLoading: loading, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })

  return (
    <>
      <div className="bg-glow"></div>
      <div className="bg-glow"></div>
      
      <div className="container">
        <header className="header">
          <h1 className="title">Eventify</h1>
          <p className="subtitle">Discover the most anticipated upcoming events</p>
        </header>

        {error && (
          <div className="error-state">
            <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            Loading events...
          </div>
        ) : (
          <div className="events-grid">
            {events.length === 0 && !error ? (
              <div className="empty-state">
                <h3>No events found</h3>
                <p>The backend database is empty or not seeded yet.</p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="event-card">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.description || 'No description provided.'}</p>
                  <div className="event-footer">
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                       <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Event ID: #{event.id}</span>
                       <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Created: {new Date(event.created_at).toLocaleDateString()}</span>
                       <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Capacity: {event.capacity ? event.capacity : 'Unlimited'}</span>
                     </div>
                     <button className="btn">Details</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
