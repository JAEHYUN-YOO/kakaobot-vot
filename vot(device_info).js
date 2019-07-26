/*vot 배포버전 중 device명령어*/

/*
Made by nolbo
vot 배포파일 : 
*/

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){

  if(msg == "device"){  //만약 device라고 한다면..
            var b = Device.getAndroidVersionCode(); //안드로이드 버전
            var c = Device.getAndroidVersionName(); //버전코드
            var e = Device.getPhoneModel();  //기기모델
            var f = Device.isCharging();  //충전여부
            var g = Device.getPlugType();  //전원
            var h = Device.getBatteryLevel();  //배터리 잔량
            var j = Device.getBatteryTemperature() * 0.1; //배터리 온도 (섭씨)
            var k = Device.getBatteryVoltage() * 0.001;  //배터리 전압 (볼트)

            replier.reply("\n안드로이드 버전 : "+c+"\n버전코드 : "+b+"\n\n기기 모델 : "+e+"\n충전여부 : "+f+"\n전원 : "+g+"\n배터리 잔량 : "+h+"%\n배터리 온도 : "+j+"°C\n배터리 전압 : "+k+"V\n");
  }
}
