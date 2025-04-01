try {
    var daysEl;
    var hoursEl;
    var minutesEl;
    var secondsEl;
    var currentDate;
    var doMainContent = false;
    const targetDate = new Date(2025, 3, 1, 10, 0, 0); // April 1, 2025, 10:00 AM
// Once the page is fully loaded, run init
window.onload = init;
function init() {
    daysEl = document.getElementById('days');
    hoursEl = document.getElementById('hours');
    minutesEl = document.getElementById('minutes');
    secondsEl = document.getElementById('seconds');

    $("#main-content").hide();
    $("#password-content").hide();
    // Verify if the countdown should be displayed
    updateCountdown();
    // if no, hide the countdown and show the main content
    /*if(doMainContent) {
        new StickyNavigation();
        showMainContent();
        
    }*/
}

function updateCountdown() {
    const currentDate = new Date();
    const totalSeconds = (targetDate - currentDate) / 1000;
    if (totalSeconds <= 0) {
        // Countdown finished
        daysEl.innerHTML = '0';
        hoursEl.innerHTML = '0';
        minutesEl.innerHTML = '0';
        secondsEl.innerHTML = '0';
        doMainContent = true;
        return;
    }
    
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;
    
    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);

    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
function showMainContent() {
    $("#countdown-content").hide();
    $("#main-content").show();
    document.title = "Only UwUbens";
}

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
        console.log("onScroll");
		this.checkTabContainerPosition();
        this.findCurrentTabSelector();
	}
	
	onResize() {
        console.log("onResize");
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
        console.log("setSliderCss");
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

} catch(e) {
    console.log(e);
}

