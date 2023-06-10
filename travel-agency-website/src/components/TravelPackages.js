import React from 'react'
import TravelPackage from './TravelPackage'

const TravelPackages = ({ user, travelPackages, updateTravelPackage, deleteTravelPackage, setShowNotification, setMessage, setDescription }) => {
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
            <div className='travel-packages' style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {travelPackages && travelPackages.map((travelPackage) => {
                    return (
                        <TravelPackage user={user} key={travelPackage.id} travel={travelPackage} color={lightColors[Math.floor(Math.random() * lightColors.length)]} updateTravelPackage={updateTravelPackage} deleteTravelPackage={deleteTravelPackage} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}/>
                    )
                })}
            </div>

        </div>
    )
}

export default TravelPackages
