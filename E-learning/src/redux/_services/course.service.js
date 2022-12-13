import { authHeader } from "../_helpers";
import { apiConstants } from "../_constants";

export const courseService = {
  getAll,
  getById,
  getCheckCourse,
  registerCourse,
  unregisterCourse,
  addCourse,
  uploadImg,
  update,
  updateCourse,
  register,
  unregister,
  getCourseById,
  getAllCourseNotReg,
  getAllCourseHoldReg,
  getAllCourseReg,
  delete: _delete,
};
async function getAllCourseHoldReg(taiKhoan, api, methods) {
  const requestOptions = {
    method: methods,
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ taiKhoan }),
  };

  return await fetch(api, requestOptions)
    .then(handleResponse)
    .then((course) => {
      return course;
    });
}
async function getAllCourseReg(taiKhoan, api, methods) {
  const requestOptions = {
    method: methods,
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ taiKhoan }),
  };

  return await fetch(api, requestOptions)
    .then(handleResponse)
    .then((course) => {
      return course;
    });
}
async function getAllCourseNotReg(api, methods) {
  const requestOptions = {
    method: methods,
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return await fetch(api, requestOptions)
    .then(handleResponse)
    .then((course) => {
      return course;
    });
}

async function getCourseById(api, maKhoaHoc) {
  const requestOptions = {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  };

  return await fetch(api + maKhoaHoc, requestOptions)
    .then(handleResponse)
    .then((course) => {
      return course;
    });
}

async function getAll(api, methods) {
  const requestOptions = {
    method: methods,
    headers: { "Content-Type": "application/json" },
  };

  return await fetch(api, requestOptions)
    .then(handleResponse)
    .then((course) => {
      return course;
    });
}
async function getCheckCourse(api) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return await fetch(api, requestOptions)
    .then(handleResponse)
    .then((course) => {
      return course.lstHocVien;
    });
}

async function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(`/users/${id}`, requestOptions);
  return handleResponse(response);
}
async function unregisterCourse(maKhoaHoc, taiKhoan, api, methods) {
  const requestOptions = {
    method: methods,
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ maKhoaHoc, taiKhoan }),
  };

  return await fetch(api, requestOptions)
    .then(handleResponseText)
    .then((course) => {
      return course;
    });
}

async function registerCourse(maKhoaHoc, taiKhoan, api, methods) {
  const requestOptions = {
    method: methods,
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ maKhoaHoc, taiKhoan }),
  };

  return await fetch(api, requestOptions)
    .then(handleResponseText)
    .then((course) => {
      return course;
    });
}

async function uploadImg(files) {
  const requestUpload = {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: files, //JSON.stringify({ files }),
  };
  return await fetch(apiConstants.COURSE_IMG, requestUpload)
    .then(handleResponseText)
    .then((files) => {
      return files;
    });
}

async function updateCourse(data, files, image) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const requestUpload = {
    method: "POST",
    body: files,
  };
  if (image) {
    return await fetch(apiConstants.COURSE_UPDATE, requestOptions)
      .then(
        await fetch(apiConstants.COURSE_IMG, requestUpload)
      )
      .then(handleResponseText)
      .then((course) => {
        return course;
      });
  }
  else {
    return await fetch(apiConstants.COURSE_UPDATE, requestOptions)
      .then(handleResponseText)
      .then((course) => {
        return course;
      });
  }

}

async function addCourse(data, files) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const requestUpload = {
    method: "POST",
    body: files,
  };
  return await fetch(apiConstants.COURSE_ADD, requestOptions)
    .then(
      await fetch(apiConstants.COURSE_IMG, requestUpload)
    )
    .then(handleResponseText)
    .then((course) => {
      return course;
    });
}

async function register(maKhoaHoc, taiKhoan, api) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ maKhoaHoc, taiKhoan }),
  };

  return await fetch(api, requestOptions)
    .then(handleResponseText)
    .then((course) => {
      return course;
    });
}
async function unregister(maKhoaHoc, taiKhoan, api) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ maKhoaHoc, taiKhoan }),
  };

  return await fetch(api, requestOptions)
    .then(handleResponseText)
    .then((course) => {
      return course;
    });
}

async function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    requestOptions
  );
  return handleResponse(response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id, api) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
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
