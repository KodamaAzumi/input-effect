// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyJp');
console.log(JSON.parse(storage) || []);

// storage内のデータを消去する
const dataClear = () => {
    localStorage.clear();
    location.reload();
};

// ページを開いた時刻を取得
const justNow = Date.now();

// inputイベントを使用した場合
const textarea = document.getElementById('textarea');

const type = (event) =>{
    const japaneseText = event.data;
    //console.log(japaneseText);
    //console.log(textarea.value);
    //console.log(event.data);
    //console.log(event.target.value);

    // タイプされた時の時間を取得
    const now = Date.now();

    // データをstorageから取り出す
    const storage = localStorage.getItem('keyJp');
    const storageObject = JSON.parse(storage) || [];

    console.log(japaneseText); 
 
    // 条件式に当てはまる場合storageに保存する(漢字以外の全角文字)
    if (japaneseText !== null && japaneseText.match(/\p{Script=Hiragana}/u) || japaneseText.match(/\p{Script=Katakana}/u) || japaneseText.match(/\p{Script=Latin}/u) && japaneseText.match(/\p{Script=Han}/u)) {

        // 最後の文字を取得
        const lastCharacter = japaneseText.charAt(japaneseText.length - 1);

        // storage内にデータがあるかどうか、初めて保存するか 
        if (storageObject && storageObject.length > 0) {

            const length = storageObject.length;
            const time = now - (storageObject[length - 1].now);

            if (length <= 140 + 13) {
                storageObject.push({
                    now,
                    time,
                    lastCharacter,
                    japaneseText,
                });
                localStorage.setItem('keyJp', JSON.stringify(storageObject));
            }

        } else {
            const time = now - justNow;

            const data = {
                items : [{
                    now,
                    time,
                    lastCharacter,
                    japaneseText,
                }]
            };
            localStorage.setItem('keyJp', JSON.stringify(data.items));
        }
        
    }
};

// inputイベント
textarea.addEventListener('input', type);

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

    const data = JSON.parse(localStorage.getItem('keyJp'));
    
    if(data) {
        // 文字の初期値
        let x = 10;
        let y = 30;

        for (let i = 0; i < data.length; i++) {

            fill(255, 255, 255, Math.max(100, data[i].time));
            textSize(20);
            textFont('Yu Gothic');
            text(`${data[i].lastCharacter}`, x, y);
            textAlign(LEFT, LEFT);
            // テキストの幅がcanvasの幅を超えた場合、y座標を下げる
            if (x + textWidth(data[i].lastCharacter) + 20 > width - 15) {
            x = 10;
            y += 35;
            } else {
            x += textWidth(data[i].lastCharacter) + 15;
            }
        }

    }  
}