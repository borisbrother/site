$(function() {
	var curDate = new Date();
	var inDay = new Date();
	inDay.setDate(curDate.getDate() +1);
	var $dateFrom = $("#dateFrom");
	var $dateTo = $("#dateTo");
	$dateFrom.val(('0'+curDate.getDate()).slice(-2) + "." + ('0'+(curDate.getMonth()+1)).slice(-2) + "." + curDate.getFullYear());
	$dateTo.val(('0'+inDay.getDate()).slice(-2) + "." + ('0'+(inDay.getMonth()+1)).slice(-2) + "." + inDay.getFullYear());
	

	$dateFrom.datepicker({
		autoClose:true,
		minDate: curDate
	});
	$dateTo.datepicker({
		autoClose:true,
		minDate: inDay
	});

	// ---------------------------------------слайдер---------------------------------------

	function changeSlide($slide) {		
		$slide.siblings().find('.image-box img').animate({"opacity":0},600);
		$slide.siblings().find('.caption-wrap').animate({"opacity":0},600);
		$slide.siblings().find('.caption').css("left","-100%");
		$slide.siblings().hide();
		$slide.show();
		$slide.find('.image-box img').animate({"opacity":1},500);
		setTimeout(function() {
			$slide.find('.caption-wrap').animate({"opacity":1},500);
		}, 500);
		setTimeout(function() {
			$slide.find('.caption').animate({"left":"0%"},500);
		}, 800);
		
		

		changeControl($currentControl);
		
	}


	function changeControl($contr) {
		$contr.siblings().removeClass("active");
		$contr.addClass("active");
	}

	function changeIndex(ind) {
		ind += 1;
		console.log(ind);
		if (ind >= numSlides) return 0;
		if (ind < 0 ) return numSlides - 1;
		return ind;
	}

	
	function startSlide() {	
		changeSlide($currentSlide);		
		$currentSlide = $slides.eq(ind);
		$currentControl = $controlBox.find("li").eq(ind);
		
		ind = changeIndex(ind);
	}

	var $slides = $('.slider ul li');
	var numSlides = $slides.length;
	var $controlBox = $('#slideControl ul');
	var ind = 0;
	var interval;

	$slides.each(function(ind, elem) {$(this).hide();});
	var $currentSlide = $slides.first();
	

	
	for(var i= 1; i<=numSlides; i++) {
		$li = $('<li/>');
		var $slideItem = $('<a/>', {
			href: "#" + i,
			html: '&nbsp;'
		});
		$li.append($slideItem);
		$controlBox.append($li);
	}

	var $currentControl = $controlBox.find("li").first();
	$currentControl.addClass('active');

	

	

	$controlBox.find("li a").on("click", function(e) {
		clearInterval(interval);
		e.preventDefault();
		ind = $(this).attr("href").replace('#', '')-1;
		$currentSlide = $slides.eq(ind);
		$currentControl = $controlBox.find("li").eq(ind);
		changeSlide($currentSlide);
	})

	$('.caption-wrap').hover(function() {
		clearInterval(interval);
	}, function() {
		interval = setInterval(startSlide, 5000);
	});

	$('.slider').waitForImages(function() {
	    // changeSlide($currentSlide);	
	    startSlide();
	    interval = setInterval(startSlide, 5000);	
	});
	

	
});