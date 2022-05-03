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