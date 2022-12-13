import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer2";

// Elements
import ContactInfoCard from '../elements/contact-info-card';

// Images
import bannerImg from '../assets/images/banner/banner2.jpg';

class Contact1 extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Liên hệ</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Trang chủ</Link></li>
								<li>Liên hệ</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="page-banner contact-page section-sp1">
							<div className="container">
								<div className="row">
									<div className="col-lg-7 col-md-7 m-b30">
										<form className="contact-bx ajax-form">
											<div className="ajax-message"></div>
											<div className="heading-bx left">
												<h3 className="title-head">Kênh <span>liên lạc</span></h3>
												<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
											</div>
											<div className="row placeani">
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="name" type="text" placeholder="Họ tên" required className="form-control valid-character"/>
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="email" type="email" placeholder="Địa chỉ email" className="form-control" required />
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="phone" type="text" placeholder="Số điện thoại" required className="form-control int-value"/>
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="subject" type="text" placeholder="Tiêu đề" required className="form-control"/>
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group">
															<textarea name="message" placeholder="Type Message" rows="4" className="form-control" required ></textarea>
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<button name="submit" type="submit" value="Submit" class="btn button-md"> Gửi tin</button>
												</div>
											</div>
										</form>
									</div>
									<div className="col-lg-5 col-md-5 m-b30">
										<ContactInfoCard />
									</div>
								</div>
							</div>
						</div>
						
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default Contact1;