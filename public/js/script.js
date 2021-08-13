// make textarea grow with text
$(".autogrow").each(expandTextarea);
function expandTextarea(i, elem) {
	var elem = $(elem);
	var offset = elem.prop("offsetHeight") - elem.prop("clientHeight");
	var resizeTextarea = function (elem) {
		elem
			.css("height", "auto")
			.css("height", elem.prop("scrollHeight") + offset);
	};
	elem.on("keyup input", function () {
		resizeTextarea($(this));
	});
	resizeTextarea($(elem));
}
