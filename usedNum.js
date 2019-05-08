$(document).ready(function () {
    var usedCard=new Array();
    function rand(num) {
        return Math.floor(Math.random()*num);
    }
    function init() {
        var goodNum=false;
        do{
            var number=rand(52);
            if($.inArray(number, usedCard)==-1){
                usedCard[usedCard.length]=number;
                goodNum=true;
            }
        }while (!goodNum);
        goodNum=false;
    }
    for(var x=0; x<52; x++){
        init();
    }
    for(var i=0; i<usedCard.length; i++){
        document.write(usedCard[i]+"<br>");
    }
    alert(usedCard.length);
});