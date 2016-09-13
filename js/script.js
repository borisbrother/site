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

	function changeSlide(slideIndex) {		
		$slide = $slides.eq(slideIndex);
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
		changeControl(slideIndex);
		ind = changeIndex(slideIndex);			
	}


	function changeControl(slideIndex) {
		$contr = $controlBox.find("li").eq(slideIndex);
		$contr.siblings().removeClass("active");
		$contr.addClass("active");
	}

	function changeIndex(slideIndex) {
		slideIndex += 1;
		if (slideIndex >= numSlides) return 0;
		if (slideIndex < 0 ) return numSlides - 1;
		return slideIndex;
	}

	
	function startSlide() {	
		
		changeSlide(ind);	
	}

	var $slides = $('.slider ul li');
	var numSlides = $slides.length;
	var $controlBox = $('#slideControl ul');
	var ind = 0;
	var interval;

	$slides.each(function(ind, elem) {$(this).hide();});
	
	

	
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
		changeSlide(ind);
	})

	$('.caption-wrap').hover(function() {
		clearInterval(interval);
	}, function() {
		interval = setInterval(startSlide, 5000);
	});

	$('.slider').waitForImages(function() {
		changeSlide(ind);
    	interval = setInterval(function() {
			changeSlide(ind);
		}, 5000);   	 
	});
	

	// -------------------------- callback-popup -----------------------------------
	
	$('.callback a').on("click", function(e) {
		e.preventDefault();
		$popupCallback = $('.callback-popup').bPopup();
	});

	$('.closebutton').on('click', function(e) {
		e.preventDefault();
		$popupCallback.close();
	});
	

	// ---------------------------- phone mask input ---------------------------
	$.mask.definitions['9'] = '';
	$.mask.definitions['d'] = '[0-9]';
	$("#phone_number").mask("+992 (dd) ddd-dd-dd");
});