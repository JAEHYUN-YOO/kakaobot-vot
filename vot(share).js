/*vot 배포버전 1.0.32*/

/*
Made by nolbo
vot 베포파일
*/

/*Bot List*/
var ListHelp = FileStream.read("sdcard로 시작하는 ListHelp.txt경로 입력");
var ListInfo = FileStream.read("sdcard로 시작하는 ListInfo.txt경로 입력");
var ListLog = FileStream.read("sdcard로 시작하는 ListLog.txt경로 입력");
/*Bot Variable*/
var AllView = ("\u200b".repeat(500)); //전체보기
var BotPower = true; //봇 전원
var BotMsg = {}; //도배방지
var maker = unescape("%uB180%uBCF4");
//Log Date
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var BotDate = ("\n[ "+year+" . "+month+" . "+day+" "+hour+" : "+min+" : "+sec+" ] " );
var SenderDate = (year + " . "+month+" . "+day+"  "+hour+" : "+min+" : "+sec);

/*Utils Function*/
Utils.getPrintWeather = function(locate){
    try{
        var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=" +locate+ "%20날씨");
        data = data.replace(/<[^>]+>/g,"");
        data = data.split("월간")[1];
        data = data.split("시간별 예보")[0];
        data = data.trim();
        data = data.split("\n");
        var results = [];
        results[0] = data[0];
        results[1] = data[3].replace("온도", "온도 : ").trim() + "℃";
        results[2] = data[4].replace("온도", "온도 : ").trim() + "℃";
        results[3] = data[9].replace("먼지", "먼지 : ").trim();
        results[4] = data[13].replace("습도", "습도 :").trim() + "%";
        var result = "\n날씨 : " + results.join("\n")+"\n";
        return result;
    } catch(e) {
        return null;
    }
};

/*Api Function*/
Api.getEval = function(text){
    try{
        var result = eval(text);
        return result;
    } catch (e){
        return null;
    }
};

Api.getTran = function(BeforeText, AfterText, Text){
    var result = Api.papagoTranslate(BeforeText, AfterText, Text);
    return result;
};

Api.getTimer = function(sec){
    java.lang.Thread.sleep(sec * 1000);
};

Api.getCalculator = function(text){
    try{
        var result = eval(text);
        if(isNaN(eval(text))==true){
            return null;
        } else {
            return result;
        }
    } catch(e){
        return null;
    }
};

Api.getSearch = function(engin, text){
    try{
        var explain = ("\n"+text+"를(을) "+engin+"(으)로 검색함 : \n\n");
        if(engin == "google"){
            var result = (explain+"https://www.google.com/search?ie=UTF-8&client=ms-android-skt-kr&source=android-browser&q="+text.replace(/ /g, "%20")+"\n");
            return result;
        } else if(engin == "naver"){
            var result = (explain+"https://m.search.naver.com/search.naver?ie=UTF-8&query="+text+"&sm=and_hty&where=m\n");
            return result;
        } else if(engin == "daum"){
            var result = (explain+"https://m.search.daum.net/search?w=tot&q="+text+"\n");
            return result;
        } else if(engin == "bing"){
            var result = (explain+"https://www.bing.com/search?q="+text+"&qs=n&form=QBLH&sp=-1&pq="+text+"&sc=5-4&sk=&cvid="+text);
            return result;
        } else if(engin == "zum"){
            var result = (explain+"https://m.search.zum.com/search.zum?method=uni&option=accu&qm=f_typing.top&query="+text);
            return result;
        } else if(engin == "youtube"){
            var result = (explain+"https://m.youtube.com/results?search_query="+text);
            return result;
        } else if(engin == "yahoo"){
            var result = (explain+"https://search.yahoo.co.jp/search?&ei=UTF-8&p="+text+"&fr=top_smf&aq=-1&ai=J3CZAms9SUqshDhBY9Kg0A&oq="+text+"&aa=0&ts=5257&at=&iau=0");
            return result;
        }
    } catch(e){
        return null;
    }
};

Api.getEncoding = function(form, text){
    try{
        if(form == "1"){
            var result = escape(text);
            return result;
        } else if(form == "2"){
            var result = encodeURI(text);
            return result;
        } else if(form == "3"){
            var result = encodeURIComponent(text);
            return result;
        }
    } catch(e){
        return null;
    }
};

Api.getDecoding = function(form, text){
    try{
        if(form == "1"){
            var result = unescape(text);
            return result;
        } else if(form == "2"){
            var result = decodeURI(text);
            return result;
        } else if(form == "3"){
            var result = decodeURIComponent(text);
            return result;
        }
    } catch(e){
        return null;
    }
};

