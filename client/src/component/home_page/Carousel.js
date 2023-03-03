import React from 'react'
const Carousel = ({carouseldata}) => {

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    {/* <div className="carousel-item active">
    <img src={`${process.env.REACT_APP_IMG}/${carouseldata[0]}`} className="d-block w-100" />
    </div> */}
      {!!carouseldata[0] && 
    <div className="carousel-item active">
    <img src={`${process.env.REACT_APP_IMG}/${carouseldata[0]}`} className="d-block w-100" />
    </div>
       } 
      {!!carouseldata[1] && 
    <div className="carousel-item">
    <img src={`${process.env.REACT_APP_IMG}/${carouseldata[1]}`} className="d-block w-100" />
    </div>
       } 
      {!!carouseldata[2] && 
    <div className="carousel-item">
    <img src={`${process.env.REACT_APP_IMG}/${carouseldata[2]}`} className="d-block w-100" />
    </div>
       } 
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default Carousel