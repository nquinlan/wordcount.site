function makeExpandingArea(container) {
 var area = container.querySelector('textarea');
 var span = container.querySelector('span');
 if (area.addEventListener) {
   area.addEventListener('input', function() {
     span.textContent = area.value;
   }, false);
   span.textContent = area.value;
 } else if (area.attachEvent) {
   // IE8 compatibility
   area.attachEvent('onpropertychange', function() {
     span.innerText = area.value;
   });
   span.innerText = area.value;
 }
 // Enable extra CSS
 container.className += ' active';
}

var areas = document.querySelectorAll('.expandingArea');
var l = areas.length;

while (l--) {
 makeExpandingArea(areas[l]);
}
function count(obj, mod) {
	mod = (mod == false) ? 0 : 1;
	return obj ? obj.length + mod : mod;
}
function decimal (num, dec) {
	num = num ? num : 0;
	dec = dec ? dec : 0;
	mod = Math.pow(10,dec);
	return Math.round(num*mod)/mod;
}

var stats = Object;
var showStat;
var keystrokeCount = 0;

function charCount(object) {
	text = object.val();

	// SYNC
	// $(".expandingArea span").text(text);

	// COUNTS
	// Character
	stats.character = text.length;
	// Word
	stats.word = count(text.match(/\S+/g), false);
	// Sentences
	stats.sentence = count(text.match(/[.!?]+\s/g));
	// Paragraphs
	stats.paragraph = count(text.match(/(\r\n|\r|\n)+/g));

	// CALCULATIONS
	// Characters Per…
	stats.cpw = decimal(stats.character/stats.word,1);
	stats.cps = decimal(stats.character/stats.sentence,1);
	stats.cpp = decimal(stats.character/stats.paragraph,1);

	// Words Per…
	stats.wps = decimal(stats.word/stats.sentence,1);
	stats.wpp = decimal(stats.word/stats.paragraph,1);

	// Sentences Per…
	stats.spp = decimal(stats.sentence/stats.paragraph,1);

	// PRINT
	$.each(stats, function (key, value) {
		$("#statistics .stat_data.c_" + key).text(value);
	});

	// ADS
	if(stats.word >= 100 && !$("#ads .ad").length) {
		$("#ads").append('<a href="http://tr.grammarly.com/aff_c?offer_id=3&aff_id=1490&file_id=22&source=TextSt.at" target="_blank" class="ad"><img src="http://media.go2speed.org/brand/files/grammarly/3/300x250_en.png" width="300" height="250" border="0" /></a><img src="http://tr.grammarly.com/aff_i?offer_id=3&aff_id=1490&file_id=22" width="1" height="1">').fadeIn(1000,function () {
			$("#ads").addClass("activated").css("display", "");
			$("#ads :last-child").click(function () {
				_gaq.push(['_trackEvent', 'Ad', 'Affiliate', 'Grammarly', stats.word]);
			});
		});
	}
}

$(function() {
	charCount($("#StatText"));
	$("#behind").click(function() { $("#StatText").focus(); });
	$("#StatText").focus().select().bind('keyup click blur focus change paste', function() {
		charCount($(this));
	}).bind('keyup', function() {
		keystrokeCount ++;
		if($(".distracting").css("opacity") > 0 && keystrokeCount > 2){
			$(".distracting").fadeTo(700,0);
		}
		clearTimeout(showStat);
		showStat = setTimeout('$(".distracting").fadeTo(400, 1);keystrokeCount=0;', 500);	
	});
});