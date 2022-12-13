import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { message } from 'antd';
import { apiConstants } from '../../redux/_constants';

export const userActions = {
    login,
    logout,
    update,
    register,
    getId,
    updateuser,
    getAll,
    getAllList,
    getAllListReg,
    getAllListHoldReg,
    getAllListNotreg,
    regiterCourseUser,
    unregiterCourseUser,
    delete: _delete
};
function getId(taikhoan) {
    return dispatch => {
        dispatch(request());
        dispatch(success(taikhoan));
        // message.success('Lấy thông tin user thành công');            
    };

    function request() { return { type: userConstants.GETID_REQUEST } }
    function success(taikhoan) { return { type: userConstants.GETID_SUCCESS, taikhoan } }
    // function failure(error) { return { type: userConstants.GETID_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function login(taikhoan, matkhau, from) {
    return dispatch => {
        dispatch(request({ taikhoan }));

        userService.login(taikhoan, matkhau)
            .then(
                user => {
                    dispatch(success(user));
                    message.success('Đăng nhập thành công');
                    history.push(from);
                    // history.goBack()
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function unregiterCourseUser(taiKhoan, maKhoaHoc, api, method, userState, userReg, userNotReg) {
    return (dispatch) => {
        dispatch(request());

        userService.unregisterCourseUser(taiKhoan, maKhoaHoc, api, method).then(
            (user) => {
                dispatch(success(user, taiKhoan, userState, userReg, userNotReg));
                // dispatch(alertActions.success('Cập nhật thành công'));
                message.success("Cập nhật thành công");
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: userConstants.USER_COURSE_UNREG_REQUEST };
    }
    function success(user, taiKhoan, userReg, userState, userNotReg) {
        return { type: userConstants.USER_COURSE_UNREG_SUCCESS, user, taiKhoan, userState, userReg, userNotReg };
    }
    function failure(error) {
        return { type: userConstants.USER_COURSE_UNREG_FAILURE, error };
    }
}
function regiterCourseUser(
    taiKhoan,
    maKhoaHoc,
    api,
    method,
    userState,
    userReg,    
    userNotReg
) {
    return (dispatch) => {
        dispatch(request());

        userService.registerCourseUser(taiKhoan, maKhoaHoc, api, method).then(
            (user) => {
                dispatch(success(user, userState, userReg, userNotReg));
                // dispatch(alertActions.success('Cập nhật thành công'));
                message.success("Cập nhật thành công");
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: userConstants.USER_COURSE_REG_REQUEST };
    }
    function success(user, userState, userReg, userNotReg) {
        return {
            type: userConstants.USER_COURSE_REG_SUCCESS,
            user, userState, userReg, userNotReg
        };
    }
    function failure(error) {
        return { type: userConstants.USER_COURSE_REG_FAILURE, error };
    }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/profile');
                    dispatch(alertActions.success('Cập nhật thành công'));
                    message.success('Cập nhật thành công');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}
function updateuser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));                    
                    // history.push('/admin');
                    // dispatch(alertActions.success('Cập nhật thành công'));
                    message.success('Cập nhật thành công');
                    dispatch(userActions.getAllList(apiConstants.USER_SEARCH));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}
function register(user, from) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Đăng ký thành công'));
                    message.success('Đăng ký thành công');
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user, from) { return { type: userConstants.REGISTER_SUCCESS, user, from } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllList(api) {
    return dispatch => {
        dispatch(request());

        userService.getAllList(api)
            .then(
                users => {
                    dispatch(success(users));
                    // dispatch(alertActions.success('Cập nhật thành công'));
                    // message.success('Cập nhật thành công');
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request() { return { type: userConstants.GETALL_LIST_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_LIST_FAILURE, error } }
}

function getAllListHoldReg(makhoahoc, api, method) {
    return (dispatch) => {
        dispatch(request());

        userService.getAllListHoldReg(makhoahoc, api, method).then(
            (users) => {
                dispatch(success(users));
                // dispatch(alertActions.success('Cập nhật thành công'));
                // message.success('Cập nhật thành công');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: userConstants.GETALL_LIST_HOLDREG_REQUEST };
    }
    function success(users) {
        return { type: userConstants.GETALL_LIST_HOLDREG_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.GETALL_LIST_HOLDREG_FAILURE, error };
    }
}

function getAllListReg(makhoahoc, api, method) {
    return (dispatch) => {
        dispatch(request());

        userService.getAllListReg(makhoahoc, api, method).then(
            (users) => {
                dispatch(success(users));
                // dispatch(alertActions.success('Cập nhật thành công'));
                // message.success('Cập nhật thành công');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() { return { type: userConstants.GETALL_LIST_REG_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_LIST_REG_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_LIST_REG_FAILURE, error } }
}
function getAllListNotreg(api, makhoahoc, method) {
    return dispatch => {
        dispatch(request());

        userService.getAllListNotReg(api, makhoahoc, method)
            .then(
                users => {
                    dispatch(success(users));
                    // dispatch(alertActions.success('Cập nhật thành công'));
                    // message.success('Cập nhật thành công');
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request() { return { type: userConstants.GETALL_LIST_NOTREG_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_LIST_NOTREG_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_LIST_NOTREG_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );

    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(user) { return { type: userConstants.GETALL_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, api) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id, api)
            .then(
                users => {
                    dispatch(success(id));
                    // dispatch(alertActions.success('Cập nhật thành công'));
                    // message.success('Cập nhật thành công');
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}