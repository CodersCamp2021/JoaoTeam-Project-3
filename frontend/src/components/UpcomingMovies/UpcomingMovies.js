import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import '../../styles/CarouselDemo.css'

const UpcomingMovies = () => {
    const [movies, setMovies] = useState([]);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(async () => {
        await fetch('http://localhost:3000/upcoming')
            .then(res => res.json())
            .then(data => setMovies(data));
    }, []);

    const movieTemplate = (movie) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={`${movie.poster}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={movie.title} className="product-image" />
                    </div>
                    <div>
                        <h4 className="mb-1">{movie.title}</h4>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-demo">
            <Carousel value={movies} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={5000} itemTemplate={movieTemplate} header={<h5 className='upcoming'>UPCOMING MOVIES</h5>} />
        </div>
    );
}

export default UpcomingMovies; 
