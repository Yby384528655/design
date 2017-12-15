let timer = (value) => {
	let time_html = "";
	if(value == null || value == ''){
		time_html = "-";
		return time_html;
	}else{
		time_html = new Date(value);
		let y = time_html.getFullYear();
		let m = time_html.getMonth() + 1;
		m < 10 && (m = '0' + m);
		let d = time_html.getDate();
		d < 10 && (d = '0' + d);
		let h = time_html.getHours();
		h < 10 && (h = '0' + h);
		let M = time_html.getMinutes();
		M < 10 && (M = '0' + M);
		var now = new Date();
		var nowY = now.getFullYear();
		var nowM = now.getMonth() + 1;
		nowM < 10 && (nowM = '0' + nowM);
		var nowD = now.getDate();
		nowD < 10 && (nowD = '0' + nowD);
		if((y + "-" + m + "-" + d) == (nowY + "-" + nowM + "-" + nowD)) {
			time_html = h + ':' + M;
		} else {
			time_html = y + "-" + m + "-" + d + " "+ h + ':' + M;
		}
		return time_html;
	}
}
let timerShort = (value) => {
	let time_html = "";
	if(value == null || value == ''){
		time_html = "-";
		return time_html;
	}else{
		time_html = new Date(value);
		let y = time_html.getFullYear();
		let m = time_html.getMonth() + 1;
		m < 10 && (m = '0' + m);
		let d = time_html.getDate();
		d < 10 && (d = '0' + d);
		time_html = y + "-" + m + "-" + d;
		return time_html;
	}
}
let  date=(value)=>{
    let time_html = new Date(value);
    let y = time_html.getFullYear();
    let m = time_html.getMonth() + 1;
    m < 10 && (m = '0' + m);
    let d = time_html.getDate();
    d < 10 && (d = '0' + d);
    let h = time_html.getHours();
    let M = time_html.getMinutes();
    M < 10 && (M = '0' + M);
    time_html = y + "-" + m + "-" + d ;
    return time_html;
}
let  seconds=(value)=>{
    let seconds_html = Number(value);
    if(seconds_html<=60){
    	value<10 && (value = '0' + value)
        seconds_html = '00`'+value+"``";
    }else if(seconds_html>60){
        let m1 = parseInt(seconds_html/60);
        m1 < 10 && (m1 = '0' + m1);
        let m2 = seconds_html%60;
        m2 < 10 && (m2 = '0' + m2);
        seconds_html =m1+'`'+m2+"``";
    }
    return seconds_html;
}
let clear = (value)=>{
	let data_html = value;
    if(data_html == '0'){
        data_html = "-";
    }
    return data_html;
}
let receiveStatus = (value) => {
	var status = '';
	switch(value) {
		case true:
			status = "已读";
			break;
		case false:
			status = "未读";
			break;
	}
	return status
}
let mailStatue = (value) => {
	var status = '';
	switch(value) {
		case true:
			status = "已读";
			break;
		case false:
			status = "未读";
			break;
		case -1:
			status = "存草稿";
			break;
		case 0:
			status = "发送失败";
			break;
		case 1:
			status = "已提交发送";
			break;
		case 2:
			status = "发送成功";
			break;
	}
	return status
}
let boxType = (value) => {
	var status = '草稿箱';
	switch(value) {
		case -1:
			status = "收件箱";
			break;
		case -5:
			status = "发件箱";
			break;
		case -3:
			status = "草稿箱";
			break;
		case -101:
			status = "垃圾箱";
			break;
		case -11:
			status = "归并箱";
			break;
	}
	return status
}
let textCut = (value) => {
	let data_html = value;
    if(data_html == '' || data_html == null){
        data_html = "无";
    }else{
    	data_html = data_html.substr(0,2);
    }
    return data_html;
}
let filterName = (value) =>{
	let name = "";
	let start = value.indexOf("<");
	if(start != -1){
		name = value.substring(0, start);	
	}else{
		name = "陌生人";
	}
	return name;
}
let callState = (value) =>{
	let state = "";
	switch(value) {
		case 'Ring':
			state = "呼叫中";
			break;
		case 'Ringing':
			state = "呼叫中";
			break;
		case 'Link':
			state = "通话中";
			break;
		case 'Hangup':
			state = "待机";
			break;
		case 'Unlink':
			state = "待机";
			break;	
		case 'Waiting':
			state = "转接中";
			break;
		case '3':
			state = "主叫拒接";
			break;
		case '4':
			state = "主叫已接听";
			break;
			
	}
	return state;
}
export {
	timer,
	timerShort,
	receiveStatus,//收件箱，归并箱
	boxType,
	mailStatue,// 垃圾箱（收件箱，发件箱）
	date,
	seconds,		//数据统计
	clear,			//数据统计
	filterName,		//收件箱发件人名字
	callState,		//通话状态
	textCut			//文字截取
}