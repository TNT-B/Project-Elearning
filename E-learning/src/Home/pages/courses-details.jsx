import React, { useEffect, Fragment, useState } from 'react';
import { Link, useParams, useRouteMatch, matchPath } from 'react-router-dom';
import { Link as ScrollTo } from 'react-scroll';
import { Nav, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/_actions';
import ReactImageFallback from "react-image-fallback";
import { apiConstants } from '../../redux/_constants/api.constants';


// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer2";

// Images
import bannerImg from '../assets/images/banner/banner2.jpg';
import testiPic1 from '../assets/images/testimonials/pic1.jpg';
import testiPic2 from '../assets/images/testimonials/pic2.jpg';
import blogDefaultThum1 from '../assets/images/blog/default/thum1.jpg';

function CoursesDetails() {
	const dispatch = useDispatch();
	const { items, checkedIn } = useSelector(state => state.courses);
	const { user } = useSelector(state => state.authentication);

	const [inputs, setInputs] = useState({
		taiKhoan: '',
		maKhoaHoc: ''
	});

	const { taiKhoan, maKhoaHoc } = inputs;
	const { maKH } = useParams();

	const handleDangKy = async () => {
		await dispatch(courseActions.regiter(maKhoaHoc, taiKhoan, apiConstants.COURSE_REG));
		await dispatch(courseActions.getCourseCheckStudent(apiConstants.COURSE_CHECK_HV + maKH, user));
	}
	const handleHuyDangKy = async () => {
		await dispatch(courseActions.unregiter(maKhoaHoc, taiKhoan, apiConstants.COURSE_CANCEL_REG));
		await dispatch(courseActions.getCourseCheckStudent(apiConstants.COURSE_CHECK_HV + maKH, user));
	}
	useEffect(() => {
		renderCourseDetail();
	}, [checkedIn]);

	useEffect(() => {
		setInputs(inputs => ({ ...inputs, taiKhoan: user?.taiKhoan, maKhoaHoc: items?.maKhoaHoc }));
	}, [user, items]);


	useEffect(() => {
		dispatch(courseActions.getCourseDetail(apiConstants.COURSE_DETAIL + maKH));
		dispatch(courseActions.getCourseCheckStudent(apiConstants.COURSE_CHECK_HV + maKH, user));
	}, [maKH, user]);

	const renderCourseDetail = () => {
		return (
			<div className="content-block">
				<div className="section-area section-sp1">
					<div className="container">
						<div className="row d-flex flex-row-reverse">
							<div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 m-b30" >
								<div className="course-detail-bx">
									<div className="course-price">
										<del>10,000,000 vnd</del>
										<h4 className="price">5,000,000 vnd</h4>
									</div>
									<div className="course-buy-now text-center">
										<Link to="#" className="btn radius-xl" onClick={checkedIn ? () => handleHuyDangKy() : () => handleDangKy()}>{checkedIn ? 'Hủy đăng ký' : 'Đăng ký'}</Link>
									</div>
									<div className="teacher-bx">
										<div className="teacher-info">
											<div className="teacher-thumb">
												{/* <img src={testiPic1} alt="" /> */}
												<ReactImageFallback
													src={items?.hinhAnh}
													fallbackImage={testiPic1}
													initialImage="loader.gif"
													alt={items?.biDanh}
													className="my-image" />
											</div>
											<div className="teacher-name">
												<h5>Nguyễn Anh Khoa</h5>
												<span>Developer</span>
											</div>
										</div>
									</div>
									<div className="cours-more-info">
										<div className="review">
											<span>{items?.luotXem} Xem</span>
											<ul className="cours-star">
												<li className="active"><i className="fa fa-star"></i></li>
												<li className="active"><i className="fa fa-star"></i></li>
												<li className="active"><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
											</ul>
										</div>
										<div className="price categories">
											<span>Categories</span>
											<h5 className="text-primary">{items?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h5>
										</div>
									</div>
									<div className="course-info-list scroll-page">
										<ul className="navbar">
											<li>
												<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"overview"}>
													<i className="ti-zip"></i> Tổng quan
												</ScrollTo>
											</li>
											<li>
												<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"curriculum"}>
													<i className="ti-bookmark-alt"></i> Chương trình học
												</ScrollTo>
											</li>
											<li>
												<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"instructor"}>
													<i className="ti-user"></i> Giáo viên hướng dẫn
												</ScrollTo>
											</li>
											<li>
												<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"reviews"}>
													<i className="ti-comments"></i> Đánh giá
												</ScrollTo>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
								<div className="courses-post">
									<div className="ttr-post-media media-effect">
										<Link to="#">
											<ReactImageFallback
												src={items?.hinhAnh}
												fallbackImage={blogDefaultThum1}
												initialImage="loader.gif"
												alt={items?.biDanh}
												className="my-image" /></Link>
									</div>
									<div className="ttr-post-info m-b30">
										<div className="ttr-post-title ">
											<h2 className="post-title">{items?.tenKhoaHoc}</h2>
										</div>
										<div className="ttr-post-text">
											<p>{items?.moTa}</p>
										</div>
									</div>
								</div>
								<div className="courese-overview" id="overview">
									<h4>Tổng quan</h4>
									<div className="row">
										<div className="col-md-12 col-lg-4">
											<ul className="course-features">
												<li><i className="ti-book"></i> <span className="label">Bài gảng</span> <span className="value">8</span></li>
												<li><i className="ti-help-alt"></i> <span className="label">Câu đố</span> <span className="value">1</span></li>
												<li><i className="ti-time"></i> <span className="label">Thời lượng</span> <span className="value">60 Giờ</span></li>
												<li><i className="ti-stats-up"></i> <span className="label">Trình độ kỹ năng</span> <span className="value">Cơ bản</span></li>
												<li><i className="ti-smallcap"></i> <span className="label">Ngôn ngữ</span> <span className="value">Tiếng việt</span></li>
												<li><i className="ti-user"></i> <span className="label">Số lượng học sinh</span> <span className="value">32</span></li>
												<li><i className="ti-check-box"></i> <span className="label">Đánh giá</span> <span className="value">Có</span></li>
											</ul>
										</div>
										<div className="col-md-12 col-lg-8">
											<h5 className="m-b10">Mô tả khóa học</h5>
											<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
											<h5 className="m-b10">Chứng nhận</h5>
											<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
											<h5 className="m-b10">Kết quả học tập</h5>
											<ul className="list-checked primary">
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
												<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="m-b30" id="curriculum">
									<h4>Chương trình học</h4>
									<ul className="curriculum-list">
										<li>
											<h5>Cấp độ 1</h5>
											<ul>
												<li>
													<div className="curriculum-list-box">
														<span>Bài 1.</span> Lorem Ipsum is simply dummy text
													</div>
													<span>120 phút</span>
												</li>
												<li>
													<div className="curriculum-list-box">
														<span>Bài 2.</span> Lorem Ipsum is simply dummy text
													</div>
													<span>60 phút</span>
												</li>
												<li>
													<div className="curriculum-list-box">
														<span>Bài 3.</span> Lorem Ipsum is simply dummy text
													</div>
													<span>85 phút</span>
												</li>
											</ul>
										</li>
										<li>
											<h5>Cấp độ 2</h5>
											<ul>
												<li>
													<div className="curriculum-list-box">
														<span>Bài 1.</span> Lorem Ipsum is simply dummy text
													</div>
													<span>110 phút</span>
												</li>
												<li>
													<div className="curriculum-list-box">
														<span>Bài 2.</span> Lorem Ipsum is simply dummy text
													</div>
													<span>120 phút</span>
												</li>
												<li>
													<div className="curriculum-list-box">
														<span>Bài 3.</span> Lorem Ipsum is simply dummy text
													</div>
													<span>120 phút</span>
												</li>
											</ul>
										</li>
										<li>
											<h5>Cấp độ cuối</h5>
											<ul>
												<li>
													<div className="curriculum-list-box">
														<span>Phần 1.</span> Bài test cuối
													</div>
													<span>120 phút</span>
												</li>
												<li>
													<div className="curriculum-list-box">
														<span>Phần 2.</span> Bài test trực tuyến
													</div>
													<span>120 phút</span>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div className="" id="instructor">
									<h4>Giáo viên hướng dẫn</h4>
									<div className="instructor-bx">
										<div className="instructor-author">
											<img src={testiPic1} alt="" />
										</div>
										<div className="instructor-info">
											<h6>Keny White </h6>
											<span>Giáo sư</span>
											<ul className="list-inline m-tb10">
												<li><Link to="#" className="btn sharp-sm facebook"><i className="fa fa-facebook"></i></Link></li>
												<li><Link to="#" className="btn sharp-sm twitter"><i className="fa fa-twitter"></i></Link></li>
												<li><Link to="#" className="btn sharp-sm linkedin"><i className="fa fa-linkedin"></i></Link></li>
												<li><Link to="#" className="btn sharp-sm google-plus"><i className="fa fa-google-plus"></i></Link></li>
											</ul>
											<p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
										</div>
									</div>
									<div className="instructor-bx">
										<div className="instructor-author">
											<img src={testiPic2} alt="" />
										</div>
										<div className="instructor-info">
											<h6>Keny White </h6>
											<span>Tiến sĩ</span>
											<ul className="list-inline m-tb10">
												<li><Link to="#" className="btn sharp-sm facebook"><i className="fa fa-facebook"></i></Link></li>
												<li><Link to="#" className="btn sharp-sm twitter"><i className="fa fa-twitter"></i></Link></li>
												<li><Link to="#" className="btn sharp-sm linkedin"><i className="fa fa-linkedin"></i></Link></li>
												<li><Link to="#" className="btn sharp-sm google-plus"><i className="fa fa-google-plus"></i></Link></li>
											</ul>
											<p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
										</div>
									</div>
								</div>
								<div className="" id="reviews">
									<h4>Đánh giá</h4>

									<div className="review-bx">
										<div className="all-review">
											<h2 className="Đánh giá-type">3</h2>
											<ul className="cours-star">
												<li className="active"><i className="fa fa-star"></i></li>
												<li className="active"><i className="fa fa-star"></i></li>
												<li className="active"><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
											</ul>
											<span>3 lượt đánh giá</span>
										</div>
										<div className="review-bar">
											<div className="bar-bx">
												<div className="side">
													<div>5 star</div>
												</div>
												<div className="middle">
													<div className="bar-container">
														<div className="bar-5" style={{ width: "90%" }}></div>
													</div>
												</div>
												<div className="side right">
													<div>150</div>
												</div>
											</div>
											<div className="bar-bx">
												<div className="side">
													<div>4 star</div>
												</div>
												<div className="middle">
													<div className="bar-container">
														<div className="bar-5" style={{ width: "70%" }}></div>
													</div>
												</div>
												<div className="side right">
													<div>140</div>
												</div>
											</div>
											<div className="bar-bx">
												<div className="side">
													<div>3 star</div>
												</div>
												<div className="middle">
													<div className="bar-container">
														<div className="bar-5" style={{ width: "50%" }}></div>
													</div>
												</div>
												<div className="side right">
													<div>120</div>
												</div>
											</div>
											<div className="bar-bx">
												<div className="side">
													<div>2 star</div>
												</div>
												<div className="middle">
													<div className="bar-container">
														<div className="bar-5" style={{ width: "40%" }}></div>
													</div>
												</div>
												<div className="side right">
													<div>110</div>
												</div>
											</div>
											<div className="bar-bx">
												<div className="side">
													<div>1 star</div>
												</div>
												<div className="middle">
													<div className="bar-container">
														<div className="bar-5" style={{ width: "20%" }}></div>
													</div>
												</div>
												<div className="side right">
													<div>80</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>

						</div>
					</div>
				</div>

			</div>
		)
	};

	return (
		<>

			<Header />

			<div className="page-content">

				<div className="page-banner ovbl-dark" style={{ backgroundImage: "url(" + bannerImg + ")" }}>
					<div className="container">
						<div className="page-banner-entry">
							<h1 className="text-white">Chi tiết khóa học</h1>
						</div>
					</div>
				</div>
				<div className="breadcrumb-row">
					<div className="container">
						<ul className="list-inline">
							<li><Link to="/">Trang chủ</Link></li>
							<li>Chi tiết khóa học</li>
						</ul>
					</div>
				</div>
				{renderCourseDetail()}
			</div>

			<Footer />

		</>
	);

}


export default CoursesDetails;