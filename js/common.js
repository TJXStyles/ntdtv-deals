/*-------------------------------------------

    Title :  NTDTV local
    Usage :  common JS
    Author:  NTDTV
    Edited:  2015-02-12

---------------------------------------------*/



/*  Ready
---------------------------------------------*/

jQuery(document).ready(function($) {

	// Homepage

	if (document.body.id == 'home') {

		var amountOfSlide = $('#hot li').length;
		$('#hot ul')
			.after('<div class="ctrl"><span class="pager">3 / ' + amountOfSlide + '</span></div>')
			.wrap('<div class="jcarousel"></div>')
			.parent()
				.jcarousel({
					wrap      : 'both',
					animation : { duration: 600, easing: 'easeInOutQuad' }
				});
		var hotjCarousel = $('#hot .jcarousel');
		var hotjCarouselCtrl = $('#hot .ctrl');
		var prevBtn = $('<a class="prev" data-elusive-icon="&#xe6fd"></a>').appendTo(hotjCarouselCtrl);
		var nextBtn = $('<a class="next" data-elusive-icon="&#xe6fc"></a>').appendTo(hotjCarouselCtrl);
		nextBtn
			.jcarouselControl({
				carousel :  hotjCarouselInstance,
				target   : '+=3'
			});
		prevBtn
			.jcarouselControl({
				carousel :  hotjCarouselInstance,
				target   : '-=3'
			});
		var hotjCarouselInstance = hotjCarousel.data('jcarousel');
		hotjCarousel.on('jcarousel:targetin', 'li', function(event, carousel) {
			var curr = ($(this).index() + 1 + 2) > amountOfSlide ? amountOfSlide : ($(this).index() + 1 + 2);
			hotjCarouselCtrl.find('.pager').text(curr + ' / ' + amountOfSlide);
		});

	}


	// Fresh Things page

	else if (document.body.id == 'fresh-things') {

		if ($('#hot .header h4').length) {
			$('#hot .header h4')
				.click(function() {
					if ($(document).scrollTop() > $('#hot').offset().top) {
						$(window).scrollTop($('#hot').offset().top);
					}
					$(this).addClass('curr').parent().siblings().find('h4').removeClass('curr');
					freshThingsLoad($.trim($(this).attr('class').replace('curr', '').replace('hot', '')));
				})
				.filter('.curr').click();
		}
		else {
			freshThingsLoad($('.pagenav').attr('id').replace('-pagenav', ''));
		}

		var $body = $('body');
		var waypoint = new Waypoint({
			element  :  $('#hot .header'),
			handler  :  function() {
							$body.toggleClass('sticky-hot');
						}
		});

		$('#featured input[type="date"]')
			.removeAttr(ltIE9 ? null : 'type')
			.datepicker({
				dayNamesMin : ['S', 'M', 'T', 'W', 'T', 'F', 'S']
			});

	}

	else if (document.body.id == 'deals-page') {
		$('#font .size').on('click', function() {
			changeFontSize();
		});

		if ($('#hot .header h4').length) {
			$('#hot .header h4')
				.click(function() {
					if ($(document).scrollTop() > $('#hot').offset().top) {
						$(window).scrollTop($('#hot').offset().top);
					}
					$(this).addClass('curr').parent().siblings().find('h4').removeClass('curr');
					freshThingsLoad($.trim($(this).attr('class').replace('curr', '').replace('hot', '')));
				})
				.filter('.curr').click();
		}
	}

	// Fresh Things article page

	else if (document.body.id == 'fresh-things-article') {

		$('#font .size').click(function() {
			changeFontSize();
		});

		var $numOfPages = $('<div class="num"><div class="curr">1</div><div class="total">' + $('#article .gallery .item').length + '</div></div>').insertAfter('#article .gallery .list');
		$('#article .gallery .list')
			.after('\
				<div class="nav">\
					<a class="prev" data-font-awesome-icon="&#xf104"></a>\
					<a class="next" data-font-awesome-icon="&#xf105"></a>\
				</div>\
			')
			.cycle({
				slides       : '.item',
				fx           :  ltIE9 ? 'none' : 'fadeout',
				timeout      :  5000,
				speed        :  ltIE9 ? 1 : 200,
				pauseOnHover : '#article .gallery',
				prev         : '~ .nav .prev',
				next         : '~ .nav .next',
				log          :  false
			})
			.on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
				$numOfPages.find('.curr').text($(incomingSlideEl).index());
			})
			.cycle('pause');

		$('#slideshow').closest('#main')
			.prepend('\
				<div class="slideshow-nav">\
					<a class="prev" data-font-awesome-icon="&#xf104"></a>\
					<a class="next" data-font-awesome-icon="&#xf105"></a>\
				</div>\
			')
			.find('#slideshow .fig')
				.append('<div class="before"></div>');
		$('#slideshow')
			.prepend('<div class="before"></div>')
			.cycle({
				slides       : '.item',
				fx           :  ltIE9 ? 'none' : 'fadeout',
				timeout      :  5000,
				speed        :  ltIE9 ? 1 : 200,
				prev         : '.slideshow-nav .prev',
				next         : '.slideshow-nav .next',
				log          :  false
			})
			.cycle('pause');

		var $body = $('body');
		var waypoint = new Waypoint({
			element  :  $body,
			handler  :  function() {
							$body.toggleClass('sticky-hot');
						},
			offset   :  -100
		});

	}


	// VOD page

	else if (document.body.id == 'vod') {

		$('#main')
			.find('#slideshow .fig')
				.append('<div class="before"></div>');
		$('#slideshow')
			.prepend('<div class="before"></div><div class="pager"></div>')
			.cycle({
				slides        : '.item',
				fx            :  ltIE9 ? 'none' : 'fadeout',
				timeout       :  5000,
				speed         :  ltIE9 ? 1 : 200,
				pager         : '#slideshow .pager',
				pagerTemplate : '<a></a>',
				pauseOnHover  : '#slideshow',
				prev          : '.slideshow-nav .prev',
				next          : '.slideshow-nav .next',
				log           :  false
			})
			.cycle('pause');

	}


	// Live page

	else if (document.body.id == 'live') {

		$('#switch .box .right .timezone select').selectmenu({
			maxHeight       :  420,
			style           : 'popup',
			positionOptions :  { my : 'left top', at : 'left bottom', collision : 'none' }
		});

		$('#switch .box .right .channel ul li')
			.click(function() {
				$(this).addClass('curr').siblings().removeClass('curr');
				$(this).closest('.channel').find('.scroll').removeClass('curr').eq($(this).index()).addClass('curr');
			})
			.filter('.curr').click();

		$('#switch .box .right .channel .scroll').wrapInner('<div class="scroll-pane"></div>').find('.scroll-pane').jScrollPane();

	}


	// Search Results page

	else if (document.body.id == 'search-results') {

		freshThingsLoad($('.pagenav').attr('id').replace('-pagenav', ''));

		var $body = $('body');
		var waypoint = new Waypoint({
			element  :  $('#hot'),
			handler  :  function() {
							$body.toggleClass('sticky-hot');
						}
		});

	}


	// IE8 fixes

	if (ltIE9) {

		$('#newsletter .right form div ul li input').change(function() {
			$(this).toggleClass('checked');
		});

		$('#fresh-things #title').prepend('<div class="before"></div>');

	}


	// common elements

	var amountOfSlide = $('#related li').length;
	if (amountOfSlide) {
		$('#related ul')
			.after('<div class="ctrl"><span class="pager">4 / ' + amountOfSlide + '</span></div>')
			.wrap('<div class="jcarousel"></div>')
			.parent()
				.jcarousel({
					wrap      : 'both',
					animation : { duration: 600, easing: 'easeInOutQuad' }
				});
		var relatedjCarousel = $('#related .jcarousel');
		var relatedjCarouselCtrl = $('#related .ctrl');
		var prevBtn = $('<a class="prev" data-elusive-icon="&#xe6fd"></a>').appendTo(relatedjCarouselCtrl);
		var nextBtn = $('<a class="next" data-elusive-icon="&#xe6fc"></a>').appendTo(relatedjCarouselCtrl);
		nextBtn
			.jcarouselControl({
				carousel :  relatedjCarouselInstance,
				target   : '+=4'
			});
		prevBtn
			.jcarouselControl({
				carousel :  relatedjCarouselInstance,
				target   : '-=4'
			});
		var relatedjCarouselInstance = relatedjCarousel.data('jcarousel');
		relatedjCarousel.on('jcarousel:targetin', 'li', function(event, carousel) {
			var curr = ($(this).index() + 1 + 3) > amountOfSlide ? amountOfSlide : ($(this).index() + 1 + 3);
			relatedjCarouselCtrl.find('.pager').text(curr + ' / ' + amountOfSlide);
		});
	}

	$('#newsletter .right form')
		.after('<div class="gap"></div><div class="error-message"></div><div class="gap"></div>')
		.find('input[type="email"]')
			.attr('data-message', '邮箱地址必须填写.')
		.end()
		.validator({
			errorInputEvent : 'blur',
			singleError     :  true,
			speed           :  300
		})
		.submit(function(e) {
			e.preventDefault();
			if ($('#newsletter .right form').find('input.invalid').length === 0) {
				// do something else here
			}
		});

	$('[data-like-num]:empty').each(function() {
		var $ele = $(this);
		$.getJSON($ele.attr('data-like-num'), function(data) {
			$ele.text(data.data[0].total_count);
		});
	});

	var imagesFolderPath = $('#logo').css('background-image').match(/http.*images\//)[0];
	var newImg1 = new Image();
	newImg1.onload = function() { $('#ihss .toggle').addClass('bg-img-loaded') }
	newImg1.src = imagesFolderPath + 'bg_ihss_toggle.png';
	var newImg2 = new Image();
	newImg2.onload = function() { $('#font .translate').addClass('bg-img-loaded') }
	newImg2.src = imagesFolderPath + 'sprite.png';

	$('#ihss .toggle').click(function() {
		var $ihss = $(this).parent().addClass('show-content');
		if (!Modernizr.cssanimations) {
			$ihss.stop().animate({ 'width': $ihss.find('span').hasClass('right') ? 41 : 261 }, 600, 'easeInOutQuad', function() { $ihss.find('span').toggleClass('right') });
		}
		else {
			$ihss.toggleClass('open');
			setTimeout(function() { $ihss.find('span').toggleClass('right') }, 600);
		}
	});

	$('[placeholder]')
		.placeholder()
		.addClass('js')
		.focus(function() {
			if (!Modernizr.placeholder) this.defaultValue = $(this).attr('placeholder');
			$(this).addClass('entered');
			if (!this.onblur) $(this).blur(function() { if (this.value == this.defaultValue) $(this).removeClass('entered') });
		});

	if (Modernizr.placeholder) {
		$('#srch-form [placeholder]')
			.unbind('focus')
			.focus(function() {
				$(this).addClass('entered');
				if (!this.onblur) $(this).blur(function() { if (this.value == '') $(this).removeClass('entered') });
			});
	}

	var $fb = $('#cal .fb');
	$('#cal .fb-trigger').hover(
		function() { $fb.addClass('show') },
		function() {  }
	);
	$fb.hover(
		function() {  },
		function() { $fb.removeClass('show') }
	);

	var $srchModal = $('#srch');
	$srchModal.dialog({
		autoOpen    : false,
		width       : 858,
		modal       : true,
		draggable   : false,
		resizable   : false,
		open        : function() {
		                  $('.ui-widget-overlay').hide().fadeIn(ltIE9 ? 0 : 300, function() { $(this).click(function() { $srchModal.dialog('close') }) });
		                  $(this).closest('.ui-dialog').focus();
		              },
		beforeClose : function() {
		                  if (ltIE9) {
		                      return;
		                  }
		                  var overlayClone = $('.ui-widget-overlay').clone();
		                  $('.ui-widget-overlay').remove();
		                  overlayClone.appendTo('body').fadeOut(300, function() { $(this).remove() })
		              },
		show        : { effect: 'fade', duration: (ltIE9 ? 0 : 300) },
		hide        : { effect: 'fade', duration: (ltIE9 ? 0 : 300) }
	});
	$('#srch-trigger a').click(function() { $srchModal.dialog('open') });
	var $langModal = $('#language');
	$langModal.dialog({
		autoOpen    : false,
		width       : 858,
		modal       : true,
		draggable   : false,
		resizable   : false,
		open        : function() {
		                  $('.ui-widget-overlay').hide().fadeIn(ltIE9 ? 0 : 300, function() { $(this).click(function() { $langModal.dialog('close') }) });
		                  $(this).closest('.ui-dialog').focus();
		              },
		beforeClose : function() {
		                  if (ltIE9) {
		                      return;
		                  }
		                  var overlayClone = $('.ui-widget-overlay').clone();
		                  $('.ui-widget-overlay').remove();
		                  overlayClone.appendTo('body').fadeOut(300, function() { $(this).remove() })
		              },
		show        : { effect: 'fade', duration: (ltIE9 ? 0 : 300) },
		hide        : { effect: 'fade', duration: (ltIE9 ? 0 : 300) }
	});
	$('#language-trigger').click(function() { $langModal.dialog('open') });
	$('a.ui-dialog-titlebar-close').removeAttr('href').attr('tabindex', 0);

	$('a[href^="#"]:not(.ui-tabs-anchor)').each(function() {
		var href = $(this).attr('href');
		if (href == '#') {
			$('body:not([tabindex])').attr('tabindex', -1).css('outline', 'none');
		}
		else if ($(href).length) {
			$(href).attr('tabindex', -1).css('outline', 'none');
		}
		else {
			return;
		}
		$(this).bind('click.scrollPageTo', function() { scrollPageTo(href); return false });
	});

});



