import React from 'react'
import Revenue from './Revenue'
import ReportNav from './ReportNav'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import Notification from './Notification'
import { Chart } from "react-google-charts";


const Report = () => {

    const [report, setReport] = React.useState([])

    const location = useLocation();
    const splits = location.pathname.split('/');
    const userId = splits[splits.length - 1];

    const [user, setUser] = React.useState({})
    const [showNotification, setShowNotification] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        fetch('http://localhost:8080/packages/reports')
            .then(res => res.json())
            .then(data => { 
                setReport(data);
                const temp = [['Package', 'Revenue']];
                data.forEach((travelPackage) => {
                    temp.push([`${travelPackage.name} - ${travelPackage.totalRevenue} CAD`, travelPackage.totalRevenue]);
                }
                )
                setData(temp);
             })
            .catch(err => console.log(err))

        fetch(`http://localhost:8080/users/${userId}`)
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
            <ReportNav user={user} setUser={setUser} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription} />
            {showNotification && <Notification show={showNotification} message={message} description={description} showNotification={showNotification} setShowNotification={setShowNotification} />}
            <Chart
                chartType="PieChart"
                data={data}
                width={"100%"}
                height={"400px"}
                style={{ marginTop: "1rem" }}
            />
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
