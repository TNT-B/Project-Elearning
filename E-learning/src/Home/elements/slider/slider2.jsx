import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";

// Images
import Image1 from "../../assets/images/slider/slide3.jpg"
import pic1 from "../../assets/images/slider/pic1.png"

class Slider2 extends Component{
	
	render(){
		
		const settings = {
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		
		return(
			<>
				
				<Slider {...settings} className="tt-slider slider-two slider-sp0 owl-none">
					<div className="slider-item">
						<div className="slider-thumb">
							<img src={Image1} alt=""/>
						</div>
						<div className="slider-content">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-7">
										<div className="content-inner">
											<h6 className="sub-title">Welcome To Techno </h6>
											<h2 className="title text-primary">Khởi đầu sự nghiệp của bạn</h2>
											<p>velit laoreet id donec ultrices tincidunt arcu non sodales neque</p>
											<Link className="btn radius-xl m-r15 button-md white" to="/contact-1">Liên hệ tư vấn</Link>
											<Link className="btn radius-xl button-md" to="/courses">Xem khóa học</Link>
										</div>
									</div>
									<div className="col-lg-5">
										<div className="slider-img">
											<img src={pic1} alt=""/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>												
				</Slider>
				
			</>
		);
	}
}

export default Slider2;
