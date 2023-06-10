import React from 'react'
import image1 from '../assets/image-1.jpg'
import image2 from '../assets/image-2.jpg'
import image3 from '../assets/image-3.jpg'

const Destinations = () => {
  return (
    <section className='destinations'>
      <h3>Now available in Canada</h3>
      <div className='grid'>
        <div>
          <img src={image2} alt='destination-1' />
          <h3>Fly to Aruba</h3>
          <p>
          Visitors can relax on the beach, take a dip in the ocean, or indulge in various water sports like snorkeling, scuba diving, and sailing.
     
          </p>
        </div>

        <div>
          <img src={image3} alt='destination-2' />
          <h3>Experience Mombasa</h3>
          <p>
          The city boasts beautiful white sandy beaches, palm-fringed shores, and crystal-clear turquoise waters.      </p>
        </div>

        <div>
          <img src={image1} alt='destination-3' />
          <h3>Savour Hawaii</h3>
          <p>
          visitors can take a short trip to Haller Park, a wildlife sanctuary where you can encounter giraffes, hippos, crocodiles, and a variety of bird species.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Destinations
