import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/_actions';
import Sticky from 'react-stickynode';
import USER from '../../assets/images/profile/pic1.jpg';

import { Popover, Menu } from 'antd';

// Images
import logo from '../../assets/images/logo.png';

function Header() {
	const { user } = useSelector(state => state.authentication);
	const dispatch = useDispatch();

	useEffect(() => {
		// Update the document title using the browser API
		// Search Form Popup
		let searchBtn = document.getElementById("quik-search-btn")
		let searchForm = document.querySelector(".nav-search-bar")
		let closeBtn = document.getElementById("search-remove")

		searchBtn.addEventListener('click', () => {
			searchForm.classList.add("show")
		})

		closeBtn.addEventListener('click', () => {
			searchForm.classList.remove("show")
		})

		// Mobile Menu sidebar function
		let btn = document.querySelector('.menuicon');
		let nav = document.querySelector('.menu-links');

		let toggleFunc = () => {
			btn.classList.toggle("open");
			nav.classList.toggle("show");
		}

		btn.addEventListener('click', toggleFunc);

		// Mobile Submenu open close function
		let navMenu = [].slice.call(document.querySelectorAll('.menu-links > ul > li'));
		for (let y = 0; y < navMenu.length; y++) {
			navMenu[y].addEventListener('click', function () { menuClick(this) });
		}

		let menuClick = (current) => {
			let active = current.classList.contains("open")
			navMenu.forEach(el => el.classList.remove('open'));

			if (active) {
				current.classList.remove('open')
				// console.log("active")
			} else {
				current.classList.add('open');
				// console.log("close")
			}
		}	
	});
	useEffect(() => {
		renderUser();
	}, [user]);

	const renderUser = () => {
		if (user !== undefined) {
			const content = (
				<Menu>					
					<Menu.Item ><Link to="/profile">Hồ sơ</Link></Menu.Item>
					<Menu.Item ><Link to="/" onClick={() => {
                        dispatch(userActions.logout())
                    }}>Đăng xuất</Link></Menu.Item>
				</Menu>
			);
			return (
				<Fragment>
					{/* User Menu */}
					<li className="nav-item dropdown has-arrow logged-item">
						<Popover content={content}>
							<a href="#" className="dropdown-toggle nav-link">
								<span className="user-img">
									<img className="rounded-circle" src={USER} width={31} alt={user.hoTen} /> {user.hoTen}
								</span>
							</a>
						</Popover>
					</li>
					{/* /User Menu */}					
				</Fragment>
			)
		}
		return (
			<Fragment>
				<li><Link to="/login">Đăng nhập</Link></li>
				<li><Link to="/register">Đăng ký</Link></li>
			</Fragment>
		)
	}
	return (
		<>
			<header className="header rs-nav header-transp arent">
				<div className="top-bar">
					<div className="container">
						<div className="row d-flex justify-content-between">
							<div className="topbar-left">
								<ul>
									<li><Link to="#"><i className="fa fa-envelope-o"></i>Support@website.com</Link></li>
								</ul>
							</div>
							<div className="topbar-right">
								<ul>
									<li>
										<select className="header-lang-bx">
											<option data-icon="flag flag-vi">Tiếng Việt</option>
											<option data-icon="flag flag-us">English US</option>
										</select>
									</li>

									{renderUser()}
									{/* <li><Link to="/register">Đăng ký</Link></li> */}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Sticky enabled={true} className="sticky-header navbar-expand-lg">
					<div className="menu-bar clearfix">
						<div className="container clearfix">
							{/* <!-- Header Logo ==== --> */}
							<div className="menu-logo">
								<Link to="/"><img src={logo} alt="" /></Link>
							</div>
							{/* <!-- Mobile Nav Button ==== --> */}
							<button className="navbar-toggler collapsed menuicon justify-content-end" type="button" data-toggle="collapse" data-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false" aria-label="Toggle navigation">
								<span></span>
								<span></span>
								<span></span>
							</button>
							{/* <!-- Author Nav ==== --> */}
							<div className="secondary-menu">
								<div className="secondary-inner">
									<ul>
										<li><Link to="#" className="btn-link"><i className="fa fa-facebook"></i></Link></li>
										<li><Link to="#" className="btn-link"><i className="fa fa-google-plus"></i></Link></li>
										<li><Link to="#" className="btn-link"><i className="fa fa-linkedin"></i></Link></li>
										{/* <!-- Search Button ==== --> */}
										<li className="search-btn"><button id="quik-search-btn" type="button" className="btn-link"><i className="fa fa-search"></i></button></li>
									</ul>
								</div>
							</div>
							{/* <!-- Navigation Menu ==== --> */}
							<div className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
								<div className="menu-logo">
									<Link to="/"><img src={logo} alt="" /></Link>
								</div>
								<ul className="nav navbar-nav">
									<li className="active"><Link to="/">Trang chủ</Link>
									</li>
									<li className="add-mega-menu"><Link to="/courses">Khóa học</Link>
									</li>									
									<li><Link to="/contact-1">Liên hệ</Link>
									</li>
								</ul>
								<div className="nav-social-link">
									<Link to="#"><i className="fa fa-facebook"></i></Link>
									<Link to="#"><i className="fa fa-google-plus"></i></Link>
									<Link to="#"><i className="fa fa-linkedin"></i></Link>
								</div>
							</div>
							{/* <!-- Navigation Menu END ==== --> */}
						</div>
					</div>
				</Sticky>
				{/* <!-- Search Box ==== --> */}
				<div className="nav-search-bar">
					<form action="#">
						<input name="search" type="text" className="form-control" placeholder="Tìm kiếm" />
						<span><i className="ti-search"></i></span>
					</form>
					<span id="search-remove"><i className="ti-close"></i></span>
				</div>
			</header>
		</>
	);
}

export default Header;
