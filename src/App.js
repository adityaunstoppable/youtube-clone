import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import { useSelector } from 'react-redux'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import VideoPage from './components/VideoPage'

const App = () => {
  
  const sidebarStateFromRedux = useSelector(state => state.toggleSideBar)
  console.log("sidebarStateFromRedux" , sidebarStateFromRedux)

  const bodyFlex= sidebarStateFromRedux?.toggle ?   "flex-[0.9]" : "flex-1 ml-20" 
  const sidebarFlex= sidebarStateFromRedux?.toggle ? "flex-[0.1]" : "flex-0" 

  return (
    <>
    <Header />
    <div className="flex">
      
      <div className={sidebarFlex}>
        <Sidebar />
      </div>
      <div className={bodyFlex}>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {path:"/" , element:<Body />} ,
      {path:"/videopage/:id" , element:<VideoPage/>}
    ]
  }
])

export default App