// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyDiary');
console.log(JSON.parse(storage));

// storage内のデータを消去する
const dataClear = () => {
    localStorage.removeItem('keyDiary');
    location.reload();
};

// inputイベントを使用した場合
const textarea = document.getElementById('textarea');

const type = (event) =>{
    let japaneseText = textarea.value;
    console.log(japaneseText.length);

    // 改行を除去する
    japaneseText = japaneseText.replace(/\r?\n/g, '');
    japaneseText = japaneseText.replace(/(.{18})/g, "$1\n");

    // 条件式に当てはまる場合storageに保存する
    if (japaneseText.match(/[^\x00-\x7F]/)) {
        
        // japaneseTextが140字以下なら保存する
        if (japaneseText.length <= 140 + 13) {
            const data = {
                items : [{
                    japaneseText,
                }]
            };
            localStorage.setItem('keyDiary', JSON.stringify(data.items));
        } else {
            console.log('yeah');
        }
        
    } else if (japaneseText === '') {
        const data = {
            items : []
        }
        localStorage.setItem('keyDiary', JSON.stringify(data.items));
    } 
};

// inputイベント
textarea.addEventListener('input', type);


function setup() {

    const p5Canvas = createCanvas(500, 500);
    p5Canvas.parent('p5Canvas');

    pixelDensity(1);

    // キャンバスを保存する
    const saveButton = document.getElementById('canvasSave');
    saveButton.addEventListener('click', () => {
        saveCanvas(p5Canvas, `Diary${year()}${month()}${day()}${hour()}${second()}${minute()}`, 'png');
    });

}

function draw() {

    background(255);

    const data = JSON.parse(localStorage.getItem('keyDiary'));

    fill(0, 0, 0);
    textSize(25);
    textFont('Yu Gothic');
    textAlign(LEFT, LEFT);
    text(`${year()}年${month()}月${day()}日`, 20, 40);
    //text(`2023年4月21日`, 20, 40);
    
    if(data) {
        // 文字の初期値
        let x = 20;
        let y = 90;

        if (data[data.length - 1]) {
            fill(0, 0, 0);
            textSize(25);
            textFont('Yu Gothic');
            textAlign(LEFT, LEFT);
            text(`${data[data.length - 1].japaneseText}`, x, y);
        }
    }
}