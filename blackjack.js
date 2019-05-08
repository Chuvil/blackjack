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
    var usedCards=new Array(); // Создаём массив для использованных карт.
    function deal() {
        for(var i=0; i<2; i++){
            hit();
        }
    }
    function rand(num) {
        return Math.floor(Math.random()*num)
    }
    // Создаём объект рука игрока с картами на руках
    var Hand={
        cards:new Array(),
        currentTotal:0,
        summCardTotal:function () {
            this.currentTotal=0;
            for(var i=0; i<this.cards.length; i++){
                var c=this.cards[i];
                this.currentTotal+=c.value;
            }
            $("#hdrTotal").html("Общая сумма карт: "+this.currentTotal);
            // Проверяем условия игры
            if(this.currentTotal>21){
                $("#btnStick").trigger("click");
                $("#hdrResult").html("Я проиграл");
                $("#btnHit").toggle();
                $("#btnStick").toggle();
                $("#btnRestart").toggle();
                picture(2);
            }else if(this.currentTotal==21){
                $("#btnStick").trigger("click");
                $("#hdrResult").html("Ура. Блекджек!");
                $("#btnHit").toggle();
                $("#btnStick").toggle();
                $("#btnRestart").toggle();
                picture(1);
            }else if(this.currentTotal<21&&this.cards.length==5){
                $("#btnStick").trigger("click");
                $("#hdrResult").html("Супер Блекджек - 5 карт");
                $("#btnHit").toggle();
                $("#btnStick").toggle();
                $("#btnRestart").toggle();
                picture(1);
            }
        }
    };
    //Создаём функцию раздачи одной карты
    function hit() {
        // Создаём переменную для определения подходящей(ещё не использованной) карты.
        var goodCard=false;
        do{
            var index=rand(52); // Создаём индекс, то есть номер карты в колоде, которую достаём из неё.
            if(!$.inArray(index, usedCards)>-1){// Функция ИнАррай проверяет находится ли значение в массиве. Если нет, возвращает -1. Функция имеет параметры: 1) Значение 2)Массив.
                goodCard=true;
                var c=deck[index];// Получаем объект Карты.
                usedCards[usedCards.length]=index;// Добавляем в массив использованных карт индекс карты вытащенной с колоды.
                Hand.cards[Hand.cards.length]=c; // Передаём карту в руку.
                var $d=$("<div>"); // Создаём тег Див как объект.
                $d.addClass("currentHand").appendTo("#myHand"); // Метод ЭддКласс добавляет класс. Метод АппендТу элементу, айди которого получает в виде параметра будет добавлен Див, который находится в переменной $d.
                $("<img>").appendTo($d).attr("src", "images/"+c.suit+"/"+c.name+".jpg").fadeOut("slow").fadeIn("slow");
            }
        }while (!goodCard);
        goodCard=false;
        Hand.summCardTotal();
    }
    $("#btnDeal").click(function () {
        deal();
        $("#btnHit").toggle();
        $(this).toggle();
        $("#btnStick").toggle();
    });
    $("#btnHit").click(function () {
        hit();
    });
    $("#btnStick").click(function () {
        $("#hdrResult").html("Пропустить");
    });
    $("#btnRestart").click(function () {
        //$("#btnResult").trigger("click");
            $(this).toggle();
            //$("#hdrResult").toggle();
            $("#myHand").empty();
            $("#hdrResult").html("");
            usedCards.length=0;
            Hand.currentTotal=0;
            Hand.cards.length=0;
            $("#btnDeal").toggle().trigger("click");
            picture(3);
    });
    function picture(status) {
        if(status==1){
            $("<img>").appendTo("#picture").attr("src", "images/check.png").show(500);
        }else if(status==2){
            $("<img>").appendTo("#picture").attr("src", "images/x2.png").show(500);
        }else if(status==3){
            $("#picture").empty();
        }
    }
});
