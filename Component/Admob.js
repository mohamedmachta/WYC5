import React, { memo, useEffect } from "react";
import { Button } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";


const AdmobPub = () => {
     useEffect(() => {
        async function fetchMyAPI() {
        await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313'); 
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
        }
      fetchMyAPI()
    },[]);

}
export default memo(AdmobPub);