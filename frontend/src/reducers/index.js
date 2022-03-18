import { combineReducers } from "redux";
import { loginReducer } from "./auth";
import { getProfileReducer,updateProfileReducer } from "./profile";
import {categoryRedcuer} from './categoryReducer'
import { getNeighborhood } from "./neighborhooReducer";
import {getUsersAdminReducer,getUserAdminReducer,getComplaintsAdminReducer,getComplaintByIdAdminReducer} from './adminReducer'
import { addComplaintReducer,getComplaintsReducer ,getComplaintByIdReducer} from './complaintReducer'
import {complaintStatistics} from './statisticsReducer'
export default combineReducers({
userLogin:loginReducer,
getProfile:getProfileReducer,
updateProfile:updateProfileReducer,
category:categoryRedcuer,
neighborhood:getNeighborhood,
addComplaint:addComplaintReducer,
getComplaints:getComplaintsReducer,
getComplaintById:getComplaintByIdReducer,
getUsersAdmin:getUsersAdminReducer,
getUserAdmin:getUserAdminReducer,
getComplaintsAdmin:getComplaintsAdminReducer,
getComplaintByIdAdmin:getComplaintByIdAdminReducer,
complaintStatistics:complaintStatistics
})