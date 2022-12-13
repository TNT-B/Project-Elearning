import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/_actions';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer2";

// Elements
import Courses from "../elements/profile-content/courses";
import EditProfile from "../elements/profile-content/edit-profile";
import ChangePassword from "../elements/profile-content/change-password";

// Images
import bannerImg from '../assets/images/banner/banner1.jpg';
import profilePic1 from '../assets/images/profile/pic1.jpg';

function Profile() {
	const  {users} = useSelector(state => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.getAll());
	}, []);
	useEffect(() => {
		renderProfileUser();		
	}, [users]);


	
	const renderProfileUser = () => {
		if (users !== undefined) {
			return (
				<Fragment>
					<h4>{users.hoTen}</h4>
					<span>{users.email}</span>
				</Fragment>
			)
		}
		return (
			<Fragment>
				<h4>Join Doe</h4>
				<span>joindoe@gmail.com</span>
			</Fragment>
		)

	}
	return (
		<>
			<Header />

			<div className="page-content">

				<div className="page-banner ovbl-dark" style={{ backgroundImage: "url(" + bannerImg + ")" }}>
					<div className="container">
						<div className="page-banner-entry">
							<h1 className="text-white">Hồ sơ</h1>
						</div>
					</div>
				</div>
				<div className="breadcrumb-row">
					<div className="container">
						<ul className="list-inline">
							<li><Link to="/">Trang chủ</Link></li>
							<li>Hồ sơ</li>
						</ul>
					</div>
				</div>

				<div className="content-block">

					<div className="section-area section-sp1">
						<div className="container">
							<Tab.Container defaultActiveKey="tabOne">
								<Tab.Content>
									<div className="row">
										<div className="col-lg-3 col-md-4 col-sm-12 m-b30">
											<div className="profile-bx text-center">
												<div className="user-profile-thumb">
													<img src={profilePic1} alt="" />
												</div>
												<div className="profile-info">
													{renderProfileUser()}
												</div>
												<div className="profile-social">
													<ul className="list-inline m-a0">
														<li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
														<li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
														<li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
														<li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
													</ul>
												</div>
												<div className="profile-tabnav">
													<Nav className="nav-tabs">
														<Nav.Item><Nav.Link eventKey="tabOne"><i className="ti-book"></i>Khóa học</Nav.Link></Nav.Item>														
														<Nav.Item><Nav.Link eventKey="tabThree"><i className="ti-pencil-alt"></i>Cập nhật thông tin tài khoản</Nav.Link></Nav.Item>
														<Nav.Item><Nav.Link eventKey="tabFour"><i className="ti-lock"></i>Thay đổi mật khẩu</Nav.Link></Nav.Item>
													</Nav>
												</div>
											</div>
										</div>
										<div className="col-lg-9 col-md-8 col-sm-12 m-b30">
											<div className="profile-content-bx">
												<div className="tab-content">
													<Tab.Pane eventKey="tabOne">
														<Courses />
													</Tab.Pane>													
													<Tab.Pane eventKey="tabThree">
														<EditProfile />
													</Tab.Pane>
													<Tab.Pane eventKey="tabFour">
														<ChangePassword />
													</Tab.Pane>
												</div>
											</div>
										</div>
									</div>
								</Tab.Content>
							</Tab.Container>
						</div>
					</div>

				</div>

			</div>

			<Footer />

		</>
	);
}

export default Profile;