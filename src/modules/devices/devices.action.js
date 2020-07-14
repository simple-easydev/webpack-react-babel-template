import { createAction } from "redux-act";
export const setDeviceList = createAction("set device list", (list)=>({list}));
export const getDeviceListSaga = createAction("get device list saga");
export const reBootDeviceSaga = createAction("reboot device", (deviceId, index)=>({deviceId, index}));