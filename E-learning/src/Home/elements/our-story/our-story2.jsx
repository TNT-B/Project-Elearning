import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video'

// Images
import aboutPic1 from '../../assets/images/about/pic1.jpg';

class OurStory2 extends Component{
	
	constructor () {
		super()
		this.state = {
			isOpen: false
		}
		this.openModal = this.openModal.bind(this)
	}
	openModal () {
		this.setState({isOpen: true})
	}
	
	render(){
		return(
			<>
				<div className="section-area bg-primary section-sp1 our-story popp">
					<div className="container">
						<div className="row align-items-center d-flex">
							<div className="col-lg-5 col-md-12 text-white m-b30">
								<div className="heading-bx style1 mb-3">
									<h2 className="title-head">TECHNO - ĐÀO TẠO CHUYÊN GIA LẬP TRÌNH</h2>								
								</div>
								<p className="m-b30">Đào tạo cho mọi đối tượng từ người trái ngành, người mới bắt đầu, sinh viên công nghệ thông tin đến các bạn đã có có nghề lập trình. Đào tạo ra những lập trình viên tài năng, phát huy tố chất, tư duy lập trình, có định hướng để trở thành những lập trình chuyên nghiệp. Giáo trình được may đo và biên soạn dành riêng cho các bạn học lập trình.</p>
								<Link to="/about-1" className="btn">Chi tiết</Link>
							</div>
							<div className="col-lg-7 col-md-12 heading-bx p-lr">
								<div className="video-bx">
									<img src={aboutPic1} alt=""/>
									<Link onClick={this.openModal} to="#" className="popup-youtube video"><i className="fa fa-play"></i></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='kcSEsljlges' onClose={() => this.setState({isOpen: false})} />
				
			</>
		);
	}
}

export default OurStory2;