let envelope_opened = false;

let content = {
	to			: "",
	from		: "",
	recipient	: "",
	text		: "",
	sign		: 0
};

$("#open").click(function () {

	if (!envelope_opened) {

		new Typed('.letter', {
			strings: [
				"^1000亲爱的光光&nbsp;&nbsp;" + content.to,
				content.recipient + "^200亲爱的臭光光;^200你好哇！还有两周我又可以见到你了呢！<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^200每一次的相见都让我感到欣喜，每一次分离都让我依依不舍。;^200上一次在沈阳北站，还有二十几分钟你的高铁就要发车，我握着你的手，似乎，你没有离开我就已经开始想念……;^200嘻嘻，希望我们相聚相爱的时间久一点，再久一点，如果为它加一个期限，我希望是永远。光光宝贝，情人节快乐。<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				content.text + "<br><br><p style='float:right; display:block; width:" + 
				content.sign + "px;'>^1000" +
				content.from + "^200你的鸣鸣</p>"
			],
			typeSpeed: 100,
			backSpeed: 50
		});

		$('#open').find("span").eq(0).css('background-position', "0 -150px");

		envelope_opened = true;

		let player = document.getElementById('music');
		if (player.paused) {
			player.play();
			$('#music_btn').css("opacity", "1");
			$('#music_btn').css("display", "block");
		}
	}

});

function playPause() {
	let player = document.getElementById('music');
	let play_btn = $('#music_btn');

	if (player.paused) {
		player.play();
		play_btn.css("opacity", "1");
	}
	else {
		player.pause();
		play_btn.css("opacity", "0.2");
	}
}


function toBase64(audioURL) {
	window.URL = window.URL || window.webkitURL;
	let xhr = new XMLHttpRequest();
	xhr.responseType = "blob";
	xhr.open("GET", audioURL, true);
	xhr.onload = function () {
		if (this.status == 200) {
			let reader = new FileReader();
			reader.readAsDataURL(this.response);
			reader.onload = function () {
				$('#music').attr('src', reader.result);
				$('#envelope').fadeIn('slow');
				$('.heart').fadeOut('fast');
				let currentUrl = window.location.href;
				let firstIndex = currentUrl.indexOf("#");
				if (firstIndex <= 0) window.location.href = currentUrl + "#contact";
			};

		}
	}
	xhr.send(null);
}


window.onresize = function () {
	let cherry_container = $('#jsi-cherry-container');
	let canvas = cherry_container.find('canvas').eq(0);
	canvas.height(cherry_container.height());
	canvas.width(cherry_container.width());
	// Do scaling for sakura background when the window is resized
	loadingPage();
}

function loadingPage() {
	let heart_div = $('.heart');
	let heart_parent = heart_div.parent();
	let page_width = heart_parent.width();
	let page_height = heart_parent.height();
	let heart_width = heart_div.width();
	let heart_height = heart_div.height();
	heart_div.css('top', (page_height - heart_height) / 2);
	heart_div.css('left', (page_width - heart_width) / 2);
}

window.onload = function () {

	loadingPage();

	$.ajaxSettings.async = false;
	$.getJSON("./font/content.json", function (result) {
		content.to = result.to;
		content.from = result.from;
		content.recipient = result.recipient;
		content.text = result.text;
		content.sign = (2 + content.from.length) * 20;
		$('#recipient').append(content.to);
	});

	toBase64("./bgm/bgm.mp3");

	document.addEventListener('touchstart', function (event) {
		if (event.touches.length > 1) event.preventDefault();
	});

	let lastTouchEnd = 0;

	document.addEventListener('touchend', function (event) {

		let now = (new Date()).getTime();
		if (now - lastTouchEnd <= 300) event.preventDefault();
		lastTouchEnd = now;

	}, false);

	document.addEventListener('gesturestart', function (event) {
		event.preventDefault();
	});

	$('body').css('opacity', '1');
	$('#jsi-cherry-container').css('z-index', '-99');

}