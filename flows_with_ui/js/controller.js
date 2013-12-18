$(function() {
    
    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $("#panel").draggable();

    $("button").button();

    $("#lorenzButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 1;
        lorenzInit();
        lorenzAnimate();
    });

    $("#rosslerButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 2;
        rosslerInit();
        rosslerAnimate();
    });

    $("#henonButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 3;
        henonInit();
        henonAnimate();
    });

    $("#chuaButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 4;
        chuaInit();
        chuaAnimate();
    });

    $("#vanButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 5;
        vanInit();
        vanAnimate();
    });

    $("#rabfabButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 6;
        rabfabInit();
        rabfabAnimate();
    });

    $("#tinkerbellButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 7;
        tinkerbellInit();
        tinkerbellAnimate();
    });

    $("#ikedaButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 8;
        ikedaInit();
        ikedaAnimate();
    });

    $("#raineyButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 9;
        raineyInit();
        raineyAnimate();
    });

    $("#fuButton").click(function() {
        execute = false;
        geometry.__webglVertexBuffer = null;
        geometry.__webglColorBuffer = null;
        renderer.clear();
        removeAll();
        execute = true;
        which = 10;
        fuInit();
        fuAnimate();
    });

});