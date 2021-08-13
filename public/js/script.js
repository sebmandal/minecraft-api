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

const toggleDarkMode = () => {
	if ($("body").hasClass("bg-dark")) {
		$("body").removeClass("bg-dark");
		$("body").removeClass("text-light");
	} else {
		$("body").addClass("bg-dark");
		$("body").addClass("text-light");
	}
};
