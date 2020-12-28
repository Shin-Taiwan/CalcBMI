'use strict';

//init
createRecordList();

//DOM
var calc = document.querySelector('.calcResult');


//Listener
calc.addEventListener("click",controller,false);

//controller
function controller(){
    let height = document.querySelector('input[name="height"]').value;
    let weight = document.querySelector('input[name="weight"]').value;
    if ( height<=0 || weight<=0){
        window.alert('請輸入0以上的數字')
        return;
    }
    updateBotton(height,weight);
    setJsonToLocalStorage(height,weight);
    createRecordList();
    reloadBotton();
}

//計算BMI 
function calcBMI(height,weight){
    let result= weight/((height/100)*(height/100));
    //取到小数第二位
    let BMI = Math.floor(result*100)/100;
    console.log(BMI);
    return BMI;
}

//計算體位
function calcJudgment(BMI){
    let judgment = "";
    if(BMI < 18.5){
        judgment = "過輕"; 
    }else if (BMI<25){
        judgment = "理想";
    }else if (BMI<30){
        judgment = "過重";
    }else if (BMI<35){
        judgment = "輕度肥胖";
    }else if (BMI<40){
        judgment = "中度肥胖";
    }else{
        judgment = "重度肥胖";
    }
    return judgment;
}

//計算體重對應的顏色
function calcColor(judgementResult){
    let color = "";
    switch(judgementResult){          
        case '過輕':
            color='green';
            break;

        case '理想':
            color='blue';
            break;

        case '過重':
            color='orange';
            break;

        case '輕度肥胖':
            color='darkorange';
            break;

        case '中度肥胖':
            color='darkorange';
            break;

        case '重度肥胖':
            color='red';
            break;
    }   
    return color;
}

//更新按鈕
function updateBotton(height,weight){
    let BMI = calcBMI(height,weight);
    let judgment = calcJudgment(BMI);
    let buttoncolor = calcColor(judgment);

    let str= `<div class="result button${buttoncolor}">
                <div class="button frame${buttoncolor}">
                    <p class="buttonBMI">${BMI}</p>
                    <p class="BMI">BMI</p>
                    <img class="img${buttoncolor}" src="./images/icons_loop.png">
                </div>
                <div class="buttonJudgment">${judgment}</div>
              </div>`
    document.querySelector('.resultwrapper').innerHTML=str;
}

//儲存Json到Local Storage
function setJsonToLocalStorage(height,weight){
    let data = JSON.parse(localStorage.getItem('BMIRecord')) || [];
    let json_dict = {};
    let BMI = calcBMI(height,weight)

    json_dict['BMI']= BMI;
    json_dict['judgment']=calcJudgment(BMI);
    json_dict['height']=height+"cm";
    json_dict['weight']=weight+"kg";
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    json_dict['date']=`${date}-${month + 1}-${year}`;

    
    data.push(json_dict)
    localStorage.setItem('BMIRecord',JSON.stringify(data));
}

//更新BMI紀錄
function createRecordList(){
    let data = JSON.parse(localStorage.getItem('BMIRecord')) || [];
    let str = '';
    let color = '';
    for(let item of data){
        color = calcColor(item['judgment']);

        str += `<div class="item ${color}"><div>${item['judgment']}</div><div><span class="tag">BMI</span>${item['BMI']}</div><div><span class="tag">weight </span>${item['weight']}</div><div><span class="tag">height</span>${item['height']}</div><div><span class="tag">${item['date']}</span></div></div>`;
    }
    document.querySelector('.record').innerHTML=str;
}

//重新載入按鈕
function reloadBotton(){
    document.querySelector('.button img').addEventListener('click',function(){
        document.location.reload();      
    },false);   
}