import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/_actions';
import ReactImageFallback from "react-image-fallback";
import { Pagination } from 'antd';
import { apiConstants } from '../../redux/_constants/api.constants';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer2";

// Images
import bannerImg from '../assets/images/banner/banner3.jpg';
import coursesPic1 from '../assets/images/courses/pic1.jpg';
import coursesPic2 from '../assets/images/courses/pic2.jpg';
import coursesPic3 from '../assets/images/courses/pic3.jpg';
import coursesPic4 from '../assets/images/courses/pic4.jpg';
import coursesPic5 from '../assets/images/courses/pic5.jpg';
import coursesPic6 from '../assets/images/courses/pic6.jpg';
import coursesPic7 from '../assets/images/courses/pic7.jpg';
import coursesPic8 from '../assets/images/courses/pic8.jpg';
import coursesPic9 from '../assets/images/courses/pic9.jpg';


const initCourses = {
	allCourse: [],
	totalPage: 0,
	current: 1,
	minIndex: 0,
	maxIndex: 0,
	pageSize: 6,
};

const content = [
	{
		Thumb: coursesPic1,
		Title: "Introduction EduChamp – LMS plugin",
		Tag: "Programming",
		Review: 3,
		PriceDel: 120,
		Price: 190,
	},
	{
		Thumb: coursesPic2,
		Title: "Learn PHP Programming From Scratch",
		Tag: "Developing",
		Review: 4,
		PriceDel: 180,
		Price: 150,
	},
	{
		Thumb: coursesPic3,
		Title: "Master Microservices with Spring",
		Tag: "Coding",
		Review: 2,
		PriceDel: 520,
		Price: 234,
	},
	{
		Thumb: coursesPic4,
		Title: "Build A Full Web Chat App From Scratch",
		Tag: "Marketing",
		Review: 3,
		PriceDel: 320,
		Price: 260,
	},
	{
		Thumb: coursesPic4,
		Title: "Strategy Law And Organization",
		Tag: "Lerning",
		Review: 4,
		PriceDel: 120,
		Price: 260,
	},
	{
		Thumb: coursesPic5,
		Title: "Fundamentals Of Music Theory Learn New",
		Tag: "Programming",
		Review: 1,
		PriceDel: 140,
		Price: 240,
	},
	{
		Thumb: coursesPic7,
		Title: "Introduction EduChamp – LMS plugin",
		Tag: "Programming",
		Review: 3,
		PriceDel: 120,
		Price: 190,
	},
	{
		Thumb: coursesPic8,
		Title: "Learn PHP Programming From Scratch",
		Tag: "Developing",
		Review: 4,
		PriceDel: 180,
		Price: 150,
	},
	{
		Thumb: coursesPic9,
		Title: "Master Microservices with Spring",
		Tag: "Coding",
		Review: 2,
		PriceDel: 520,
		Price: 234,
	},
	{
		Thumb: coursesPic4,
		Title: "Build A Full Web Chat App From Scratch",
		Tag: "Marketing",
		Review: 3,
		PriceDel: 320,
		Price: 260,
	},
	{
		Thumb: coursesPic6,
		Title: "Strategy Law And Organization ",
		Tag: "Lerning",
		Review: 4,
		PriceDel: 120,
		Price: 260,
	},
	{
		Thumb: coursesPic2,
		Title: "Fundamentals Of Music Theory Learn New",
		Tag: "Programming",
		Review: 1,
		PriceDel: 140,
		Price: 240,
	},
];
const contentCourses = {
	maDanhMuc: "",
	tenDanhMuc: "",
};
let allCourse = 0;
let maDM = 'BackEnd';
let maNh = 'GP01';

