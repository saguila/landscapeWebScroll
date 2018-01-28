var backgroundWidth;
var backgroundHeight;
var currentBackgroundWidth;
var windowWidth;
var windowHeight;

$(document).ready(function(){
    windowHeight = parseInt($(document).height());
    windowWidth = parseInt($(document).width());
    var urlImage = $('html').css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');
    var backgroundImg = new Image();
    backgroundImg.src = urlImage;
    backgroundImg.onload = function(ev){
        // Funcion callback para que se ejecute las operaciones cuando de verdad tengamos la imagen.
        backgroundWidth = parseInt(backgroundImg.width);
        backgroundHeight = parseInt(backgroundImg.height);
        backgroundWidth = windowHeight * (backgroundWidth/backgroundHeight);
        currentBackgroundWidth = backgroundWidth;
    };
});

/* Si la ventana cambia de tamaño hay que volver a recalcular para que el scroll del background funcione*/
$(window).resize(function() {
    windowWidth = parseInt($(document).width());
    windowHeight = parseInt($(document).height());
    currentBackgroundWidth = windowHeight * (backgroundWidth/backgroundHeight);
    console.log("Resizing: widowWidt " + windowWidth + " , windowHeight" + windowHeight + " , currentWidth " + currentWidth);
});

$(document).on("mousemove",function(event){
    if(currentWidth > windowWidth) {
        var valorCursorBackground = event.pageX * currentWidth / windowWidth;
        var f = windowWidth * valorCursorBackground / currentWidth - valorCursorBackground;
        $("html").css("background-position", "" + f + "px 0px");
    }
    else{
        $("html").css("background-position", "center center");
    }
});