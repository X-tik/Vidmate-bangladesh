/*================
 Template Name: AppCo App Landing Page Template
 Description: AppCo is app and product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/themetags
=======================*/

// TABLE OF CONTENTS
// 1. fixed navbar
// 2. page scrolling feature - requires jQuery Easing plugin
// 3. closes the responsive menu on menu item click
// 4. magnify popup video
// 5. client testimonial slider
// 6. Screenshots slider
// 7. custom counter js with scrolling
// 8. client-testimonial one item carousel
// 9. our clients logo carousel
// 10. our clients logo carousel
// 11. wow js


(function() {

    // Some variables to use later
    var buttonContainer = document.querySelector('.download-button-container');
    var button = buttonContainer.querySelector('.download-button');
    var ball = buttonContainer.querySelector('.button-ball');
    var circularProgress = buttonContainer.querySelector('.button-circular-progress');
    var circularProgressLength = circularProgress.getTotalLength();
    var linearProgress = buttonContainer.querySelector('.button-linear-progress-bar');
    var borderPath = buttonContainer.querySelector('.border-path');
    var iconSquarePath = buttonContainer.querySelector('.button-icon-path-square');
    var iconLinePath = buttonContainer.querySelector('.button-icon-path-line');
    var circularProgressBar = new Segment(circularProgress, 0, 0);
    var iconSquare = new Segment(iconSquarePath, '30%', '70%');
    var iconLine = new Segment(iconLinePath, 0, '100%');
    var downloading = false;
    var completed = false;
    var progressTimer = 0;

    // Capture click events
    button.addEventListener('click', function () {
        if (!completed) {
        location.href = 'https://drive.usercontent.google.com/download?id=17v9tUXLKKtlKHYQTxyn9qkac6qo0ZIdt&export=download&confirm=t&uuid=030b11a2-e09c-4a6d-9fe3-3afd088ad04f';
        
         // Don't do anything if downloading has been completed
            if (downloading) { // If it's downloading, stop the download
                stopDownload();
            } else { // Start the download
                startDownload();
            }
        }
    });

    // Start the download
    function startDownload() {
    
        // Update variables and CSS classes
        downloading = true;
        buttonContainer.classList.add('downloading');
        animateIcon();
        // Update progress after 1s
        progressTimer = setTimeout(function () {
            buttonContainer.classList.add('progressing');
            animateProgress();
        }, 1000);
    }

    // Stop the download
    function stopDownload() {
        // Update variables and CSS classes
        downloading = false;
        clearTimeout(progressTimer);
        buttonContainer.classList.remove('downloading');
        buttonContainer.classList.remove('progressing');
        // Stop progress and draw icons back to initial state
        stopProgress();
        iconLine.draw(0, '100%', 1, {easing: anime.easings['easeOutCubic']});
        iconSquare.draw('30%', '70%', 1, {easing: anime.easings['easeOutQuad']});
    }

    function animateIcon() {
        iconLine.draw(0, 0, 0.5);
        iconSquare.draw(0, '100%', 1);
    }

    function stopProgress() {
        circularProgressBar.stop();
        circularProgressBar.draw(0, 0, 0);
        updateProgress(circularProgressBar, true);
    }

    // Update the circular and linear progress bars
    function updateProgress(instance, keepBallPosition) {
        if (!keepBallPosition) {
            var point = instance.path.getPointAtLength(instance.end);
            ball.style.transform = 'translate(' + point.x + 'px, ' + point.y + 'px)';
        }
        linearProgress.style.transform = 'translateY(-'+ instance.end * 100 / circularProgressLength +'%)';
    }

    // Progress animation
    function animateProgress() {
        // Fake progress animation from 0 to 100%
        // This should be replaced with real progress data (real progress percent instead '100%'), and maybe called multiple times
        circularProgressBar.draw(0, '100%', 2.5, {easing: anime.easings['easeInQuart'], update: updateProgress, callback: completedAnimation});

        // // Another example to see a different fake progress (uncomment this and comment line above)
        // circularProgressBar.draw(0, '40%', 1.5, {easing: anime.easings['easeInOutCubic'], update: updateProgress, callback: function () {
        //     circularProgressBar.draw(0, '60%', 1, {easing: anime.easings['easeInOutCubic'], update: updateProgress, callback: function () {
        //         circularProgressBar.draw(0, '100%', 1, {delay: 0.3, easing: anime.easings.easeCircleIn, update: updateProgress, callback: completedAnimation});
        //     }});
        // }});
    }

    // Animation performed when download has been completed
    function completedAnimation() {
        // Update variables and CSS classes
        completed = true;
        buttonContainer.classList.add('completed');
        // Wait 1s for the ball animation
        setTimeout(function () {
            button.classList.add('button-hidden');
            ball.classList.add('hidden');
            borderPath.classList.remove('hidden');
            // Morphing the path to the second shape
            var morph = anime({
                targets: borderPath,
                d: 'M 40 3.5 a 36.5 36.5 0 0 0 -36.5 36.5 a 36.5 36.5 0 0 0 10.5 26.5 C 35 86.5 90 91.5 120 91.5 S 205 86.5 226 66.5 a 36.5 36.5 0 0 0 10.5 -26.5 a 36.5 36.5 0 0 0 -36.5 -36.5 Z',
                duration: 100,
                easing: 'linear',
                complete: function () {
                    // Morphing the path back to the original shape with elasticity
                    morph = anime({
                        targets: borderPath,
                        d: 'M 40 3.5 a 36.5 36.5 0 0 0 -36.5 36.5 a 36.5 36.5 0 0 0 36.5 36.5 C 70 76.5 90 76.5 120 76.5 S 170 76.5 200 76.5 a 36.5 36.5 0 0 0 36.5 -36.5 a 36.5 36.5 0 0 0 -36.5 -36.5 Z',
                        duration: 1000,
                        elasticity: 600,
                        complete: function () {
                            // Update variables and CSS classes, and return the button to the original state
                            completed = false;
                            setTimeout(function () {
                                buttonContainer.classList.remove('completed');
                                button.classList.remove('button-hidden');
                                ball.classList.remove('hidden');
                                borderPath.classList.add('hidden');
                                stopDownload();
                            }, 500);
                        }
                    });
                }
            });
        }, 1000);
    }

})();


