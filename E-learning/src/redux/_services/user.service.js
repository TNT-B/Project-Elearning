import { authHeader } from '../_helpers';
import { apiConstants } from "../_constants";

export const userService = {
    login,
    logout,
    register,
    getAll,
    getAllList,
    getAllListReg,
    getAllListHoldReg,
    getAllListNotReg,
    registerCourseUser,
    unregisterCourseUser,
    getById,
    update,
    delete: _delete
};

async function login(taikhoan, matkhau) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taikhoan, matkhau })
    };

    return await fetch(apiConstants.LOGIN, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
}
async function getAllList(api) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(api, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

async function unregisterCourseUser(taiKhoan, maKhoaHoc, api, methods) {
    const requestOptions = {
      method: methods,
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ maKhoaHoc, taiKhoan }),
    };
  
    return await fetch(api, requestOptions)
      .then(handleResponseText)
      .then((user) => {
        return user;
      });
  }

async function registerCourseUser(taiKhoan, maKhoaHoc, api, methods) {
    const requestOptions = {
        method: methods,
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ taiKhoan, maKhoaHoc }),
    };

    return await fetch(api, requestOptions)
        .then(handleResponseText)
        .then((user) => {
            return user;
        });
}

async function getAll() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return await fetch(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // localStorage.setItem('userInfo', JSON.stringify(user));
            return user;
        });
}

async function getAllListReg(makhoahoc, api, methods) {
    const requestOptions = {
        method: methods,
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ makhoahoc }),
    };

    return await fetch(api, requestOptions)
        .then(handleResponse)
        .then((user) => {
            return user;
        });
}

async function getAllListHoldReg(makhoahoc, api, methods) {
    const requestOptions = {
        method: methods,
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ makhoahoc }),
    };

    return await fetch(api, requestOptions)
        .then(handleResponse)
        .then((user) => {
            return user;
        });
}

async function getAllListNotReg(api, makhoahoc, methods) {
    const requestOptions = {
        method: methods,
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ makhoahoc })
    };

    return await fetch(api, requestOptions)
        .then(handleResponse)
        .then((user) => {
            return user;
        });
}
async function getById(api, method) {
    const requestOptions = {
        method: method,
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return await fetch(api, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return await fetch(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy`, requestOptions).then(handleResponse);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return await fetch('https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id, api) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return await fetch(api + id, requestOptions).then(handleResponseText);
}

async function handleResponseText(response) {
    return await response.text().then((text) => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = data || response.statusText;
            return Promise.reject(error);
        }
        // const data = JSON.parse(text);
        return data;
    });
}
async function handleResponse(response) {
    return await response.json().then((json) => {
        const data = json;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = data || response.statusText;
            return Promise.reject(error);
        }
        // const data = JSON.parse(text);
        return data;
    });
}