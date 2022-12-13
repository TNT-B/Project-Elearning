import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../../redux/_actions';
import ReactImageFallback from "react-image-fallback";
import { Pagination } from 'antd';
import { apiConstants } from '../../../redux/_constants/api.constants';
import Masonry from 'react-masonry-component';

// Images
import coursesPic1 from '../../assets/images/courses/pic1.jpg';

const initCourses = {
	// allCourse: [],
	totalPage: 0,
	current: 1,
	minIndex: 0,
	maxIndex: 0,
	pageSize: 6,
};
let allCourse = 0;
const maNh = 'GP01';

function CoursesContent() {

	const dispatch = useDispatch();
	const { items_courses, items_coursess } = useSelector(state => state.courses);
	const { users } = useSelector(state => state.users);
	const [tag, setTag] = useState('All');
	const [courseAll, setCourseALL] = useState(initCourses);

	const FilterList = ({ dataFilter, activeFilter }) => {
		return (
			<li className={`${activeFilter ? 'btn active' : 'btn'}`} onClick={() => {
				if (dataFilter === 'Tất cả') {
					setTag('All');
					dispatch(courseActions.filterCourse(items_coursess, items_courses, users.chiTietKhoaHocGhiDanh, 'All'));
				}
				else if (dataFilter === 'Đã đăng ký') {
					setTag('Publish');
					dispatch(courseActions.filterCourse(items_coursess, items_courses, users.chiTietKhoaHocGhiDanh, 'Publish'));
				}
				else if (dataFilter === 'Chưa đăng ký') {
					setTag('Pending');
					dispatch(courseActions.filterCourse(items_coursess, items_courses, users.chiTietKhoaHocGhiDanh, 'Pending'));
				}
				else
					return
			}}>
				<Link to={"#"}>{dataFilter}</Link>
			</li >
		);
	};

	useEffect(() => {
		dispatch(courseActions.getAllCourse(apiConstants.COURSE_LIST,"GET"));
		setCourseALL(courseAll => ({ ...courseAll, minIndex: 0, maxIndex: courseAll.pageSize, totalPage: allCourse / courseAll.pageSize }));
	}, []);	

	useEffect(() => {
		allCourse = items_coursess?.length;
		setCourseALL(courseAll => ({ ...courseAll, minIndex: 0, maxIndex: courseAll.pageSize, totalPage: allCourse / courseAll.pageSize, current: 1 }));
		// renderCourse(allCourse);
	}, [items_coursess]);

	const handleChangePage = (page) => {
		setCourseALL(courseAll => ({ ...courseAll, current: page, minIndex: (page - 1) * courseAll.pageSize, maxIndex: page * courseAll.pageSize }));
	}

	const renderCourse = () => {
		return <div className="row">

			{items_coursess?.map((courses, index) => index >= courseAll.minIndex && index < courseAll.maxIndex && (
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
						defaultCurrent="1"
						pageSize={courseAll.pageSize}
						current={courseAll.current}
						total={allCourse}
						onChange={handleChangePage}
						style={{ bottom: "0px" }}
					/>
				</div>
			</div>
		</div>

	}

	return (

		<>

			<div className="profile-head">
				<h5>Danh sách khóa học</h5>
				<div className="feature-filters style1 ml-auto">
					<ul className="filters" data-toggle="buttons">
						<FilterList
							dataFilter="Tất cả"
							defaultTag={setTag}
							activeFilter={tag === 'All' ? true : false}
						/>
						<FilterList
							dataFilter="Đã đăng ký"
							defaultTag={setTag}
							activeFilter={tag === 'Publish' ? true : false}
						/>
						<FilterList
							dataFilter="Chưa đăng ký"
							defaultTag={setTag}
							activeFilter={tag === 'Pending' ? true : false}
						/>
					</ul>
				</div>
			</div>

			<div className="courses-filter">
				{renderCourse(allCourse)}
				<Masonry>

				</Masonry>
			</div>

		</>

	);
}

export default CoursesContent;