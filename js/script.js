// リロードすると消去される
//localStorage.clear();
// データ確認用
const storage = localStorage.getItem('key');
console.log(JSON.parse(storage));

const justNow = Date.now();

const type = (event) =>{
    //console.log(event);
    const key = event.key;
    const now = Date.now();
    //console.log(now);

    const storage = localStorage.getItem('key');
    const storageObject = JSON.parse(storage);
    console.log(storageObject);

    if (key.match(/[a-z]/i) && key.length === 1 || key.match(/[0-9]/)) {
        if (storageObject && storageObject.length > 0) {

            const length = storageObject.length;
            const time = now - (storageObject[length - 1].now);
            //console.log(time);

            storageObject.push({
                now,
                key,
                time
            });
            localStorage.setItem('key', JSON.stringify(storageObject));
        } else {

            const time = now - justNow;

            let data = {
                items : [{
                    now,
                    key,
                    time
                }]
            };
            localStorage.setItem('key', JSON.stringify(data.items));
        }
    } else if (storageObject.length && key ==='Backspace') {
        storageObject.length = storageObject.length - 1;
        console.log(storageObject);
        console.log(storageObject.length);
        localStorage.setItem('key', JSON.stringify(storageObject));
    }
};

const textarea = document.getElementById('textarea');
textarea.addEventListener('focus', () => {
    document.addEventListener('keydown', type);
    console.log('くっついた');
});

textarea.addEventListener('blur', () => {
    document.removeEventListener('keydown', type);
    console.log('離れた');
    location.reload();
});



// formのコード
/*
const onButtonClick = () => {
    target = document.getElementById("output");
    target.innerText = document.forms.id_form.textarea.value;
};
*/

// p5.js

function setup() {
    
    const data = JSON.parse(localStorage.getItem('key'));
    
    createCanvas(710, 400);
    background(160);

    if(data) {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            fill(255, 255, 255, Math.max(100, data[i].time));
            textSize(20);
            //textSize(Math.min(100, data[i].time/10));
            text(`${data[i].key}`, 10 + i*30, 30);
        }
    }
    
    
}

const dataClear = () => {
    console.log('押した');
    localStorage.clear();
    location.reload();
};

