// JavaScript for Zero

$(document).ready(function() {
		"use strict";
		
		// Side menu
		$('.toggle-menu').jPushMenu();
		
		
		// Fancybox - Litebox
		$(".fancybox").fancybox();
		
		$('#nav').affix({
		  offset: {
			top: 655
		  }
		});
		
		
		// Parallax effect
		$(function(){
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 40,
				responsive:true
			});
		});
		
		
		
				
		// Zero Slider	
		$('.zero-slider').owlCarousel({
			autoPlay: true,
			navigation : true,
			slideSpeed : 700,
			paginationSpeed : 1000,
			singleItem:true,
			navigationText : ["",""],
		});
		
		
		// Bx slider carousel
		$('.our-talents').bxSlider(
        {
			auto:true,
           controls: false,
			moveSlides: 1,
           pager: true,
				
        });
		
		
		$('.works-detail-carousel').bxSlider(
        {
			auto:true,
           controls: false,
			moveSlides: 1,
           pager: true,
				
        });
		
		
});
// ends document ready



		// Recent works grid
		new GridScrollFx( document.getElementById( 'grid' ), {
			viewportFactor : 0.4
		} );
		
		
		// Awards counter 
		var lastWasLower = false;
		$(document).scroll(function(){
		
		var p = $( ".awards" );
		var position = p.position();
		var position2 = position.top;
	
		if ($(document).scrollTop() > position2-300){
		if (!lastWasLower)
		  $('#1').html('65');
	
		lastWasLower = true;
		} else {
		lastWasLower = false;
		}
		});
		
		// Wow animations
		wow = new WOW(
      	{
       		animateClass: 'animated',
        	offset:       100
      	}
    	);
    	wow.init();
		
		