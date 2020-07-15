import * as actions from "./devices.action";
import { takeEvery, put, select, call, all, take, wait, delay } from "redux-saga/effects";
import api from "../../api";
const getDeviceList = (state) => state.device.devices;

function* fetchDevices(){
    console.log("fetchDevices");
    const devcieList = yield api.device.getDevcieList();
    let arr = [];
    if(devcieList.data){
        for(var i = 0; i < devcieList.data.length; i++){
            let element = devcieList.data[i];
            if(element.identification.role == "ap"){
                arr.push(element);
            }
        }
        yield put(actions.setDeviceList(arr))
        for(var i = 0; i < arr.length; i++){
            let element = arr[i];
            const deviceConfig = yield api.device.getDeviceControlFrequency(element.identification.id);
            try{
                element.identification.controlFrequency = deviceConfig.data.controlFrequency;
                yield put(actions.setDeviceList(arr))
            }catch(e){
                console.log(e);
            }
            // arr.push(element);
        }
        // yield put(actions.setDeviceList(arr))
    }
    console.log("devcieList --->", arr);
}

function* getDeviceControlFrequency(deviceId){
    const deviceConfig = yield api.device.getDeviceControlFrequency(deviceId);
    try{
        const result = deviceConfig.data.controlFrequency;
        return result;
    }catch(e){
        console.log("error -->",e);
        yield delay(5000)
        return yield getDeviceControlFrequency(deviceId);
    }
}

function* reBootDevice(data){
    const {deviceId, index} = data.payload;
    let deviceList = yield select(getDeviceList);
    console.log(deviceList, deviceId, index);
    deviceList[index].identification.controlFrequency = "rebooting";
    yield put(actions.setDeviceList(deviceList));

    const restartResult = yield api.device.reBootDevice(deviceId);
    if(restartResult.data.result){
        const controlFrequency = yield getDeviceControlFrequency(deviceId);
        deviceList[index].identification.controlFrequency = controlFrequency;
        yield put(actions.setDeviceList(deviceList));
    }
}

export function* watchFetchDevices() {
    // yield fork(loginWatcherSaga);
    yield takeEvery(actions.getDeviceListSaga, fetchDevices);
    yield takeEvery(actions.reBootDeviceSaga, reBootDevice);
}