function Courses() {
	const { items_courses, items_group } = useSelector(state => state.courses);
	const [courseAll, setCourseALL] = useState(initCourses);
	const [inputs, setInputs] = useState({
		tenKhoaHoc: ''
	});

	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(courseActions.getAll(apiConstants.COURSE_GROUP));
		setCourseALL(courseAll => ({ ...courseAll, minIndex: 0, maxIndex: courseAll.pageSize, totalPage: allCourse / courseAll.pageSize }));
	}, []);

	useEffect(() => {
		dispatch(courseActions.getAllCourse(apiConstants.COURSE_GROUPBY + `maDanhMuc=${maDM}&maNhom=${maNh}`));
	}, [1]);

	useEffect(() => {
		renderCourseGroup();
	}, [items_group]);

	useEffect(() => {
		allCourse = items_courses?.length;
		setCourseALL(courseAll => ({ ...courseAll, minIndex: 0, maxIndex: courseAll.pageSize, totalPage: allCourse / courseAll.pageSize }));
		renderCourseGroupBy(allCourse);
	}, [items_courses]);


	const handleChangePage = (page) => {
		setCourseALL(courseAll => ({ ...courseAll, current: page, minIndex: (page - 1) * courseAll.pageSize, maxIndex: page * courseAll.pageSize }));
	}
	const handleDanhMuc = (maDanhMuc) => {
		dispatch(courseActions.getAllCourse(apiConstants.COURSE_GROUPBY + `maDanhMuc=${maDanhMuc}&maNhom=${maNh}`));
	}
	const handleSearch = () => {
		dispatch(courseActions.getAllCourse(apiConstants.COURSE_LIST_SEARCH + `tenKhoaHoc=${inputs.tenKhoaHoc}&maNhom=${maNh}`));
	}
	const handleChangeSearch = (e) => {
		const { name, value } = e.target;
		setInputs(inputs => ({ ...inputs, [name]: value }));
	}
	const renderCourseGroup = () => {
		if (items_group === undefined) {
			return <ul>
				<li><Link to="/courses">{contentCourses.tenDanhMuc}</Link></li>
			</ul>
		}
		return items_group?.map((courses, index) => {
			return <ul key={index}>
				<li><Link to="/courses" onClick={() => handleDanhMuc(courses.maDanhMuc)}>{courses.tenDanhMuc}</Link></li>
			</ul>
		})

	}
	const renderCourseGroupBy = (allCourse) => {
		if (items_courses === undefined) {
			return content?.map((item) => {
				return <div className="col-md-6 col-lg-4 col-sm-6 m-b30">
					<div className="cours-bx">
						<div className="action-box">
							<img src={item.Thumb} alt="" />
							<Link to="/courses-details" className="btn">Read More</Link>
						</div>
						<div className="info-bx">
							<span>{item.Tag}</span>
							<h6><Link to="/courses-details">{item.Title}</Link></h6>
						</div>
						<div className="cours-more-info">
							<div className="review">
								<span>{item.Review} Review</span>
								<ul className="cours-star">
									<li className="active"><i className="fa fa-star"></i></li>
									<li className="active"><i className="fa fa-star"></i></li>
									<li className="active"><i className="fa fa-star"></i></li>
									<li><i className="fa fa-star"></i></li>
									<li><i className="fa fa-star"></i></li>
								</ul>
							</div>
							<div className="price">
								<del>${item.PriceDel}</del>
								<h5>${item.Price}</h5>
							</div>
						</div>
					</div>
				</div>
			})
		}
		return (
			<div className="col-lg-9 col-md-8 col-sm-12" >
				<div className="row">
					{items_courses?.map((courses, index) => index >= courseAll.minIndex && index < courseAll.maxIndex && (
						<div className="col-md-6 col-lg-4 col-sm-6 m-b30" >
							<div className="cours-bx" key={index}>
								<div className="action-box action-box-course">
									<Link to={`/courses-details/${courses.maKhoaHoc}`}>
										<ReactImageFallback
											src={courses.hinhAnh}
											fallbackImage={coursesPic1}
											initialImage="loader.gif"
											alt={courses.biDanh}
											className="my-image" />
									</Link>
									<Link to={`/courses-details/${courses.maKhoaHoc}`} className="btn">Chi tiết</Link>
								</div>
								<div className="info-bx">
									<span>{courses?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</span>
									<h6><Link to={`/courses-details/${courses.maKhoaHoc}`}>{courses.tenKhoaHoc}</Link></h6>
								</div>
								<div className="cours-more-info">
									<div className="review">
										<span>{courses?.luotXem} Xem</span>
										<ul className="cours-star">
											<li className="active"><i className="fa fa-star"></i></li>
											<li className="active"><i className="fa fa-star"></i></li>
											<li className="active"><i className="fa fa-star"></i></li>
											<li><i className="fa fa-star"></i></li>
											<li><i className="fa fa-star"></i></li>
										</ul>
									</div>
									<div className="course-des">
										<p>{courses?.moTa}</p>
									</div>
								</div>
							</div>
						</div>))}

					<div className="col-lg-12 m-b20">
						<div className="pagination-bx rounded-sm gray clearfix">
							<Pagination
								pageSize={courseAll.pageSize}
								current={courseAll.current}
								// total={courseAll.allCourse.length}
								total={allCourse}
								onChange={handleChangePage}
								style={{ bottom: "0px" }}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>

			<Header />

			<div className="page-content">

				<div className="page-banner ovbl-dark" style={{ backgroundImage: "url(" + bannerImg + ")" }}>
					<div className="container">
						<div className="page-banner-entry">
							<h1 className="text-white">Danh sách các khóa học</h1>
						</div>
					</div>
				</div>
				<div className="breadcrumb-row">
					<div className="container">
						<ul className="list-inline">
							<li><Link to="/">Trang chủ</Link></li>
							<li>Danh sách các khóa học</li>
						</ul>
					</div>
				</div>

				<div className="content-block">
					<div className="section-area section-sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-3 col-md-4 col-sm-12">
									<div className="widget widget_archive">
										<h5 className="widget-title style-1">Danh mục khóa học</h5>
										{renderCourseGroup()}
									</div>
									<div className="widget">
										<h6 className="widget-title">Tìm kiếm khóa học</h6>
										<div className="search-bx style-1">
											<form role="search">
												<div className="input-group">
													<input name="tenKhoaHoc" className="form-control" placeholder="Nhập từ khóa..." type="text" value={inputs.tenKhoaHoc} onChange={handleChangeSearch} />
													<span className="input-group-btn">
														<button type="button" className="btn" onClick={handleSearch}><i className="fa fa-search"></i></button>
													</span>
												</div>
											</form>
										</div>
									</div>
								</div>
								{renderCourseGroupBy(allCourse)}
							</div>
						</div>
					</div>

				</div>

			</div>

			<Footer />

		</>
	);
}


export default Courses;