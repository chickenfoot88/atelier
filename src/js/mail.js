$(function(){
	$("#contact-form")
	// .validator({
	// 	'focus': false
	// })
	.on('submit', function(e) {

		console.log('submit');

		if(!e.isDefaultPrevented()) {

			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize(),
				success: function() {
					$(th).find(".success").addClass("active").css("display", "flex").hide().fadeIn();
					setTimeout(function() {
						$(th).find(".success").removeClass("active").fadeOut();
						th.trigger("reset");
					}, 4000);
				},
				error: function () {
				},
				failure: function () {
				}
			})

			return false;
		}

	});

});
