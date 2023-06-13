// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyEn');
console.log(JSON.parse(storage) || []);

// storage内のデータを消去する
const dataClear = () => {
    localStorage.removeItem('keyEn');
    location.reload();
};


// ページを開いた時刻を取得
const justNow = Date.now();

// タイプされた文字をstorageに保存する
const type = (event) =>{
    const key = event.key;
    console.log(key);

    // タイプされた時の時間を取得
    const now = Date.now();

    // // データをstorageから取り出す
    const storage = localStorage.getItem('keyEn');
    const storageObject = JSON.parse(storage) || [];
    console.log(storageObject);

    // 条件に当てはまる場合storageに保存する
    if (key.match(/[a-z]/i) && key.length === 1 || key.match(/[0-9]/)|| key.match(/^[!-/:-@[-`{-~]+$/) || key === " " || key === "Enter") {
        // F1-F12までを除く
        if (!key.match(/^F[1-9]|F1[0-2]$/)) {
            // storage内にデータがあるかどうか、初めて保存するか
            if (storageObject && storageObject.length > 0) {

                const length = storageObject.length;
                const time = now - (storageObject[length - 1].now);

                storageObject.push({
                    now,
                    key,
                    time
                });
                localStorage.setItem('keyEn', JSON.stringify(storageObject));
            
            } else {

                const time = now - justNow;

                const data = {
                    items : [{
                        now,
                        key,
                        time
                    }]
                };
                localStorage.setItem('keyEn', JSON.stringify(data.items));
            }
        }
    } else if (storageObject && storageObject.length && key ==='Backspace') {
        // 文字が消されたときの処理
        storageObject.length = storageObject.length - 1;
        localStorage.setItem('keyEn', JSON.stringify(storageObject));
    } else if (!key.match(/^[^\x01-\x7E\xA1-\xDF]+$/) && key !== 'Shift' && key !== 'Backspace' && key !== 'Alt' && key !== 'Control' && key !== 'ArrowUp' && key !== 'ArrowRight' && key !== 'ArrowDown' && key !== 'ArrowLeft' && key !== 'Delete' && key !== 'ContextMenu' && key !== 'Meta' && key !== 'Tab' && key !== 'Unidentified') {
        // 全角文字などが打たれた時の処理
        textarea.disabled = true;
        alert('その文字は打てません。');
        textarea.disabled = false;
        //console.log('This is 全角');
    }
};

// textareaにforcasが当たっている場合
const textarea = document.getElementById('textarea');
textarea.addEventListener('focus', () => {
    document.addEventListener('keydown', type);
    console.log('くっついた');
});

// textareaにforcasが当たっていない場合
textarea.addEventListener('blur', () => {
    document.removeEventListener('keydown', type);
    console.log('離れた');
});


// カーソルの情報
let cursorVisible = false;
let cursorTimer = 0;
const cursorInterval = 500; // カーソルの点滅間隔（ミリ秒）

function setup() {

    const p5Canvas = createCanvas(500, 500);
    p5Canvas.parent('p5Canvas');

    // キャンバスを保存する
    const saveButton = document.getElementById('canvasSave');
    saveButton.addEventListener('click', () => {
        saveCanvas(p5Canvas, `memo${year()}${month()}${day()}${hour()}${second()}${minute()}`, 'jpg');
    });


}

function draw() {
    background(160);

    const data = JSON.parse(localStorage.getItem('keyEn')) || [];
    
    if(data) {
        // 文字の初期値
        let x = 10;
        let y = 30;

        for (let i = 0; i < data.length; i++) {

            // Enterキーが押されたら改行する。
            if (data[i].key === 'Enter') {
                if (y < height - 20) {
                    x = 10;
                    y += 35;
                } else {
                    // canvasの幅を超えた場合、データを消す
                    data.length = data.length - 1;
                    localStorage.setItem('keyEn', JSON.stringify(data));
                }
            } else {
                fill(255, 255, 255, Math.max(100, data[i].time));
                textSize(20);
                textFont('Yu Gothic');
                text(`${data[i].key}`, x, y);
                textAlign(LEFT, LEFT);

                // テキストの幅がcanvasの幅を超えた場合、y座標を下げる
                if (x + textWidth(data[i].key) + 20 > width - 15) {
                    if (y < height - 20) {
                        x = 10;
                        y += 35;
                    } else {
                        // canvasの幅を超えた場合、データを消す
                        data.length = data.length - 1;
                        localStorage.setItem('keyEn', JSON.stringify(data));
                    }
                } else {
                    x += textWidth(data[i].key) + 15;
                }
            }
        }

        // カーソルを描画
        if (document.activeElement === textarea && cursorVisible) {
            push();
            stroke(255);
            line(x, y - 20, x, y + 5);
            pop();
        }

        // カーソルの点滅制御
        if (millis() - cursorTimer > cursorInterval) {
            cursorVisible = !cursorVisible;
            cursorTimer = millis();
        }

    }
}


