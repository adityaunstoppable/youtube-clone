import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    let list1Data = [ "Shorts", "Subscription"]
    let list2Data = ["Library", "History", "Your Videos", "Watch Later", "Liked Videos"]
    let list3Data = ["Trending", "Shopping", "Music", "Films", "Live", "Gaming", "News"]
    let listClassnames = "m-1 p-2 hover:bg-slate-100 hover:rounded-lg cursor-pointer"
    
    const {toggle} = useSelector(state => state.toggleSideBar)

    return !toggle ? null :(
        <div className=" mr-3">
            {/* list 1 */}

            
            <ul>
                {list1Data.map(eachItem => {
                    return (
                    <>
                    <Link to="/"><li className={listClassnames}>Home</li></Link>
                    <li className={listClassnames}>{eachItem}</li>
                    </>
                    )
                })}
            </ul>

            <div className='h-[1px] bg-slate-400 m-2  '></div>

            {/* list 2 */}
            <ul>
                {list2Data.map(eachItem => {
                    return (<li className={listClassnames}>{eachItem}</li>)
                })}
            </ul>

            <div className='h-[1px] bg-slate-400 m-2'></div>


            {/* List 3 */}
            <ul>
                {list3Data.map(eachItem => {
                    return (<li className={listClassnames}>{eachItem}</li>)
                })}
            </ul>


        </div>
    )
}

export default Sidebar