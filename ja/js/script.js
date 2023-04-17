// リロードすると消去される
//localStorage.clear();
// データ確認用

const storage = localStorage.getItem('key');
console.log(JSON.parse(storage));

// ページを開いた時刻を取得
const justNow = Date.now();

// storage内のデータを消去する
const dataClear = () => {
    console.log('押した');
    localStorage.clear();
    location.reload();
};


// inputイベントを使用した場合
const textarea = document.getElementById('textarea');

const type = (event) =>{
    //const eventData = event.data;
    // textarea.value、event.data、event.target.value。
    const japaneseText = textarea.value;
    console.log(japaneseText);

    // タイプされた時の時間を取得
    const now = Date.now();

    // データをstorageから取り出す
    const storage = localStorage.getItem('key');
    const storageObject = JSON.parse(storage);

    // 条件式に当てはまる場合storageに保存する
    if (japaneseText.match(/[^\x00-\x7F]/)) {
        // storage内にデータがあるかどうか、初めて保存するか 
        if (storageObject && storageObject.length > 0) {

            const length = storageObject.length;
            const time = now - (storageObject[length - 1].now);

            storageObject.push({
                now,
                japaneseText,
                time
            });
            localStorage.setItem('key', JSON.stringify(storageObject));

        } else {
            const time = now - justNow;

            let data = {
                items : [{
                    now,
                    japaneseText,
                    time
                }]
            };
            localStorage.setItem('key', JSON.stringify(data.items));
        }
    } 
};

// inputイベント
textarea.addEventListener('input', type);

textarea.addEventListener('keydown', (event) => {
    const keyCode = event.code.replace('Key', '').toLowerCase();
    console.log(keyCode);

    // データをstorageから取り出す
    const storage = localStorage.getItem('key');
    const storageObject = JSON.parse(storage);

    // storageObjectがnullでなく、長さが1以上の場合の処理
    if (storageObject?.length > 0) {
        const lastLength = storageObject[storageObject.length - 1].japaneseText.length;
        if(keyCode === 'backspace' && lastLength === 1){
            /*
            storageObject.push({
                japaneseText : ''
            });
            localStorage.setItem('key', JSON.stringify(storageObject));
            */
            localStorage.clear();
        }   
    }
});

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

        /*
        for (let i = 0; i < data.length; i++) {

            // Enterキーが押されたら改行する。
            if (data[i].key === 'Enter') {
                x = 10;
                y += 35;
            } else {
                fill(255, 255, 255, Math.max(100, data[i].time));
                textSize(20);
                textFont('Yu Gothic');
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
        */
        fill(255, 255, 255);
        textSize(20);
        textFont('Yu Gothic');
        text(`${data[data.length - 1].japaneseText}`, x, y);
        textAlign(LEFT, LEFT);
    }  
}