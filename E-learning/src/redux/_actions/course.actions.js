import { courseConstants } from "../_constants";
import { courseService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";
import { message } from "antd";

export const courseActions = {
    update,
    regiter,
    unregiter,
    regiterCourse,
    unregiterCourse,
    getAll,
    getAllCourse,
    getCourseCheckStudent,
    getCourseDetail,
    filterCourse,
    getAllCourseNotReg,
    getAllCourseReg,
    getAllCourseHoldReg,
    getById,
    getCourseById,
    delete: _delete,
    addCourse,
    updateCourse,
    uploadImg
};
function unregiterCourse(maKhoaHoc, taiKhoan, api, method, courseReg, courses_reg, courses_notreg) {
    return (dispatch) => {
        dispatch(request());

        courseService.unregisterCourse(maKhoaHoc, taiKhoan, api, method).then(
            (course) => {
                dispatch(success(course, maKhoaHoc, courseReg, courses_reg, courses_notreg));
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
        return { type: courseConstants.COURSE_UNREG_REQUEST };
    }
    function success(course, maKhoaHoc, courseReg, courses_reg, courses_notreg) {
        return { type: courseConstants.COURSE_UNREG_SUCCESS, course, maKhoaHoc, courseReg, courses_reg, courses_notreg };
    }
    function failure(error) {
        return { type: courseConstants.COURSE_UNREG_FAILURE, error };
    }
}

function regiterCourse(
    maKhoaHoc,
    taiKhoan,
    api,
    method,
    courseReg,
    courseState,
    courseNotReg
) {
    return (dispatch) => {
        dispatch(request());

        courseService.registerCourse(maKhoaHoc, taiKhoan, api, method).then(
            (course) => {
                dispatch(success(course, courseState, courseReg, courseNotReg));
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
        return { type: courseConstants.COURSE_REG_REQUEST };
    }
    function success(course, courseState, courseReg, courseNotReg) {
        return {
            type: courseConstants.COURSE_REG_SUCCESS,
            course,
            courseState,
            courseReg,
            courseNotReg,
        };
    }
    function failure(error) {
        return { type: courseConstants.COURSE_REG_FAILURE, error };
    }
}

function regiter(maKhoaHoc, taiKhoan, api) {
    return (dispatch) => {
        dispatch(request());

        courseService.register(maKhoaHoc, taiKhoan, api).then(
            (course) => {
                dispatch(success(course));
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
        return { type: courseConstants.REG_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.REG_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.REG_FAILURE, error };
    }
}


function uploadImg(files) {
    return (dispatch) => {
        dispatch(request());

        courseService.uploadImg(files).then(
            (file) => {
                dispatch(success(file));
                // dispatch(alertActions.success('Cập nhật thành công'));
                message.success('upload thành công.');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: courseConstants.UPLOAD_REQUEST };
    }
    function success(file) {
        return { type: courseConstants.UPLOAD_SUCCESS, file };
    }
    function failure(error) {
        return { type: courseConstants.UPLOAD_FAILURE, error };
    }
}
function updateCourse(data, files, image) {
    return (dispatch) => {
        dispatch(request());
        if (image) {
            courseService.updateCourse(data, files, true).then(
                (course) => {
                    dispatch(success(course));
                    // dispatch(alertActions.success('Cập nhật thành công'));
                    message.success("Cập nhật thành công");
                    // history.push(form);
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            )
        }
        else {
            courseService.updateCourse(data, files, false).then(
                (course) => {
                    dispatch(success(course));
                    // dispatch(alertActions.success('Cập nhật thành công'));
                    message.success("Cập nhật thành công");
                    // history.push(form);
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    message.error(error.toString());
                }
            )
        }
    };

    function request() {
        return { type: courseConstants.UPDATE_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.UPDATE_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.UPDATE_FAILURE, error };
    }
}

function addCourse(data, files) {
    return (dispatch) => {
        dispatch(request());

        courseService.addCourse(data, files).then(
            (course) => {
                dispatch(success(course));
                // dispatch(alertActions.success('Cập nhật thành công'));
                message.success("Cập nhật thành công");
                // history.push(form);
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: courseConstants.ADD_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.ADD_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.ADD_FAILURE, error };
    }
}

function unregiter(maKhoaHoc, taiKhoan, api) {
    return (dispatch) => {
        dispatch(request());

        courseService.unregister(maKhoaHoc, taiKhoan, api).then(
            (course) => {
                dispatch(success(course));
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
        return { type: courseConstants.UNREG_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.UNREG_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.UNREG_FAILURE, error };
    }
}

function update(course) {
    return (dispatch) => {
        dispatch(request(course));

        courseService.update(course).then(
            (course) => {
                dispatch(success(course));
                history.push("/profile");
                dispatch(alertActions.success("Cập nhật thành công"));
                message.success("Cập nhật thành công");
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request(course) {
        return { type: courseConstants.UPDATE_REQUEST, course };
    }
    function success(course) {
        return { type: courseConstants.UPDATE_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.UPDATE_FAILURE, error };
    }
}
function getAllCourseHoldReg(taiKhoan, api, method) {
    return (dispatch) => {
        dispatch(request());

        courseService.getAllCourseHoldReg(taiKhoan, api, method).then(
            (course) => {
                dispatch(success(course));
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
        return { type: courseConstants.COURSE_GETALL_HOLDREG_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.COURSE_GETALL_HOLDREG_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.COURSE_GETALL_HOLDREG_FAILURE, error };
    }
}
function getAllCourseReg(taiKhoan, api, method) {
    return (dispatch) => {
        dispatch(request());

        courseService.getAllCourseReg(taiKhoan, api, method).then(
            (course) => {
                dispatch(success(course));
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
        return { type: courseConstants.COURSE_GETALL_INREG_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.COURSE_GETALL_INREG_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.COURSE_GETALL_INREG_FAILURE, error };
    }
}
function getAllCourseNotReg(api, method) {
    return (dispatch) => {
        dispatch(request());

        courseService.getAllCourseNotReg(api, method).then(
            (course) => {
                dispatch(success(course));
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
        return { type: courseConstants.COURSE_GETALL_NOTREG_REQUEST };
    }
    function success(course, coursereg, coursenotreg) {
        return {
            type: courseConstants.COURSE_GETALL_NOTREG_SUCCESS,
            course
        };
    }
    function failure(error) {
        return { type: courseConstants.COURSE_GETALL_NOTREG_FAILURE, error };
    }
}

function getAll(api, method) {
    return (dispatch) => {
        dispatch(request());

        courseService.getAll(api, method).then(
            (course) => {
                dispatch(success(course));
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
        return { type: courseConstants.GETALL_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.GETALL_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.GETALL_FAILURE, error };
    }
}

function getCourseCheckStudent(api, userck) {
    return (dispatch) => {
        dispatch(request());

        courseService.getCheckCourse(api).then(
            (course) => {
                dispatch(success(course, userck));
                // dispatch(alertActions.success('Cập nhật thành công'));
                // message.success('all course Cập nhật thành công');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: courseConstants.CHECK_COURSE_REQUEST };
    }
    function success(course, userck) {
        return { type: courseConstants.CHECK_COURSE_SUCCESS, course, userck };
    }
    function failure(error) {
        return { type: courseConstants.CHECK_COURSE_FAILURE, error };
    }
}

function getCourseDetail(api) {
    return (dispatch) => {
        dispatch(request());

        courseService.getAll(api).then(
            (course) => {
                dispatch(success(course));
                // dispatch(alertActions.success('Cập nhật thành công'));
                // message.success('all course Cập nhật thành công');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: courseConstants.GETID_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.GETID_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.GETID_FAILURE, error };
    }
}

function getCourseById(api, maKhoaHoc) {
    return (dispatch) => {
        dispatch(request());

        courseService.getCourseById(api, maKhoaHoc).then(
            (course) => {
                dispatch(success(course));
                // dispatch(alertActions.success('Cập nhật thành công'));
                // message.success('all course Cập nhật thành công');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: courseConstants.GETID_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.GETID_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.GETID_FAILURE, error };
    }
}

function getAllCourse(api,method) {
    return (dispatch) => {
        dispatch(request());

        courseService.getAll(api,method).then(
            (course) => {
                console.log(course);
                dispatch(success(course));
                // dispatch(alertActions.success('Cập nhật thành công'));
                // message.success('all course Cập nhật thành công');
            },
            (error) => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                message.error(error.toString());
            }
        );
    };

    function request() {
        return { type: courseConstants.GETALL_GROUP_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.GETALL_GROUP_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.GETALL_GROUP_FAILURE, error };
    }
}

function filterCourse(tatcaKH, tatcaKH1, chiTietKHGD, filter) {
    return (dispatch) => {
        dispatch(request());
        dispatch(success(tatcaKH, tatcaKH1, chiTietKHGD, filter));
        // dispatch(alertActions.success('Cập nhật thành công'));
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        // message.error(error.toString());
    };

    function request() {
        return { type: courseConstants.FILTER_GROUP_REQUEST };
    }
    function success(tatcaKH, tatcaKH1, chiTietKHGD, filter) {
        return {
            type: courseConstants.FILTER_GROUP_SUCCESS,
            tatcaKH,
            tatcaKH1,
            chiTietKHGD,
            filter,
        };
    }
    // function failure() { return { type: courseConstants.FILTER_GROUP_FAILURE } }
}

function getById() {
    return (dispatch) => {
        dispatch(request());

        courseService.getAll().then(
            (course) => dispatch(success(course)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request() {
        return { type: courseConstants.GETID_REQUEST };
    }
    function success(course) {
        return { type: courseConstants.GETID_SUCCESS, course };
    }
    function failure(error) {
        return { type: courseConstants.GETID_FAILURE, error };
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, api) {
    return (dispatch) => {
        dispatch(request(id));

        courseService.delete(id, api).then(
            (id) => dispatch(success(id)),
            (error) => {
                dispatch(failure(error.toString()));               
                message.error(error.toString());
            }
        );
    };

    function request(id) {
        return { type: courseConstants.DELETE_REQUEST, id };
    }
    function success(id) {
        return { type: courseConstants.DELETE_SUCCESS, id };
    }
    function failure(id, error) {
        return { type: courseConstants.DELETE_FAILURE, id, error };
    }
}


