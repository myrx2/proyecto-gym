import React, { useEffect } from "react";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



const OwlCarouselComponent = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const $ = require('jquery');
            window.jQuery = $;
            require('owl.carousel');

            const owl = $('.owl-carousel');
            owl.owlCarousel({
                loop: true,
                margin: 10,
                items: 5,
                responsive: {
                    0: {items: 1},
                    600: { items: 3},
                    1000: {items: 5}
                }
            }); 
            
            return () => {
                owl.trigger('destroy.owl.carousel');
            };
        }
    }, []);

    return (
        <div className="container">
            <div className="main">
                {/* Aca arranca el Carousel*/}
                <div className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="/images/imagen1.jpg" alt="Imagen 1"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen2.jpg" alt="Imagen 2"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen3.jpg" alt="Imagen 3"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen4.jpg" alt="Imagen 4"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen5.jpg" alt="Imagen 5"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen6.jpg" alt="Imagen 6"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen7.jpg" alt="Imagen 7"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen8.jpg" alt="Imagen 8"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen9.jpg" alt="Imagen 9"/>
                    </div>
                    <div className="item">
                        <img src="/images/imagen10.jpg" alt="Imagen 10"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwlCarouselComponent;