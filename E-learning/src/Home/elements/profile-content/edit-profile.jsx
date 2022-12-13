import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/_actions';


export default function EditProfile() {
	const dispatch = useDispatch();
	// const users = { hoTen: '', soDT: '', email: '' };
	const { users } = useSelector(state => state.users);
	//copy user form redux pass to state
	const [userV, setUser] = useState(users);
	//gan co submit
	const [submitted, setSubmitted] = useState(false);


	//render lai khi redux thay doi 	

	useEffect(() => {
		//load lai state userV khi thay doi items
		setUser(users);
		renderEditProfile();
	}, [users]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser(userV => ({ ...userV, [name]: value }));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		dispatch(userActions.update(userV));
	}

	const renderEditProfile = () => {
		if (userV !== undefined) {
			return (
				<Fragment>
					<form className="edit-profile" onSubmit={handleSubmit}>
						<div className="">
							<div className="form-group row">
								<div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
									<h3>1. Thông tin cá nhân</h3>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Họ tên</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input name="hoTen" type="text" value={userV.hoTen} onChange={handleChange} className="form-control" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Số điện thoại</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" name="soDT" type="text" value={userV.soDT} onChange={handleChange} />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Email</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" name="email" type="text" value={userV.email} onChange={handleChange} />
								</div>
							</div>

							<div className="seperator"></div>

							<div className="form-group row">
								<div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
									<h3>2. Địa chỉ</h3>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Địa chỉ</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" type="text" value="" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Thành phố</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" type="text" value="" />
								</div>
							</div>

							<div className="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>

							<div className="form-group row">
								<div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
									<h3 className="m-form__section">3. Links mạng xã hội</h3>
								</div>
							</div>

							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Linkedin</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" type="text" value="www.linkedin.com" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Facebook</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" type="text" value="www.facebook.com" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Twitter</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" type="text" value="www.twitter.com" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Instagram</label>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<input className="form-control" type="text" value="www.instagram.com" />
								</div>
							</div>
						</div>
						<div className="">
							<div className="">
								<div className="row">
									<div className="col-12 col-sm-3 col-md-3 col-lg-2">
									</div>
									<div className="col-12 col-sm-9 col-md-9 col-lg-7">
										<button type="submit" className="btn m-r10">Lưu thông tin</button>
										<button type="reset" className="btn btn-secondry">Hủy</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</Fragment>
			)
		}

	}

	return (
		<>
			<div className="profile-head">
				<h5>Cập nhật hồ sơ</h5>
			</div>
			{renderEditProfile()}
		</>
	);

}
