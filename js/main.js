/**
 * Created by ivan on 10.03.16.
 */
var maxVal =100;

var test_results ={};
test_results.name='';
test_results.date='';
test_results.operators=[];
test_results.qrightAns =0;
test_results.qwrongAns =0;
test_results.question={};

test_results.write_answer=function(quest,result){
        this.question[quest]=result;
        //this.question.answ.eval()

};

test_results.generate_question=function(){
  //get Math operator for example
   var rand_index=Math.floor(Math.random()*(this.operators.length));
   var operator=this.operators[rand_index];
    var firstArg=0;
    var secondArg=0;
    switch (operator){
        case '+':
            //generate first argument
             firstArg = Math.floor(Math.random()*(maxVal-1))+1;
            //generate second argument
             secondArg = Math.floor(Math.random()*(100-firstArg))+1;
            break;

        case '-':
            //generate first argument
             firstArg = Math.floor(Math.random()*(maxVal-1))+1;
            //generate second argument
             secondArg = Math.floor(Math.random()*(firstArg-1))+1;
            break;
        case '*':
            //generate first argument

           firstArg = Math.floor(Math.random()*(maxVal/2))+1;   // lets ignore option with 100*1

                //generate second argument
            secondArg = Math.floor(Math.random()*(Math.floor(100/firstArg)))+1;
            break;
        case '/':
        //generate first argument
            do
                firstArg = Math.floor(Math.random()*(maxVal-1))+1;

            while (PrimeNumb(firstArg));       // we don't want example like   x/x =1

        //generate second argument
            do
                secondArg = Math.floor(Math.random()*(maxVal+1))+2;
            while(!(firstArg%secondArg==0&&firstArg!=secondArg));
    }
   var question_str =firstArg+operator+secondArg;


    return question_str;
};
test_results.new_start= function(){};



/*
   helpful functions block
 */

function PrimeNumb(numb){
    for (var i=2;i<numb;i++)
    {
         if (numb%i==0){return false;}
    }
    return true;
}
//check that input is natural number
function checkNatural(elem){
    return Math.round(elem.value) == elem.value
}

function generateExample(){
    var example= test_results.generate_question();
    $('.example span').text(example);
    $('.I_answer').val('');

}
/*
        Events handler
 */

// start test button pressed

$('.enter').click(function(){
    // write info about test student
    test_results.name=$('#user_name').val() ;
    var CurrDate = new Date();
    test_results.date = CurrDate.getDate()+'/'+(CurrDate.getMonth()+1)+'/'+CurrDate.getFullYear();

    $('.test').css('display','block');
    $('.greating').css('display','none');
});


$('#setOperators').click(function(){
    test_results.operators =[];
    $.each($("#preset input[type='checkbox']"),function(key, value){
    if (value.checked)
        test_results.operators.push(value.value)

    });
    generateExample()

    $('.nav-tabs a[href="#check"]').tab('show');


    return false;

});



$('.I_answer').change(function () {

    if(!checkNatural(this)){

        alert('please fill the result correct!')

    }

});


$('.B_answer').click(function () {

            if (eval( $('.example span').text())== $('.I_answer').val()){
                test_results.qrightAns++;

                $('.rightAns').text(test_results.qrightAns);

            }
            else {
                test_results.qwrongAns ++;
                $('.wrongAns').text(test_results.qwrongAns);
                //write wrong answer
                test_results.write_answer($('.example span').text(),$('.I_answer').val());
            }
            setTimeout(function(){
                generateExample();

            },500)

});