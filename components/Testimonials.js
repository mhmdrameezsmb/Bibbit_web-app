import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function Testimonials() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <div>
      <div className="testimonial" id="testimonials">
        <div className="container">
          <h2>Testimonials</h2>
          <div className="tl_list">
            <Slider {...settings}>
              <div className="tl_item">
                <div className="tl_img">
                  <Image
                    src="/images/profile.svg"
                    alt=""
                    quality={100}
                    width={150}
                    height={100}
                    loading="lazy"
                  />
                </div>
                <div className="tl_name">
                  <span>Cristina Umana</span>
                </div>
                <div className="tl_content" style={{ color: "white" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </div>
              </div>
              <div className="tl_item">
                <div className="tl_img">
                  <Image
                    src="/images/profile.svg"
                    alt=""
                    quality={100}
                    width={150}
                    height={100}
                    loading="lazy"
                  />
                </div>
                <div className="tl_name">
                  <span>Cristina Umana</span>
                </div>
                <div className="tl_content" style={{ color: "white" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </div>
              </div>
              <div className="tl_item">
                <div className="tl_img">
                  <Image
                    src="/images/profile.svg"
                    alt=""
                    quality={100}
                    width={150}
                    height={100}
                    loading="lazy"
                  />
                </div>
                <div className="tl_name">
                  <span>Cristina Umana</span>
                </div>
                <div className="tl_content" style={{ color: "white" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
