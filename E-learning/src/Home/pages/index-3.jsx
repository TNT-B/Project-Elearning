import React from 'react';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer2";

// Elements
import MainSlider from '../elements/slider/slider2';
import OurStory2 from '../elements/our-story/our-story2';
import ServicesContent3 from '../elements/services-content-3';
import AppointmentBox from '../elements/appointment-box';
import PopularCoursesSlider2 from '../elements/popular-courses-slider2';

// Images
import bg4 from '../assets/images/background/bg4.jpg';

function Index3() {
	
	return (
		<>

			<Header />

			<div className="page-content bg-white">

				<MainSlider />

				<div className="content-block" id="content-area">

					<div className="popular-courses-bx" style={{ backgroundImage: "url(" + bg4 + ")", backgroundSize: "cover" }}>
						<div className="section-area section-sp3">
							<div className="container">
								<div className="row">
									<div className="col-md-12 heading-bx style1 text-center">
										<h2 className="title-head">Điểm ưu việt</h2>
										<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
									</div>
								</div>

								<ServicesContent3 />

							</div>
						</div>

						<div className="section-area section-sp1">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-12 heading-bx style1 text-center">
										<h2 className="title-head">Các khóa học nổi bật</h2>
										<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
									</div>
								</div>

								<PopularCoursesSlider2 />

							</div>
						</div>
					</div>
					<OurStory2 />
					<AppointmentBox />													

				</div>

			</div>

			<Footer />

		</>
	);

}

export default Index3;