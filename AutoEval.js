var times; // 获取新项目频次
var delay = 2000; // 延迟2秒，过短易出错
var repeat; // 总评教次数
var item = 0; // Evaluation block index
var good_rate = 1; // 评优率，默认100%，请设置于[0,1]区间
var finish; // Finishing alert

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function react_input(component, value) {
	// Credit: https://github.com/facebook/react/issues/11488#issuecomment-347775628
	let last_value = component.value;
	component.value = value;
	let event = new Event('input', { bubbles: true });
	// React 15
	event.simulated = true;
	// React 16
	let tracker = component._valueTracker;
	if (tracker) {
	  tracker.setValue(last_value);
	}
	component.dispatchEvent(event);
}

async function autoEval() {
	for (repeat=0; repeat < 5; repeat++) {
		for (times = 0; times < 10; times++) {

			await sleep(delay);

			if (document.querySelector('.stu-eva-con').querySelectorAll('.sys-card')[item])
			// Select an evaluation block

				{document.querySelector('.stu-eva-con').querySelectorAll('.sys-card')[item].querySelector('button').click();}
				// Click the start button

			else
				{break;}
				// No available evaluation block, exit the function

			await sleep(delay);

			var table_rows = document.querySelectorAll('.ant-table-wrapper')[1].querySelector('.ant-table-tbody').querySelectorAll('.ant-table-row');
			for (var i = 0; i < table_rows.length; i++) {
				var table_column = table_rows[i].querySelectorAll('td');
				react_input(table_rows[i].querySelector('input.ant-input'),
					Math.round(good_rate * parseInt(table_column[table_column.length-2].textContent)));
			}
			// Click all option refer to good evaluating rate

			await sleep(delay);

			document.querySelector('.ant-modal-footer').querySelector('.ant-btn-primary').click();
			// Click submit button

			await sleep(delay);

			var captcha = true;
			var block_img;
			try{
				block_img = document.querySelector('.ant-modal-body').querySelectorAll('img');}
			catch(e){
				block_img = [];
				captcha = false;
			}
			while (captcha) {
				if (block_img.length > 0) {
					if (block_img[block_img.length - 1].alt == "验证码") {alert("请手动输入验证码，然后稍作等待。");}
					else {
						captcha = false;
						break;
					}
				}
				else {
						captcha = false;
						break;
					}

				await sleep(delay * 10);

				try{
					document.querySelector('.ant-modal-footer').querySelector('.ant-btn-primary').click();
				// Submit again
				}
				catch(e){
					void(0);
					// Do nothing: user have clicked
				}
				await sleep(delay);
				try{
					block_img = document.querySelector('.ant-modal-body').querySelectorAll('img');}
				catch(e){
					block_img = [];
					captcha = false;
				}
			}
			// Detect if manually input captcha is needed

			if (document.querySelector('.ant-modal-close') != null) {document.querySelector('.ant-modal-close').click(); item++;}
			// Count if evaluation failed
		}

		document.querySelector('.stu-eva-con').querySelector('.stu-eva-more').querySelector('i').click();
		// Click get more
	}

	if (item > 0) {finish = "评教完成。\n共" + item + "次无法评价。";} else {finish = "评教已顺利完成。";}

	alert(finish);
}

autoEval();