/*  Browser Sniffing
---------------------------------------------*/

if (window.attachEvent || /Trident.+rv:/.test(navigator.userAgent)) {
	var version = /(?:MSIE\s|rv:)(\d+)/.exec(navigator.userAgent)[1];
	jQuery('html').addClass('ie').addClass('ie' + version);
	switch (version) {
		case  '8': var isIE8  = true; break;
		case  '9': var isIE9  = true; break;
		case '10': var isIE10 = true; break;
		case '11': var isIE11 = true; break;
	}
	if (version < 9) {
		var ltIE9 = true;
	}
	else {
		jQuery('html').addClass('newer');
	}
}
else if (window.opera) {
	jQuery('html').addClass('opera older');
}
else if (window.mozInnerScreenX != null) {
	jQuery('html').addClass('moz');
}
else if (window.webkitConvertPointFromNodeToPage || window.webkitStorageInfo) {
	jQuery('html').addClass('webkit')
	              .addClass(navigator.userAgent.indexOf('CriOS') != -1 ? 'chrome' : navigator.userAgent.indexOf('OPR') != -1 ? 'opera newer' : /android|chrome|safari/i.exec(navigator.userAgent).toString().toLowerCase())
	              .addClass(/(ipod|iphone|ipad)/i.exec(navigator.platform) ? 'ios ' + RegExp.$1.toString().toLowerCase() : '');
}