/*const Bot = {};
    
Bot.getPassword = function(){
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    var c = Math.floor(Math.random() * 10) + 1;
    var d = Math.floor(Math.random() * 10) + 1;
    var result = String(a)+String(b)+String(c)+String(d);

    return result;
};*/
//위 소스는 심심해서 만든겁니다(?) 쓰실분은 쓰세요.

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    try{

        var LogChat = FileStream.read("sdcard로 시작하는 로그파일이름.txt경로 입력/"+room+"Log.txt");
        FileStream.append("sdcard로 시작하는 로그파일이름.txt경로 입력/"+room+"Log.txt", BotDate+sender+" : "+msg);

         if (BotMsg[room] == msg) return;
         BotMsg[room] = msg;

        var cmd = msg.split(" ")[0];
        var data = msg.replace(cmd + " ", "");

        if(msg == "power"){
            if(BotPower == false){
                replier.reply("\n활성화 되었습니다.\n");
                BotPower = true;
            }
            else if(BotPower == true){
                replier.reply("\n비활성화 되었습니다.\n");
                BotPower = false;
            } 
        }

        if(BotPower == false){
            return;
        }

        else if(msg == "help"){
            replier.reply("\n"+maker+"\n제가 수행할 수 있는 기능을 실행하는 명령어 목록입니다.\n\n"+AllView+ListHelp+"\n");
        }

        else if(msg == "info"){
            replier.reply("\n"+maker+"\n저의 정보입니다.\n\n"+AllView+ListInfo+"\n");
        }

        else if(msg == "botlog"){
            replier.reply("\n저의 패치로그 입니다.\n\n"+AllView+ListLog+"\n");
        }

        else if(msg == "chatlog"){
            replier.reply("\n"+room+"의 채팅로그입니다.\n\n로그 용량 : "+LogLength+"B\n"+AllView+LogChat);
        }

        else if(msg == "delog"){
            if(sender == "관리자이름"){
                FileStream.remove("sdcard로 시작하는 로그파일이름.txt경로 입력"+room+"Log.txt");
                replier.reply("\n로그파일을 삭제하였습니다.\n");
            }
        }

        else if(msg == "compile"){
            replier.reply("\n컴파일을 시작합니다.\n");
            Api.compile();
            replier.reply("\n컴파일을 성공적으로 마쳤습니다.\n");
        }

        else if(cmd == "weather") {
            var result = Utils.getPrintWeather(data);
            if(result == null) {
                replier.reply("\n"+data + " 지역을 찾지 못하였습니다.\n(존재하는 지역인가요?)\n");
            } else {
                replier.reply(result);
            }
        }

        else if(cmd == "code"){
            var result = Api.getEval(data);
            if(result == null){
                replier.reply("\n입력된 코드에 오류가 있습니다!\n");
            } else {
                if(sender == "관리자이름"){
                    replier.reply(result);
                } else {
                    replier.reply("\n관리자 권한이 없습니다!\n");
                    return;
                }
            }
        }

        else if(cmd == "tran"){
            var bl = msg.split(" ")[1];
            var al = msg.split(" ")[2];
            var text = msg.replace("tran " + bl + " " + al, "");
            var result = Api.getTran(bl, al, text);
            replier.reply(result);
        }

        else if(cmd == "parse"){
            var result = Utils.getWebText(data);
            replier.reply("\n"+data+" 파싱결과입니다.\n\n"+AllView+result);
        }

        else if(cmd == "pjsoup"){
            var result = Utils.parse(data);
            replier.reply("\n파싱결과를 Jsoup Document로 반환하였습니다.\n\n"+AllView+result);
        }

        else if(cmd == "timer"){
            if(isNaN(eval(data)) == true){
                replier.reply("\n숫자만 입력하세요.\n");
                return;
            } else {
                if(data >= 86400){
                    replier.reply("\n값이 86400을 초과하였습니다.\n( 86400 이하의 값을 입력해주세요! )\n");
                    return;
                } else {
                    replier.reply("\n"+data+"초 후 시간완료 알림이 옵니다.\n");
                    Api.getTimer(data);
                    replier.reply("\n"+data+"초가 다 되었습니다!\n");
                }
            }
        }

        else if(msg == "date"){
            replier.reply("\n"+SenderDate+"\n");
        }

        else if(cmd == "cal"){
            var result = Api.getCalculator(data);
            if(result == null){
                replier.reply("\n계산과정에서 오류가 났습니다.\n");
                return;
            } else {
                replier.reply("\n"+data+" = "+result+"\n");
            }
        }

        else if(cmd == "search"){
            var e = msg.split(" ")[1];
            var t = msg.replace("search " + e +" ", "");
            t = t.replace(/ /g, "%20");
            var results = Api.getSearch(e, t);
            if(results == null){
                replier.reply("\n지원하지 않거나 없는 검색엔진 입니다.\n\n지원하는 검색엔진 : \n\ngoogle\nnaver\ndaum\nbing\nzum\nyoutube\nyahoo\n");
            } else {
                replier.reply(results);
            }    
        }

       /*배포버전에선 메모기능이 삭제되었습니다.
        메모소스를 받으실분은 카페로 말씀해 주세요.*/

        else if(cmd == "encode"){
            var f = msg.split(" ")[1];
            var t = msg.split(" ")[2];
            var result = Api.getIncoding(f, t);
            if(result == null){
                replier.reply("\n인코딩 과정에서 에러가 났습니다.\n");
            } else {
                f = f.replace("1", "escape");
                f = f.replace("2", "encodeURI");
                f = f.replace("3", "encodeURIComponent");
                replier.reply("\n"+f+"로 변환한 값입니다.\n"+AllView+"\n"+result+"\n");
            }
        }

        else if(cmd == "decode"){
            var f = msg.split(" ")[1];
            var t = msg.split(" ")[2];
            var result = Api.getDecoding(f, t);
            if(result == null){
                replier.reply("\n디코딩 과정에서 에러가 났습니다.\n");
            } else {
                f = f.replace("1", "unescape");
                f = f.replace("2", "decodeURI");
                f = f.replace("3", "decodeURIComponent");
                replier.reply("\n"+f+"로 변환한 값입니다.\n"+AllView+"\n"+result+"\n");
            }
        }

    }catch (e){
        var error = Api.getTran("en", "ko", e);
        var line = e.lineNumber;
        replier.reply("\n스크립트 에러가 발생했습니다!\n"+AllView+"\n행 : "+line+"\n"+error+"\n\n"+e+"\n");
        Log.error(e+"\n\n"+error, viewToast=false);
    }
}
