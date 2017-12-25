var bgFlag=false;
//h1,h2……
function Hbtns(v) {

	if(HbtnFlag == true || Hbtn != v) {
		document.execCommand('formatBlock', false, v);
		HbtnFlag = false;
		Hbtn = v;
	} else {
		document.execCommand('formatBlock', false, 'p');
		HbtnFlag = true;
	}

}
//加粗 斜……
function btns(v) {
	document.execCommand(v, false, null);
}
//颜色
function Fbtns(v) {
	if(CbtnFlag == true || Cbtn != v) {
		document.execCommand('foreColor', false, v);
		CbtnFlag = false;
		Cbtn = v;
	} else {
		document.execCommand('foreColor', false, 'black');
		CbtnFlag = true;
	}
}
//居右
function tRight() {
	document.execCommand('justifyRight', false, null);
}
//居中
function tCenter() {
	document.execCommand('justifyCenter', false, null);
}
//向左
function tLeft() {
	document.execCommand('justifyLeft', false, null);
}

// 插入图片到text
function insertImg(vs) {
	document.execCommand('insertImage', false, vs);  //todo 改
}
//对齐
function tFull() {
	document.execCommand('justifyFull', false, null);
}
//line
function theLine() {
	document.execCommand('insertHorizontalRule', false, null);
}
//背景颜色
function bgBtn(v) {
	if(bgFlag==false){
		document.execCommand('backColor', false, v);
		bgFlag=true;
	}else{
		document.execCommand('backColor', false, 'white');
		bgFlag=false;
	}
}
//代码
function CodeBtn() {
	document.execCommand('insertHTML', false, '<ol class="CodeOl"><li></li></ol>');
}