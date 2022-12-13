import { courseConstants } from "../_constants";
import { authentication } from "./authentication.reducer";
import { useState } from "react";
var _ = require("lodash");
const initialState = {};
export function courses(state = initialState, action) {
  switch (action.type) {
    //Lay danh sach danh muc khoa hoc *******************************************
    case courseConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.GETALL_SUCCESS:
      return {
        ...state,
        items_group: action.course,
      };
    case courseConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //lay danh sach khoa hoc *******************************************
    case courseConstants.GETALL_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.GETALL_GROUP_SUCCESS:
      return {
        ...state,
        items_courses: action.course,
        items_coursess: action.course
      };
    case courseConstants.GETALL_GROUP_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    //lay danh sach khoa hoc chua ghi danh *******************************************
    case courseConstants.COURSE_GETALL_NOTREG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.COURSE_GETALL_NOTREG_SUCCESS:
      return {
        ...state,
        items_courses_notreg: action.course,
      };
    case courseConstants.COURSE_GETALL_NOTREG_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //lay danh sach khoa hoc da ghi danh *******************************************
    case courseConstants.COURSE_GETALL_INREG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.COURSE_GETALL_INREG_SUCCESS:
      return {
        ...state,
        items_courses_reg: action.course,
        // items_coursess_reg: action.course
      };
    case courseConstants.COURSE_GETALL_INREG_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //lay danh sach khoa hoc cho xet duyet *******************************************
    case courseConstants.COURSE_GETALL_HOLDREG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.COURSE_GETALL_HOLDREG_SUCCESS:
      return {
        ...state,
        items_courses_holdreg: action.course,
        // items_coursess_holdreg: action.course
      };
    case courseConstants.COURSE_GETALL_HOLDREG_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //loc danh sach khoa hoc *******************************************
    case courseConstants.FILTER_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.FILTER_GROUP_SUCCESS:
      let tt = [];
      let yy = action.tatcaKH1.map((x) => x);
      let count = 0;
      if (action.filter === "All") {
        tt = action.tatcaKH1.map((x) => x);
      } else if (action.filter === "Publish") {
        for (let aa = 0; aa < action.tatcaKH1.length; aa++) {
          for (let bb = 0; bb < action.chiTietKHGD.length; bb++) {
            if (
              action.tatcaKH1[aa].maKhoaHoc === action.chiTietKHGD[bb].maKhoaHoc
            ) {
              tt.push(action.tatcaKH1[aa]);
            }
          }
        }
      } else if (action.filter === "Pending") {
        for (let aa = 0; aa < action.tatcaKH1.length; aa++) {
          for (let bb = 0; bb < action.chiTietKHGD.length; bb++) {
            if (
              action.tatcaKH1[aa].maKhoaHoc === action.chiTietKHGD[bb].maKhoaHoc
            ) {
              yy.splice(aa - count, 1);
              count = count + 1;
            }
          }
        }
        tt = yy;
      }
      return {
        ...state,
        // items_courses: action.tatcaKH1,
        items_coursess: tt,
      };
    case courseConstants.FILTER_GROUP_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //get id infomation *******************************************
    case courseConstants.GETID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case courseConstants.GETID_SUCCESS:
      return {
        ...state,
        items: action.course,
      };
    case courseConstants.GETID_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    // ghi danh khoa hoc *******************************************
    case courseConstants.REG_REQUEST:
      // add 'updating:true' property to user being update
      return {
        ...state,
        registing: true,
        registed: false,
      };
    case courseConstants.REG_SUCCESS:
      // update user from state
      return {
        ...state,
        items_reg: action.course,
        registed: true,
        checkedIn: true,
      };
    case courseConstants.REG_FAILURE:
      return {
        ...state,
        error: action.error,
        registed: false,
      };
    // dang ky khoa hoc *******************************************
    case courseConstants.COURSE_REG_REQUEST:
      // add 'updating:true' property to user being update
      return {
        ...state,
        registing: true,
      };
    case courseConstants.COURSE_REG_SUCCESS:
      let courses_reg = [];
      courses_reg = action.courseState.map((x) => x);
      let index = courses_reg.findIndex(
        (course) => course.maKhoaHoc === action.courseReg.maKhoaHoc
      );
      if (index !== -1) {
        courses_reg.splice(index, 1);
      } else {
        courses_reg.push(action.courseReg);
      }
      return {
        ...state,
        items_courses_reg: courses_reg,
        items_courses_notreg: state.items_courses_notreg.filter(
          (course) => course.maKhoaHoc !== action.courseReg.maKhoaHoc
        ),
        register_status: action.course,
        register: true,
        checkedIn: true,
      };
    case courseConstants.COURSE_REG_FAILURE:
      return {
        ...state,
        error: action.error,
        register: false,
      };
    // huy dang ky khoa hoc *******************************************
    case courseConstants.UNREG_REQUEST:
      return {
        ...state,
        unregisting: true,
      };
    case courseConstants.UNREG_SUCCESS:
      // let coursess_unreg = [];
      // coursess_unreg = state.items_courses_reg.filter(
      //   (course) => course.maKhoaHoc === action.maKhoaHoc
      // )
      let coursess_notreg = action.courses_notreg.map((x) => x);
      let indexs = coursess_notreg.findIndex(
        (course) => course.maKhoaHoc === action.courseReg.maKhoaHoc
      );
      if (indexs !== -1) {
        coursess_notreg.splice(indexs, 1);
      } else {
        coursess_notreg.push(action.courseReg);
      }
      return {
        ...state,
        items_courses_notreg: coursess_notreg,
        items_courses_reg: state.items_courses_reg.filter(
          (course) => course.maKhoaHoc !== action.maKhoaHoc
        ),
        unregister: true,
      };
    case courseConstants.UNREG_FAILURE:
      return {
        ...state,
        error: action.error,
        unregister: false,
      };
    // check hoc vien khoa hoc *******************************************
    case courseConstants.CHECK_COURSE_REQUEST:
      return {
        ...state,
        checking: true,
      };
    case courseConstants.CHECK_COURSE_SUCCESS:
      // xu ly khi tim thay hoc vien trong khoa hoc
      const courseCopy = { checkedInCopy: false };
      action.course.find((course) => {
        if (course.taiKhoan === action.userck.taiKhoan) {
          courseCopy.checkedInCopy = true;
        }
      });
      return {
        ...state,
        // items_ck: action.course.find(course => course.taiKhoan === action.userck.taiKhoan),
        items_ck: action.course,
        checkedIn: courseCopy.checkedInCopy,
      };
    case courseConstants.CHECK_COURSE_FAILURE:
      return {
        ...state,
        error: action.error,
        checkedIn: false,
      };
    // Add *******************************************
    case courseConstants.ADD_REQUEST:
      return {
        ...state,
        Added: false,
        Adding: true,
      };
    case courseConstants.ADD_SUCCESS:
      return {
        ...state,
        course_add: action.course,
        Added: true,
        Adding: false,
      };
    case courseConstants.ADD_FAILURE:
      return {
        ...state,
        Added: false,
        Adding: false,
        addError: action.error
      };
    // Upload hinh anh *******************************************
    case courseConstants.UPLOAD_REQUEST:
      return {
        ...state,
        Uploading: true,
      };
    case courseConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        fileList: [action.file],
        Uploading: false,
      };
    case courseConstants.UPLOAD_FAILURE:
      return {
        ...state,
        Uploading: false,
        uploadError: action.error
      };
    // update *******************************************
    case courseConstants.UPDATE_REQUEST:
      return {   
        ...state,     
        updating: true,
      };
    case courseConstants.UPDATE_SUCCESS:

      return {
        ...state,
        updated: true,
        updating: false,
      };
    case courseConstants.UPDATE_FAILURE:
      return {
        ...state,        
        updating: false,
        updateError: action.error,
      };

    // delete *******************************************
    case courseConstants.DELETE_REQUEST:
      return {
        ...state,
        course_deleting: true,
        course_deleted: false
      };
    case courseConstants.DELETE_SUCCESS:

      return {
        ...state,
        items_courses: state.items_courses.filter((course) => course.maKhoaHoc !== action.id),
        course_deleting: false,
        course_deleted: true
      };
    case courseConstants.DELETE_FAILURE:

      return {
        ...state,
        course_deleting: false,
        course_deleted: false
      };
    default:
      return state;
  }
}
