import { message } from 'antd';
export const isUserName = (value, objName) => {
  if (!value) {
    message.error(objName + ' không được để trống!');
    return false;
  } else if (value && value.length < 6) {
    message.error(objName + ' tối thiểu 9 ký tự');
    return false;
  }
  return true;
};
