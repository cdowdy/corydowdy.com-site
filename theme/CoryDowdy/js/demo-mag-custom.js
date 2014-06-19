$(document).foundation('reflow');

$(document).ready(function () {
    $(".image-popup-vertical-fit").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-img-mobile",
        image: {
            verticalFit: true
        }
    });
    $(".image-popup-fit-width").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        image: {
            verticalFit: false
        }
    });
    $(".image-popup-no-margins").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: "mfp-no-margins mfp-with-zoom",
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });
    $(".popup-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (e) {
                return e.el.attr("title") + "<small>Images from Placehold.it"
            }
        }
    });
    $(".zoom-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: "mfp-with-zoom mfp-img-mobile",
        image: {
            verticalFit: true,
            titleSrc: function (e) {
                return e.el.attr("title") + ' &middot; <a class="image-source-link" href="' + e.el.attr("data-source") + '" target="_blank">image source</a>'
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function (e) {
                return e.find("img")
            }
        }
    });
    $(".popup-youtube, .popup-vimeo, .popup-gmaps, .popup-bingmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    $(".dialogPopup").magnificPopup({
        delegate: "a",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr("data-effect")
            }
        },
        midClick: true
    });
    $("img").VimeoThumb()
});
$(function () {
    $("#mag-modal").magnificPopup({
        type: "inline",
        preloader: false,
        modal: true
    });
    $(document).on("click", ".popup-modal-dismiss", function (e) {
        e.preventDefault();
        $.magnificPopup.close()
    })
})