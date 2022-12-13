import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';

// Images
import galleryPic1 from '../../assets/images/gallery/pic1.jpg';
import galleryPic2 from '../../assets/images/gallery/pic2.jpg';
import galleryPic3 from '../../assets/images/gallery/pic3.jpg';
import galleryPic4 from '../../assets/images/gallery/pic4.jpg';
import galleryPic5 from '../../assets/images/gallery/pic5.jpg';
import galleryPic6 from '../../assets/images/gallery/pic6.jpg';
import galleryPic7 from '../../assets/images/gallery/pic7.jpg';
import galleryPic8 from '../../assets/images/gallery/pic8.jpg';

const content = [
	{
		thumb: galleryPic1,
	},
	{
		thumb: galleryPic2,
	},
	{
		thumb: galleryPic3,
	},
	{
		thumb: galleryPic4,
	},
	{
		thumb: galleryPic5,
	},
	{
		thumb: galleryPic6,
	},
	{
		thumb: galleryPic7,
	},
	{
		thumb: galleryPic8,
	},
]

const options = {
	settings: {
		overlayColor: "rgba(0,0,0,0.9)",
		backgroundColor: "#3f3e85",
		slideAnimationType: 'slide',
	},
	buttons: {
		backgroundColor: "#3f3e85",
		iconColor: "rgba(255, 255, 255, 1)",
		showDownloadButton: false,
		showAutoplayButton: false,
		showThumbnailsButton: false,
	},
	caption: {
		captionColor: "#3f3e85",
		captionFontFamily: "Raleway, sans-serif",
		captionFontWeight: "300",
		captionTextTransform: "uppercase",
	}
};

function GalleryImg(){
	return(
		<>
			<SimpleReactLightbox>
				<SRLWrapper options={options}>
					<ul className="magnific-image">
						{content.map((item) => (
							<li><img src={item.thumb} alt=""/></li>
						))}
					</ul>
				</SRLWrapper>
			</SimpleReactLightbox>	
		</>
	);
}

class Footer2 extends Component{
	render(){
		return(
			<>
				<footer className="footer-white">
					<div className="footer-top bt0">
						<div className="container">
							<div className="subscribe-box">
								<div className="subscribe-title m-b20"><h4>Đăng ký để nhận tin tức hàng tuần qua email.</h4></div>
								<div className="subscribe-form m-b20">
									<form className="subscription-form">
										<div className="ajax-message"></div>
										<div className="input-group">
											<input name="email" required="required"  className="form-control" placeholder="Email của bạn" type="email"/>
											<span className="input-group-btn">
												<button name="submit" value="Submit" type="submit" className="btn radius-xl">Đăng ký</button>
											</span> 
										</div>
									</form>
								</div>
							</div>
							<div className="row">
								<div className="col-4 col-lg-3 col-md-2 col-sm-6">
									<div className="widget footer_widget">
										<h6 className="footer-title">Công ty</h6>
										<ul>
											<li><Link to="/">Trang chủ</Link></li>
											<li><Link to="/about-1">Về chúng tôi</Link></li>
											<li><Link to="/faq-1">FAQs</Link></li>
											<li><Link to="/contact-1">Liên hệ</Link></li>
										</ul>
									</div>
								</div>
								<div className="col-4 col-lg-3 col-md-3 col-sm-6">
									<div className="widget footer_widget">
										<h6 className="footer-title">Kênh giao tiếp</h6>
										<ul>
											<li><Link to="/admin">Bảng quản trị</Link></li>
											<li><Link to="/blog-classic-grid">Blog</Link></li>																					
										</ul>
									</div>
								</div>
								<div className="col-4 col-lg-3 col-md-2 col-sm-6">
									<div className="widget footer_widget">
										<h6 className="footer-title">Các khóa học</h6>
										<ul>
											<li><Link to="/courses">Khóa học</Link></li>											
										</ul>
									</div>
								</div>
								<div className="col-12 col-lg-3 col-md-5 col-sm-6 footer-col-4">
									<div className="widget widget_gallery gallery-grid-4">
										<h6 className="footer-title">Hình ảnh</h6>
										<GalleryImg />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 text-center"> © 2022 <span className="text-primary">Nhóm 1.2 lớp CIJS77</span></div>
							</div>
						</div>
					</div>
				</footer>
				
			</>
		);
	}
}

export default Footer2;
