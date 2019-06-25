var times;  // 获取新项目频次
var delay = 2000  // 延迟2秒，过短易出错
var repeat;  // 总评教次数
var item = 0;
var goodrate = 1;  // 评优率，默认100%，请设置于[0,1]区间

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function autoEval() {
	for (repeat=0; repeat < 5; repeat++) {
		for (times = 0; times < 10; times++) {
			await sleep(delay);
			if (document.querySelector('[class=alls-con] .stu-eva-con').querySelectorAll('.sys-card')[item]) {document.querySelector('[class=alls-con] .stu-eva-con').querySelectorAll('.sys-card')[item].querySelector('button').click();} else {break};
			await sleep(delay);
			Array.from(document.querySelectorAll('[aria-labelledby=rcDialogTitle0] .ant-radio-group')).map(a=>a.querySelectorAll(Math.random() < goodrate ? 'input[value="0.95"]' : 'input[value="0.75"]')).map(l => l[0]).map(c => c.click());
			await sleep(delay);
			document.querySelector('.ant-modal-footer').querySelector('.ant-btn-primary').click();
			await sleep(delay);
			if (document.querySelector('.ant-modal-close') != null) {document.querySelector('.ant-modal-close').click(); item++;};  // 无法评价的情况
		};
		document.querySelector('[class=alls-con] .stu-eva-con').querySelector('.stu-eva-more').querySelector('i').click();
	};
	alert('评教完成。\n共' + item + '次无法评价。');
};

autoEval();
