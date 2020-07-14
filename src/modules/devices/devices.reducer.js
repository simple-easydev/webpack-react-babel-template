import { createReducer } from "redux-act";
import * as actions from "./devices.action";

const initialState = {
    devices: []
};

const reducer = {
    [actions.setDeviceList]: (state, data) => {
        let devices = Array.from(data.list);
        return {
            ...state,
            devices
        }
    }
};

export default createReducer(reducer, initialState);