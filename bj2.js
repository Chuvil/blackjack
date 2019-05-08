$(document).ready(function () {
    function Card(name, suit, value) {
        this.name=name;
        this.suit=suit;
        this.value=value;
    }
    var deck=new Array(
        new Card("Ace", "Clubs", 11),
        new Card("Eight", "Clubs", 8),
        new Card("Five", "Clubs", 5),
        new Card("Four", "Clubs", 4),
        new Card("Jack", "Clubs", 10),
        new Card("King", "Clubs", 10),
        new Card("Nine", "Clubs", 9),
        new Card("Queen", "Clubs", 10),
        new Card("Seven", "Clubs", 7),
        new Card("Six", "Clubs", 6),
        new Card("Ten", "Clubs", 10),
        new Card("Three", "Clubs", 3),
        new Card("Two", "Clubs", 2),
        new Card("Ace", "Diamonds", 11),
        new Card("Eight", "Diamonds", 8),
        new Card("Five", "Diamonds", 5),
        new Card("Four", "Diamonds", 4),
        new Card("Jack", "Diamonds", 10),
        new Card("King", "Diamonds", 10),
        new Card("Nine", "Diamonds", 9),
        new Card("Queen", "Diamonds", 10),
        new Card("Seven", "Diamonds", 7),
        new Card("Six", "Diamonds", 6),
        new Card("Ten", "Diamonds", 10),
        new Card("Three", "Diamonds", 3),
        new Card("Two", "Diamonds", 2),
        new Card("Ace", "Hearts", 11),
        new Card("Eight", "Hearts", 8),
        new Card("Five", "Hearts", 5),
        new Card("Four", "Hearts", 4),
        new Card("Jack", "Hearts", 10),
        new Card("King", "Hearts", 10),
        new Card("Nine", "Hearts", 9),
        new Card("Queen", "Hearts", 10),
        new Card("Seven", "Hearts", 7),
        new Card("Six", "Hearts", 6),
        new Card("Ten", "Hearts", 10),
        new Card("Three", "Hearts", 3),
        new Card("Two", "Hearts", 2),
        new Card("Ace", "Spades", 11),
        new Card("Eight", "Spades", 8),
        new Card("Five", "Spades", 5),
        new Card("Four", "Spades", 4),
        new Card("Jack", "Spades", 10),
        new Card("King", "Spades", 10),
        new Card("Nine", "Spades", 9),
        new Card("Queen", "Spades", 10),
        new Card("Seven", "Spades", 7),
        new Card("Six", "Spades", 6),
        new Card("Ten", "Spades", 10),
        new Card("Three", "Spades", 3),
        new Card("Two", "Spades", 2)
    );
    var usedCards=new Array();
    for(var x=0; x<52; x++){
        init();
    }
    function init() {
        var goodCard=false;
        do {
            //var number = rand(52);
            var number=rand(52);
            if($.inArray(number, usedCards)==-1){
                usedCards[usedCards.length]=number;
                goodCard=true;
            }
        }while (!goodCard);
        goodCard=false;
    }
    /*alert(usedCards.length);
    for(var i=0; i<usedCards.length; i++){
        document.write(usedCards[i]+"<br>");
    }*/
    show();
    function show() {
        for(var i=0; i<deck.length; i++) {
            //alert(usedCards[i]);
            $("<img>").appendTo("#52").attr("src", "images/hit_small.jpg").addClass("pic90").attr("id", usedCards[i]);
        }
    }
    $("img").click(function () {
        var id=$(this).attr("id");
        //alert("test"+id);
        var c=deck[id];
        Hand.cards[Hand.cards.length]=c;
        $(this).attr("src", "images/"+c.suit+"/"+c.name+".jpg").removeClass("pic90");
        Hand.summCardTotal();
    });
    function rand(num) {
        return Math.floor(Math.random()*num);
    }
    var Hand={
        cards:new Array(),
        currentTotal: 0,
        summCardTotal:function () {
            //alert("test");
            this.currentTotal=0;
            for(var i=0; i<this.cards.length; i++){
                var c=this.cards[i];
                this.currentTotal+=c.value;
            }
            $("#hdrTotal").html("Общая сумма карт: "+this.currentTotal);
            if(this.currentTotal>21){
                $("#hdrResult").html("Я проиграл");
                $("img").unbind("click");
                $("#refresh").show();
            }else if(this.currentTotal==21){
                $("#hdrResult").html("Блекджек");
                $("img").unbind("click");
                $("#refresh").show();
            }else if(this.currentTotal<21&&this.cards.length==5){
                $("#hdrResult").html("Супер Блекджек - 5 карт");
                $("img").unbind("click");
                $("#refresh").show();
            }
        }
    };
    $("#refresh").click(function () {
        window.location.reload();
    });

});
