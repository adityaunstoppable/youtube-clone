import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './utils/store'

const App = () => {
  
  return (
    <>
    <Provider store={store}>
    <Header />
    <div className="flex">
      
      <div className="flex-[0.1]">
        <Sidebar />
      </div>
      <div className='flex-[0.9]'>
        <Body/>
      </div>
    </div>
    </Provider>
    </>
  )
}

export default App