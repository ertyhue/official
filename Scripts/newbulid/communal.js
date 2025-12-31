$(function () {
	/*絲取����吓���������*/
	$(".main-nav .menu .menu-hd").hover(function () {
		$(this).parents(".menu").addClass("hover").end().siblings(".menu-bd").show();
	}, function () {
		$(this).parents(".menu").removeClass("hover").end().siblings(".menu-bd").hide();
	});
	$(".main-nav .menu .menu-bd").hover(function () {
		$(this).show().parents(".menu").addClass("hover").end().siblings(".menu-hd").show();
	}, function () {
		$(this).hide().parents(".menu").removeClass("hover");
	});
	/*END絲取����吓���������*/
})