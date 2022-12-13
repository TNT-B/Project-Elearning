import { userConstants } from '../_constants';

// let user = JSON.parse(localStorage.getItem('userInfo'));
// const initialState = user ? user : {};
const initialState = {};

export function users(state = initialState, action) {
    switch (action.type) {
        //get infomation *******************************************
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                users: action.user
            };
        case userConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //get list *******************************************
        case userConstants.GETALL_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_LIST_SUCCESS:
            return {
                ...state,
                users: action.users
            };
        case userConstants.GETALL_LIST_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //lay danh sach user chua ghi danh khoa hoc *******************************************
        case userConstants.GETALL_LIST_NOTREG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_LIST_NOTREG_SUCCESS:
            return {
                ...state,
                users_notreg: action.users
            };
        case userConstants.GETALL_LIST_NOTREG_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //lay danh sach user da ghi danh khoa hoc *******************************************
        case userConstants.GETALL_LIST_REG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_LIST_REG_SUCCESS:
            return {
                ...state,
                users_reg: action.users
            };
        case userConstants.GETALL_LIST_REG_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //lay danh sach user cho xet duyet *******************************************
        case userConstants.GETALL_LIST_HOLDREG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_LIST_HOLDREG_SUCCESS:
            return {
                ...state,
                users_holdreg: action.users
            };
        case userConstants.GETALL_LIST_HOLDREG_FAILURE:
            return {
                ...state,
                error: action.error
            };

        // ghi danh user khoa hoc *******************************************
        case userConstants.USER_COURSE_REG_REQUEST:
            // add 'updating:true' property to user being update
            return {
                ...state,
                registing: true,
            };
        case userConstants.USER_COURSE_REG_SUCCESS:
            let userss_reg = [];
            userss_reg = action.userReg.map((x) => x);
            let index = userss_reg.findIndex(
                (user) => user.taiKhoan === action.userState.taiKhoan
            );
            if (index !== -1) {
                userss_reg.splice(index, 1);
            } else {
                userss_reg.push(action.userState);
            }
            return {
                ...state,
                users_reg: userss_reg,
                users_notreg: action.userNotReg.filter(
                    (user) => user.taiKhoan !== action.userState.taiKhoan
                ),
                register_status: action.user,
                register: true,
                checkedIn: true,
            };
        case userConstants.USER_COURSE_REG_FAILURE:
            return {
                ...state,
                error: action.error,
                register: false,
            };
        // huy ghi danh user khoa hoc *******************************************
        case userConstants.USER_COURSE_UNREG_REQUEST:
            return {
                ...state,
                unregisting: true,
            };
        case userConstants.USER_COURSE_UNREG_SUCCESS:
            // let userss_unreg = Object.assign({}, state.users_reg.filter(
            //     (user) => user.taiKhoan === action.taiKhoan
            // ));

            let userss_notreg = action.userNotReg.map((x) => x);
            let indexs = userss_notreg.findIndex(
                (user) => user.taiKhoan === action.userReg.taiKhoan
            );
            if (indexs !== -1) {
                userss_notreg.splice(indexs, 1);
            } else {
                userss_notreg.push(action.userReg);
            }
            return {
                ...state,
                users_reg: action.userState.filter(
                    (user) => user.taiKhoan !== action.taiKhoan
                ),
                users_notreg: userss_notreg,
                unregister: true,
            };
        case userConstants.USER_COURSE_UNREG_FAILURE:
            return {
                ...state,
                error: action.error,
                unregister: false,
            };
        // get id *******************************************
        case userConstants.GETID_REQUEST:
            return {
                ...state,
                editing: true
            };
        case userConstants.GETID_SUCCESS:
            // const abc = action.user.filter(user => user.taiKhoan === action.taikhoan);
            // console.log(abc);
            return {
                ...state,
                useredit: state.users.filter(user => user.taiKhoan === action.taikhoan)
            };
        case userConstants.GETID_FAILURE:
            return {
                ...state,
                editing: false,
                editerror: action.error
            };
        // update *******************************************
        case userConstants.UPDATE_REQUEST:
            // add 'updating:true' property to user being update
            return {
                ...state, updating: true
            };
        case userConstants.UPDATE_SUCCESS:
            // update user from state
            return {
                ...state,
                useredit: action.user
            };
        case userConstants.UPDATE_FAILURE:
            // remove 'updating:true' property and add 'updateError:[error]' property to user 
            return {
                ...state,
                updating: false,
                updateError: action.error
            };

        // delete *******************************************
        case userConstants.DELETE_REQUEST:
            
            return {
                ...state,
                user_deleting: true,
                user_deleted: false
            }
        case userConstants.DELETE_SUCCESS:
            
            return {
                ...state,
                users: state.users.filter(user => user.taiKhoan !== action.id),
                user_deleting: false,
                user_deleted: true
            };
        case userConstants.DELETE_FAILURE:
            
            return {
                ...state,
                user_deleting: false,
                user_deleted: false
            };
        default:
            return state
    }
}