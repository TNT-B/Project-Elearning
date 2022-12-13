import { message } from 'antd';
export const isEmail = (value, objName) => {
  if (!value) {
    message.error(objName + ' không được để trống!');
    return false;
  }
  else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    message.error(objName + ' tối thiểu 9 ký tự');
    return false;
  }  
    return true;
  };