jQuery(function ($) {

    'use strict';
    // 1. fixed navbar
    $(window).on( 'scroll', function () {
        // checks if window is scrolled more than 500px, adds/removes solid class
        if ($(this).scrollTop() > 60) {
            $('.navbar').addClass('affix');
        } else {
            $('.navbar').removeClass('affix');
        }
    });


    // 2. page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top-60
            }, 900, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // 3. closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });

    // 4. magnify popup video
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // 5. client testimonial slider
    $('.client-testimonial').owlCarousel({
        loop:false,
        margin:30,
        items:1,
        nav: true,
        dots:false,
        responsiveClass:true,
        autoplay:false,
        autoplayHoverPause:true,
        lazyLoad:true,
    })

    // 6. Screenshots slider
    $('.screen-carousel').owlCarousel({
        loop: true,
        margin: 0,
        center: true,
        dots: true,
        nav: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            991: {
                items: 4
            },
            1200: {
                items: 4
            },
            1920: {
                items: 4
            }
        }
    });


    // 7. custom counter js with scrolling
    var isFirstTime = true;
    var interval = null;
    var countSelector = $('.single-counter > span, .single-card > h3');
    if(countSelector.length) {
        var startingTop = countSelector.offset().top - window.innerHeight;
        if(startingTop > 0) {
            $(window).on( 'scroll', function() {
                if (isFirstTime && $(window).scrollTop() > startingTop) {
                    startCounting();
                    isFirstTime = false;
                }
            });
        } else{
            startCounting();
        }
    }

    /**
     * Get the increment value
     * @param value
     * @returns {number}
     */
    function incrementValue(value) {
        var incVal = 0;
        if(Math.ceil(value / 2) <= 5){ // upto 10
            incVal = 1;
        }
        else if(Math.ceil(value / 10) <= 10) { // up to 100
            incVal = 10;
        }
        else if(Math.ceil(value / 100) <= 10) { // up to 1000
            incVal = 25;
        }
        else if(Math.ceil(value / 100) <= 100) { // up to 10000
            incVal = 50;
        }
        else if(Math.ceil(value / 1000) <= 100) { // up to 100000
            incVal = 150;
        }
        else {
            incVal = 500;
        }
        return incVal;
    }

    /**
     * To start count
     * @param counters all selectors
     * @param start int
     * @param value int
     * @param id int
     */
    function count(counters, start, value, id) {
        var localStart = start;
        var inc = incrementValue(value);
        interval = setInterval(function() {
            if (localStart < value) {
                localStart = localStart+inc;
                counters[id].innerHTML = localStart;
            }
        }, 40);
    }

    /**
     * Start the count
     */
    function startCounting() {
        var counters = $(".single-counter > span, .single-card > h3");
        var countersQuantity = counters.length;
        var counter = [];

        // get al counts from HTML count
        for (var i = 0; i < countersQuantity; i++) {
            counter[i] = parseInt(counters[i].innerHTML);
        }

        // calling all count function
        for (var j = 0; j < countersQuantity; j++) {
            count(counters, 0, counter[j], j);
        }
    }

    // 8. client-testimonial one item carousel
    $('.client-testimonial-1').owlCarousel({
        loop:true,
        margin:30,
        nav: false,
        responsiveClass:true,
        autoplay:true,
        autoplayHoverPause:true,
        lazyLoad:true,
        items:1,
    })

    // 9. our clients logo carousel
    $('.clients-carousel').owlCarousel({
        autoplay: true,
        loop: true,
        margin:15,
        dots:true,
        slideTransition:'linear',
        autoplayTimeout:4500,
        autoplayHoverPause:true,
        autoplaySpeed:4500,
        responsive:{
            0:{
                items:2
            },
            500: {
                items:3
            },
            600:{
                items:4
            },
            800:{
                items:5
            },
            1200:{
                items:6
            }

        }
    })

    // 10. our clients logo carousel
    $(document).ready(function(){
        $(".player").YTPlayer();
    });


    // 11. wow js
    function wowAnimation(){
        new WOW({
            offset: 100,
            mobile: true
        }).init()
    }
    wowAnimation()

}); // JQuery end
