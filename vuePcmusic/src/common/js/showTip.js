export default function showTipBox(tipType,tipText) {
	$("#tipsBox").find(".tip").each(function (index,item) {
		$(item).removeClass("show");
	});
	$("#tipsBox").find(".tip_"+tipType).addClass("show").find(".tiptext").html(tipText);
	$("#backScreen").css("display","block");
	$("#tipsBox").css("display","block").on("animationend",function () {
		$(this).css("display","none");
		$("#backScreen").animate({
			"opacity":"0"
		},30,function () {
			$(this).css({
				"display":"none",
				"opacity":1
			});
		});
	});
};
