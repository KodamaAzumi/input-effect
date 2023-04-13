// リロードすると消去される
//localStorage.clear();
// データ確認用
const storage = localStorage.getItem('key');
console.log(JSON.parse(storage));

// ページを開いた時刻を取得
const justNow = Date.now();

// タイプされた文字をstorageに保存する
const type = (event) =>{
    const key = event.key;
    // タイプされた時間を取得
    const now = Date.now();

    const storage = localStorage.getItem('key');
    const storageObject = JSON.parse(storage);
    console.log(storageObject);

    if (key.match(/[a-z]/i) && key.length === 1 || key.match(/[0-9]/) || key === " " || key === "." || key === "'" || key === "Enter") {
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
    } else if (storageObject && storageObject.length && key ==='Backspace') {
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
    
    const p5Canvas = createCanvas(500, 500);
    p5Canvas.parent('p5Canvas');

      // キャンバスを保存する
      const saveButton = document.getElementById('canvasSave');
      saveButton.addEventListener('click', () => {
        saveCanvas(p5Canvas, `Diary${year()}${month()}${day()}${hour()}${second()}${minute()}`, 'jpg');
      });  
}

function draw() {

    background(160);

    const data = JSON.parse(localStorage.getItem('key'));
    
    if(data) {
    // 文字の初期値
    let x = 10;
    let y = 30;

        for (let i = 0; i < data.length; i++) {

            // Enterキーが押されたら改行する。
            if (data[i].key === 'Enter') {
                x = 10;
                y += 35;
            } else {
                fill(255, 255, 255, Math.max(100, data[i].time));
                textSize(20);
                text(`${data[i].key}`, x, y);
                textAlign(LEFT, LEFT);
                // テキストの幅がcanvasの幅を超えた場合、y座標を下げる
                if (x + textWidth(data[i].key) + 20 > width - 15) {
                x = 10;
                y += 35;
                } else {
                x += textWidth(data[i].key) + 15;
                }
            }
        }
    }  
}

const dataClear = () => {
    console.log('押した');
    localStorage.clear();
    location.reload();
};

