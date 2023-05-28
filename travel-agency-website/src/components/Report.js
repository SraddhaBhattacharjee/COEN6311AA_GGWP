import React from 'react'
import Revenue from './Revenue'
import ReportNav from './ReportNav'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'


const Report = () => {

    const [report, setReport] = React.useState([])

    const location = useLocation();
  const splits = location.pathname.split('/');
    const userId = splits[splits.length - 1];

    const [user, setUser] = React.useState({})

    React.useEffect(() => {
        fetch('https://travel-package-management.herokuapp.com/packages/reports')
            .then(res => res.json())
            .then(data => setReport(data))
            .catch(err => console.log(err))

        fetch(`https://travel-package-management.herokuapp.com/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err))
            
    }, [userId])

    const lightColors = [
        "#FFD9D9",
        "#FFD9FF",
        "#E6D9FF",
        "#D9E6FF",
        "#D9F2FF",
        "#D9FFFF",
        "#D9FFE6",
    ];



    return (
        <div>
            <ReportNav user={user}/>
        <div className='travel-packages' style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {report.map((travelPackage, index) => {
                return (
                    <Revenue key={index} travel={travelPackage} color={lightColors[Math.floor(Math.random() * lightColors.length)]} />
                )
            })}
        </div>

    </div>
  )
}





export default Report