/*  Functions
---------------------------------------------*/

String.prototype.toInt = function() {
	return parseInt(this, 10);
}

function scrollPageTo(href) {
	$('html:not(:animated), body:not(:animated)')
		.stop()
		.animate(
			{
				scrollTop: href == '#' ? 0 : $(href).offset().top
			},
			1000,
			'easeInOutCubic',
			function() {
				if (href == '#') {
					$('body').focus();
				}
				else {
					$(href).focus();
					window.location.hash = href;
				}
			}
		);
}

function freshThingsLoad(tabName) {
	$.ajax({
		url      : 'data/' + tabName + '/page1.html',
		cache    :  false,
		dataType : 'html',
		success  :  function(data) {
						var $itemContainer = $('#hot .items').infinitescroll('destroy').data('infinitescroll', null);
						$itemContainer
							.html(data)
							.infinitescroll(
								{
									navSelector  : '#' + tabName + '-pagenav', 
									nextSelector : '#' + tabName + '-pagenav',
									itemSelector : '.item',
									loading      :  { msgText: '<em>loading more articles...</em>', finishedMsg: 'No more article to load', img: 'images/ajax-loader.gif' }
								},
								function(newElements) {
									$(newElements).find('img.lazy').lazyload({
										threshold : 300
									});
									$(newElements).find('[data-like-num]:empty').each(function() {
										var $ele = $(this);
										$.getJSON($ele.attr('data-like-num'), function(data) {
											$ele.text(data.data[0].total_count);
										});
									});
								}
							)
							.find('img.lazy').lazyload({
								threshold : 300
							});
						$itemContainer.find('[data-like-num]:empty').each(function() {
							var $ele = $(this);
							$.getJSON($ele.attr('data-like-num'), function(data) {
								$ele.text(data.data[0].total_count);
							});
						});
		            }
	});
$('.pop').capty({
	opacity: .6,
	height: 50
});
}

function changeFontSize() {
	switch (currFontSize) {
		case '1.0em': var newFontSize = '1.3em'; break;
		case '1.3em': var newFontSize = '1.0em'; break;
	}
	currFontSize = newFontSize;
	document.cookie = 'localNTDTVFontSize=' + currFontSize + '; expires=Thu, 02 Jan 2031 00:00:01 UTC;';
	$fontSizeCSS.html('#article { font-size: ' + newFontSize + ' }');
}




/*  misc
---------------------------------------------*/

if (document.cookie.match('localNTDTVFontSize')) {
	var currFontSize = document.cookie.match(/localNTDTVFontSize=([^;]+)/)[1];
}
else {
	var currFontSize = '1.3em';
	document.cookie = 'localNTDTVFontSize=' + currFontSize + '; expires=Thu, 02 Jan 2031 00:00:01 UTC;';
}
var $fontSizeCSS  = jQuery('<style>#article { font-size: ' + currFontSize + ' }</style>').appendTo('head');