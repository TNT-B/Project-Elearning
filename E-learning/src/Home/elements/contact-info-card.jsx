import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';

class ContactInfoCard extends Component{
	render(){
		return(
			<>
				<div className="bg-primary text-white contact-info-bx">
					<div className="heading-bx left mb-4">
						<h3 className="m-b10 title-head">Thông tin <span> liên hệ</span></h3>
						<p className="m-b0">It is a long established fact that a reader will be distracted</p>
					</div>
					<div className="widget widget_getintuch">	
						<ul>
							<li><i className="ti-location-pin"></i>** Cơ sở 1 - Trụ sở chính: Tầng 5, 71 Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội</li>
							<li><i className="ti-location-pin"></i>** Cơ sở 2: Lầu 9, Tòa nhà International Plaza, Số 343 Phạm Ngũ Lão, Quận 1, TP HCM</li>
								<li><i className="ti-location-pin"></i>**Cơ sở 3: Số 672A28 Phan Văn Trị, Phường 10, Quận Gò Vấp, TP HCM</li>
								<li><i className="ti-location-pin"></i>**Cơ sở 4: Lầu 2, Số 2 Song Hành, Phường An Phú, Quận 2, TP HCM</li>
								<li><i className="ti-location-pin"></i>**Cơ sở 5: 22-24 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, TP HCM</li>
								<li><i className="ti-location-pin"></i>**Cơ sở 6: Lầu 8, Tòa nhà Nam Giao, 261-263 Phan Xích Long, Phường 2, Quận Phú Nhuận, TP HCM</li>
								<li><i className="ti-location-pin"></i>...</li>
							<li><i className="ti-mobile"></i>(+84) 02477717888</li>
							<li><i className="ti-email"></i>info@techno.edu.vn</li>
						</ul>
					</div>
					<h5 className="m-t0 m-b20">Follow Us</h5>
					<ul className="list-inline contact-social-bx m-b0">
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-facebook"></i></Link></li>
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-twitter"></i></Link></li>
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-linkedin"></i></Link></li>
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-google-plus"></i></Link></li>
					</ul>
				</div>
			</>
		);
	}
}

export default ContactInfoCard;