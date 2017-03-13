
function loopThunder(){
    setTimeout(function(){
        thunder();
        loopThunder();
    }, Math.round(Math.random() * 4000 ) + 7000);
}
function loopGrid(){
    setTimeout(function () {
        setGrid();
        // console.log("Setting grid");
        // loopGrid();
        // randomColor(0,0);
        // loopGrid();
    }, 10);
}
function setLight(x, y, r, g, b, transitionTime){
    global.grid.setState(x,y,true);
    // global.grid.setColorRGB(x,y,(Math.random() * 255),(Math.random() * 255), (Math.random() * 255));
    global.grid.setColorRGB(x,y, r, g, b);
    global.grid.saveWithTransitionTime(x,y,transitionTime);
}

function thunder(){
    var x = Math.round(Math.random() * 2);
    var y = Math.round(Math.random() * 4 ) +1;
    // global.grid.setColorRGB(x,y,(),(Math.random() * 255), (Math.random() * 255));
    //TODO: Get current state
    //TODO: Set current state to yellow, full brightness
    //TODO: Reset old state and reapply
    var times = Math.round(Math.random() * 6);
    for(var i = 0; i <= times; i++){
        global.grid.setColorRGB(x,y, 255, 255, 0);
        global.grid.setBrightness(x, y, 255);
        global.grid.saveInstant(x, y);
        setTimeout(function () {}, 300);
        global.grid.setColorRGB(x, y, 32, 32, 32);
        global.grid.setBrightness(x, y, 70);
        global.grid.saveInstant(x, y);
        setTimeout(function () {}, 400);
    }
}