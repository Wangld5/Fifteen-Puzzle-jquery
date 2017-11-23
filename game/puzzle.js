$(document).ready(function(){
    var flag = 0;
    change_number = 0;
    time = 0;
    step = 0;
    function _time(){
        time++;
        $("#Time").val(time);
        clock = setTimeout(_time,1000);
    }
    function picture_move(event){
        var blank = document.getElementById("_picture_16");
        var blank_left = blank.offsetLeft;
        var blank_top = blank.offsetTop;
        var left = this.offsetLeft;
        var top = this.offsetTop;
        if(flag==1){
            if((Math.abs(blank_left-left)==85 && blank_top==top) || (Math.abs(blank_top-top)==85 && blank_left==left)){
                var str = blank.className;
                blank.className = this.className;
                this.className = str;
                if_complete();
            } 
        }
    }
    function if_complete(){
        for(var i=1; i<=16; i++){
            if($("#_picture_"+i).attr("class")!="picture_part"+ change_number +" picture_"+i){
                $("#result").text("Continuing...");
                $("#step").val(++step);
                return;
            }
        }
        $("#result").text("You win!");
        clearInterval(clock);
        time = 0;
        $("#Time").val(time);
    }
    function check(){
        var count = 0;
        for(var i=0; i<16; i++){
            for(var j=i+1; j<16; j++){
                if(random_arr[i]>random_arr[j]){
                    count++;
                }
            }
        }
        return count%2 == 0;
    }
    $("#start").click(function(){
        flag = 1;
        _time();
        $("#result").text("Continuing...");
        for (var k = 1; k <= 16; k++) {
            $("#_picture_"+k).removeClass().addClass("picture_part"+change_number+" picture_"+k);
        }
        random_arr = [];
        for (var j = 0; j < 15; j++) {
            random_arr[j] = j+1;
        }
        function cmp() { return 0.5-Math.random(); }
        while(1) {
            random_arr.sort(cmp);
            if (check()) {
                break;
            }
        }
        for (var i = 1; i <= 15; i++) {
            $("#_picture_"+i).removeClass().addClass("picture_part"+change_number+" picture_"+random_arr[i-1]);
        }
        $("#Time").val(time);
    });
    $("#change").click(function(){
        change_number++;
        change_number%=3;
        for(var i=1; i<=16; i++){
            $("#_picture_"+i).removeClass().addClass("picture_part"+ change_number +" picture_"+i);
        }
        $("#result").text("");
        $("#recovery").removeClass().addClass("recovery"+change_number);
        clearInterval(clock);
        time = 0;
        $("#Time").val(time);
        step = 0;
        $("#step").val(step);
    });
    for(var i=1; i<=16; i++){
        var part = document.createElement("div");
        part.className = "picture_part0"+" picture_"+i;
        part.id = "_picture_"+i;
        part.addEventListener("click",picture_move);
        $("#picture").append($(part));
    }
    $("#recovery").removeClass().addClass("recovery0");
    $("#Time").val(time);
    $("#step").val(step);
});