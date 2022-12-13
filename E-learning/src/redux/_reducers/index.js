import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { courses } from './courses.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    courses,
    alert,    
});

export default rootReducer;