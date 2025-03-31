import { Outlet } from 'react-router-dom';

import './App.css'

function App() {


  return (
    <>
      <div className='gFrame'>
        <header>

        </header>
        <main>  
          <Outlet/>
        </main>
        <footer>

        </footer>
      </div>
    </>
  )
}

export default App
