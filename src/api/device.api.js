import { apiUrls } from './constants';
import axios from "axios";
import config from "./axiosAuth.api";
const baseURL = "https://my.wisp.net/nms/api/v2.1";
export default class DeviceApi {
    async getDevcieList() {
        try {
            const url = `${baseURL}/devices`;
            return await axios({...config, url});
        } catch (e) {
            console.log("error --->", e);
          return 'error';
        }
    }

    async getDeviceControlFrequency(deviceId) {
      try {
          const url = `${baseURL}/devices/airmaxes/${deviceId}/config/wireless`;
          // const url = "https://my.wisp.net/nms/api/v2.1/devices/airmaxes/2456e6c2-b1f5-4b25-8984-723108a25076/config/wireless"
          return await axios({...config, url});
      } catch (e) {
          console.log("error --->", e);
        return 'error';
      }
    
    }

    async reBootDevice(deviceId){
      try {
        const url = `${baseURL}/devices/${deviceId}/restart`;
        return await axios({...config, url, method:"post"});
      }catch(e){
        console.log("error --->", e);
        return "error";
      }
    }
}