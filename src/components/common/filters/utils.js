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
export {
	timer,
	timerShort,
	date,
}