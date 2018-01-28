var backgroundWidth;
var backgroundHeight;
var currentBackgroundWidth;
var windowWidth;
var windowHeight;
var infoOpened = false;
var infoRecentClosed=false;

$(document).ready(function () {
    windowHeight = parseInt($(document).height());
    windowWidth = parseInt($(document).width());
    var urlImage = $('html').css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');
    var backgroundImg = new Image();
    backgroundImg.src = urlImage;
    backgroundImg.onload = function (ev) {
        // Funcion callback para que se ejecute las operaciones cuando de verdad tengamos la imagen.
        backgroundWidth = parseInt(backgroundImg.width);
        backgroundHeight = parseInt(backgroundImg.height);
        currentBackgroundWidth = windowHeight * (backgroundWidth / backgroundHeight);
    };
});

$(window).on("click", function (ev) {
    if(!infoRecentClosed) {
        if (!infoOpened && ev.pageX >= 0.1 * windowWidth && ev.pageX < 0.9 * windowWidth) {
            var socialBar = document.getElementById("socialBar");
            var video = document.getElementById("mainVideo");
            if (video.hidden) {
                socialBar.setAttribute("hidden", "true");
                video.removeAttribute("hidden");
                video.play();
            }
            else {
                video.pause();
                video.setAttribute("hidden", "true");
                socialBar.removeAttribute("hidden");
            }
        }
    }
    else{
        infoRecentClosed = false;
    }
});

/* Si la ventana cambia de tamaño hay que volver a recalcular para que el scroll del background funcione */
$(window).resize(function () {
    windowWidth = parseInt($(document).width());
    windowHeight = parseInt($(document).height());
    currentBackgroundWidth = windowHeight * (backgroundWidth / backgroundHeight);
    if (currentBackgroundWidth <= windowWidth) {
        $("html").css("background-position", "center center");
    }
});

$(document).on("mousemove", function (event) {
    if (currentBackgroundWidth > windowWidth) {
        var valorCursorBackground = event.pageX * currentBackgroundWidth / windowWidth;
        var f = windowWidth * valorCursorBackground / currentBackgroundWidth - valorCursorBackground;
        $("html").css("background-position", "" + f + "px 0px");
    }
});

function openFacebookProfiles() {
    window.open('https://www.facebook.com/');
}

$(document).on("hide.bs.modal","#modal", function () {
    infoOpened = false;
    infoRecentClosed = true;
});

function openReadMorePage() {
    infoOpened = true;
    $("#modal").modal("show");
}