import React, { useState, useEffect } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/_actions';
import { isPassword, isUserName, isEmail } from '../../redux/_validators'

// Images
import logo from '../assets/images/logo.png';
import bannerImg from '../assets/images/background/bg1.jpg';

function Logins() {
	const [inputs, setInputs] = useState({
		taiKhoan: '',
		matKhau: ''
	});
	const [submitted, setSubmitted] = useState(false);
	const { taiKhoan, matKhau } = inputs;
	const {error} = useSelector(state => state.authentication);
	const dispatch = useDispatch();
	const location = useLocation();

	// reset login status
	useEffect(() => {
		dispatch(userActions.logout());
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs(inputs => ({ ...inputs, [name]: value }));
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setSubmitted(true);
		if (isUserName(taiKhoan,'Tài khoản') && isPassword(matKhau,'Mật khẩu')) {
			// get return url from location state or default to home page
			const { from } = location.state || { from: { pathname: "/" } };
			dispatch(userActions.login(taiKhoan, matKhau, from));


		}
	}
	return (
		<>

			<div className="account-form">
				<div className="account-head" style={{ backgroundImage: "url(" + bannerImg + ")" }}>					
				</div>
				<div className="account-form-inner">
					<div className="account-container">
						<div style={{textAlign: 'center', marginBottom	: 20}}>
							<Link to="/"><img src={logo} alt="" /></Link>
						</div>
						<div className="heading-bx left">
							<h2 className="title-head">Đăng nhập <span>tài khoản</span></h2>
							<p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
						</div>
						<form className="contact-bx" onSubmit={handleSubmit}>
							<div className="row placeani">
								<div className="col-lg-12">
									<div className="form-group">
										<div className="input-group">
											{/* <input name="name" type="text" required="" placeholder="Your Name" className="form-control" /> */}
											<input type="text" name="taiKhoan" value={taiKhoan} onChange={handleChange} className={'form-control' + (submitted && !taiKhoan ? ' is-invalid' : '')} />
											{submitted && !taiKhoan &&
												<div className="invalid-feedback">Nhập tài khoản</div>
											}
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<div className="input-group">
											{/* <input name="email" type="password" className="form-control" placeholder="Your Password" required="" /> */}
											<input type="password" name="matKhau" value={matKhau} onChange={handleChange} className={'form-control' + (submitted && !matKhau ? ' is-invalid' : '')} />
											{submitted && !matKhau &&
												<div className="invalid-feedback">Nhập mật khẩu</div>
											}
										</div>										
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group form-forget">
										<div className="custom-control custom-checkbox">
											<input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
											<label className="custom-control-label" htmlFor="customControlAutosizing">Ghi nhớ tôi</label>
										</div>
										<Link to="/forget-password" className="ml-auto">Quên mật khẩu?</Link>
									</div>
								</div>
								<div className="col-lg-12 m-b30">
									<button name="submit" type="submit" value="Submit" className="btn button-md">Login</button>
								</div>
								{/* <div className="col-lg-12">
									<h6 className="m-b15">Login with Social media</h6>
									<Link className="btn flex-fill m-r10 facebook" to="#"><i className="fa fa-facebook"></i>Facebook</Link>
									<Link className="btn flex-fill m-l5 google-plus" to="#"><i className="fa fa-google-plus"></i>Google Plus</Link>
								</div> */}
							</div>
						</form>
					</div>
				</div>
			</div>

		</>
	);
}

export default Logins;