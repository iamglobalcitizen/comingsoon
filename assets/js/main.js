/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/bg01.jpg': 'center',
							'images/bg02.jpg': 'center',
							'images/bg03.jpg': 'center'
						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

	// Signup Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#signup-form')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// Events.
			// Note: If you're *not* using AJAX, get rid of this event listener.
				$form.addEventListener('submit', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Hide message.
						$message._hide();

					// Disable submit.
						$submit.disabled = true;

					// Process form.
					// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
					// but there's enough here to piece together a working AJAX submission call that does.
						window.setTimeout(function() {

							// Reset form.
								$form.reset();

							// Enable submit.
								$submit.disabled = false;

							// Show message.
								$message._show('success', 'Thank you!');
								//$message._show('failure', 'Something went wrong. Please try again.');

						}, 750);

				});

		})();

})();

// Create Countdown
var Countdown = {
  
	// Backbone-like structure
	$el: $('.countdown'),
	
	// Params
	countdown_interval: null,
	total_seconds     : 0,
	
	// Initialize the countdown  
	init: function() {
	  
	  // DOM
		  this.$ = {
		  hours  : this.$el.find('.bloc-time.hours .figure'),
		  minutes: this.$el.find('.bloc-time.min .figure'),
		  seconds: this.$el.find('.bloc-time.sec .figure')
		 };
  
	  // Init countdown values
	  this.values = {
			hours  : this.$.hours.parent().attr('data-init-value'),
		  minutes: this.$.minutes.parent().attr('data-init-value'),
		  seconds: this.$.seconds.parent().attr('data-init-value'),
	  };
	  
	  // Initialize total seconds
	  this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;
  
	  // Animate countdown to the end 
	  this.count();    
	},
	
	count: function() {
	  
	  var that    = this,
		  $hour_1 = this.$.hours.eq(0),
		  $hour_2 = this.$.hours.eq(1),
		  $min_1  = this.$.minutes.eq(0),
		  $min_2  = this.$.minutes.eq(1),
		  $sec_1  = this.$.seconds.eq(0),
		  $sec_2  = this.$.seconds.eq(1);
	  
		  this.countdown_interval = setInterval(function() {
  
		  if(that.total_seconds > 0) {
  
			  --that.values.seconds;              
  
			  if(that.values.minutes >= 0 && that.values.seconds < 0) {
  
				  that.values.seconds = 59;
				  --that.values.minutes;
			  }
  
			  if(that.values.hours >= 0 && that.values.minutes < 0) {
  
				  that.values.minutes = 59;
				  --that.values.hours;
			  }
  
			  // Update DOM values
			  // Hours
			  that.checkHour(that.values.hours, $hour_1, $hour_2);
  
			  // Minutes
			  that.checkHour(that.values.minutes, $min_1, $min_2);
  
			  // Seconds
			  that.checkHour(that.values.seconds, $sec_1, $sec_2);
  
			  --that.total_seconds;
		  }
		  else {
			  clearInterval(that.countdown_interval);
		  }
	  }, 1000);    
	},
	
	animateFigure: function($el, value) {
	  
	   var that         = this,
			   $top         = $el.find('.top'),
		   $bottom      = $el.find('.bottom'),
		   $back_top    = $el.find('.top-back'),
		   $back_bottom = $el.find('.bottom-back');
  
	  // Before we begin, change the back value
	  $back_top.find('span').html(value);
  
	  // Also change the back bottom value
	  $back_bottom.find('span').html(value);
  
	  // Then animate
	  TweenMax.to($top, 0.8, {
		  rotationX           : '-180deg',
		  transformPerspective: 300,
			ease                : Quart.easeOut,
		  onComplete          : function() {
  
			  $top.html(value);
  
			  $bottom.html(value);
  
			  TweenMax.set($top, { rotationX: 0 });
		  }
	  });
  
	  TweenMax.to($back_top, 0.8, { 
		  rotationX           : 0,
		  transformPerspective: 300,
			ease                : Quart.easeOut, 
		  clearProps          : 'all' 
	  });    
	},
	
	checkHour: function(value, $el_1, $el_2) {
	  
	  var val_1       = value.toString().charAt(0),
		  val_2       = value.toString().charAt(1),
		  fig_1_value = $el_1.find('.top').html(),
		  fig_2_value = $el_2.find('.top').html();
  
	  if(value >= 10) {
  
		  // Animate only if the figure has changed
		  if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
		  if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
	  }
	  else {
  
		  // If we are under 10, replace first figure with 0
		  if(fig_1_value !== '0') this.animateFigure($el_1, 0);
		  if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
	  }    
	}
  };
  
  // Let's go !
  Countdown.init();