import { Outlet } from 'react-router-dom';

import './App.css'
import './utility/customstyle.css'
import BackgroundProvider from'./utility/bgProvider.jsx'

function App() {


  return (
    <BackgroundProvider>
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
    </BackgroundProvider>
  )
}

export default App
