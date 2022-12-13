import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/_actions';
import { isPassword, isUserName, isEmail } from '../../redux/_validators'
import { message } from 'antd';

// Images
import bannerImg from '../assets/images/background/bg2.jpg';
import logo from '../assets/images/logo.png';

function Register() {
	const [inputs, setInputs] = useState({
		taiKhoan: '',
		matKhau: '',
		hoTen: '',
		email: '',
		soDT: '',
		maNhom: 'GP01'
	});
	const { loggedIn, user } = useSelector(state => state.authentication);
	const { taiKhoan, matKhau, email, hoTen } = inputs;
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		renderRegister();
	}, [inputs]);

	// useEffect(() => {
	// 	// dispatch(userActions.logout());		
	// }, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs(inputs => ({ ...inputs, [name]: value }));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!loggedIn && isUserName(taiKhoan, 'Tài khoản') && isPassword(matKhau, 'Mật khẩu') && isEmail(email, 'Email')) {
			dispatch(userActions.register(inputs, location.pathname));
		}
	}

	const renderRegister = () => {
		if (!loggedIn) {
			return (
				<Fragment>

					<div className="heading-bx left">
						<h2 className="title-head">Đăng ký <span>tài khoản</span></h2>
						<p>Đăng nhập tài khoản <Link to="/login">Nhấp vào đây</Link></p>
					</div>
					<form className="contact-bx" onSubmit={handleSubmit}>
						<div className="row placeani">
							<div className="col-lg-12">
								<div className="form-group">
									<div className="input-group">
										<input name="taiKhoan" type="text" placeholder="Tài khoản" onChange={handleChange} value={taiKhoan} className="form-control" />
									</div>
								</div>
							</div>

							<div className="col-lg-12">
								<div className="form-group">
									<div className="input-group">
										<input name="matKhau" type="password" placeholder="Mật khẩu" onChange={handleChange} value={matKhau} className="form-control" />
									</div>
								</div>
							</div>

							<div className="col-lg-12">
								<div className="form-group">
									<div className="input-group">
										<input name="hoTen" type="text" placeholder="Họ và tên" onChange={handleChange} value={hoTen} className="form-control" />
									</div>
								</div>
							</div>

							<div className="col-lg-12">
								<div className="form-group">
									<div className="input-group">
										<input name="email" type="email" placeholder="Địa chỉ email" onChange={handleChange} value={email} className="form-control" />
									</div>
								</div>
							</div>
							<div className="col-lg-12 m-b30">
								<button name="submit" type="submit" className="btn button-md">Đăng ký</button>
							</div>
						</div>
					</form>
				</Fragment>
			)
		}
		return (
			<Fragment>

				<div className="heading-bx left">
					<h2 className="title-head">Đăng ký <span>tài khoản</span></h2>
					<p>Xin chào {user.hoTen} <Link to="/" onClick={() => {
						dispatch(userActions.logout())
					}}>Đăng xuất</Link></p>
				</div>
			</Fragment>
		)


	}

	return (
		<>
			<div className="account-form">
				<div className="account-head" style={{ backgroundImage: "url(" + bannerImg + ")" }}>
				</div>
				<div className="account-form-inner">
					<div className="account-container">
						<div style={{ textAlign: 'center', marginBottom: 20 }}>
							<Link to="/"><img src={logo} alt="" /></Link>
						</div>
						{renderRegister()}
					</div>
				</div>
			</div>

		</>
	);

}

export default Register;