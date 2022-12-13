import React, { Component } from 'react';

// Images
import bg1 from '../assets/images/background/bg1.jpg';
import appBg from '../assets/images/background/appointment-bg.png';

class AppointmentBox extends Component{
	render(){
		return(
			<>
				<div className="section-area section-sp3 ovpr-dark bg-fix appointment-box" style={{backgroundImage:"url("+bg1+")"}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx style1 text-white text-center">
								<h2 className="title-head">Đăng ký ngay</h2>
								<p>Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley.</p>
							</div>
						</div>
						<form className="contact-bx ajax-form">
							<div className="ajax-message"></div>
							<div className="row placeani">
								<div className="col-lg-6">
									<div className="form-group">
										<div className="input-group">
											<input name="name" type="text" placeholder="Họ và tên" required className="form-control valid-character"/>
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
											<input name="phone" type="text" placeholder="Số điện thoại liên hệ" required className="form-control int-value"/>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<div className="input-group">
											<input name="subject" type="text" placeholder="Tiêu đề" required className="form-control"/>
										</div>cd
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<div className="input-group">
											<textarea name="message" rows="4" placeholder="Nội dung" className="form-control" required ></textarea>
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<button name="submit" type="submit" value="Submit" className="btn button-md">Đăng ký tư vấn</button>
								</div>
							</div>
						</form>
					</div>
					<img src={appBg} className="appoint-bg" alt=""/>
				</div>
			</>
		);
	}
}

export default AppointmentBox;