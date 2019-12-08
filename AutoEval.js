var times;  // 获取新项目频次
var delay = 2000;  // 延迟2秒，过短易出错
var repeat;  // 总评教次数
var item = 0;  // Evaluation block index
var goodrate = 1;  // 评优率，默认100%，请设置于[0,1]区间
var finish;  // Finishing alert

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function autoEval() {
	for (repeat=0; repeat < 5; repeat++) {
		for (times = 0; times < 10; times++) {

			await sleep(delay);

			if (document.querySelector('[class=alls-con] .stu-eva-con').querySelectorAll('.sys-card')[item]) 
			// Select an evaluation block

				{document.querySelector('[class=alls-con] .stu-eva-con').querySelectorAll('.sys-card')[item].querySelector('button').click();} 
				// Click the start button

			else
				{break};
				// No available evaluation block, exit the function

			await sleep(delay);

			Array.from(document.querySelectorAll('[aria-labelledby=rcDialogTitle0] .ant-radio-group')).map(a=>a.querySelectorAll(Math.random() < goodrate ? 'input[value="0.95"]' : 'input[value="0.75"]')).map(l => l[0]).map(c => c.click());
			// Click all option refer to good evaluating rate

			await sleep(delay);

			document.querySelector('.ant-modal-footer').querySelector('.ant-btn-primary').click();
			// Click submit button

			await sleep(delay);

			var captcha = true
			try{
				var block_img = document.querySelector('.ant-modal-body').querySelectorAll('img')}
			catch(e){
				var block_img = [];
				captcha = false;
			}
			while (captcha) {
				if (block_img.length > 0) {
					if (block_img[block_img.length - 1].alt == "验证码") {alert("请手动输入验证码（区分大小写）！");}
					else {
						captcha = false;
						break;
					};
				} 
				else {
						captcha = false;
						break;
					};

				await sleep(delay * 10);

				try{
					document.querySelector('.ant-modal-footer').querySelector('.ant-btn-primary').click();
				// Submit again
				}
				catch(e){
					null;
					// User have clicked
				};
				await sleep(delay);
				try{
					var block_img = document.querySelector('.ant-modal-body').querySelectorAll('img')}
				catch(e){
					var block_img = [];
					captcha = false;
				};
			};
			// Detect if manually input captcha is needed

			if (document.querySelector('.ant-modal-close') != null) {document.querySelector('.ant-modal-close').click(); item++;};
			// Count if evaluation failed
		};

		document.querySelector('[class=alls-con] .stu-eva-con').querySelector('.stu-eva-more').querySelector('i').click();
		// Click get more
	};

	if (item > 0) {finish = "评教完成。\n共" + item + "次无法评价。"} else {finish = "评教已顺利完成。"};

	alert(finish);
};

autoEval();
