let devhk = {
    windowResize : ()=>{
        screen_reso = 0.10;
        window_height = Number($('#full-area').innerHeight())
        window_width = Number($('#full-area').innerWidth())
        game_height = Number($('#game-area').innerHeight())
        game_width = Number($('#game-area').innerWidth())
        diff1 = window_width - window_width*screen_reso;
        diff2 = window_height - window_height*screen_reso;
        scale1 = diff1 / game_width
        scale2 = diff2 / game_height
        scale1 < scale2 ? $("#game-area").css({"transform":"translate(-50%,-50%) scale("+scale1+")"}) : $("#game-area").css({"transform":"translate(-50%,-50%) scale("+scale2+")"})
    },
}
devhk.windowResize()
$(window).on('resize',()=>{
   devhk.windowResize()
})