// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyJp');
console.log(JSON.parse(storage) || []);

// storage内のデータを消去する
const dataClear = () => {
    localStorage.removeItem('keyJp');
    location.reload();
};

const textarea = new Textarea('#js-textarea');
console.log(textarea);

const loop = () => {
    console.log('----------')
  
    textarea.entityIds.forEach((entityId, i) => {
      const { timestamp, value } = textarea.entity[entityId];
      const prevEntityId = textarea.entityIds[i - 1];
      let diff = 0;
  
      if (prevEntityId) {
        diff = Math.max(timestamp - textarea.entity[prevEntityId].timestamp, 0);
      }
  
      console.log(`文字列: ${value}
        入力された時間（UNIX TIME）: ${timestamp}
        ひとつ前の入力からの差分（ミリ秒）: ${diff}
      `);

    // データをstorageから取り出す
    const storage = localStorage.getItem('keyJp');
    const storageObject = JSON.parse(storage) || []; 

    // storage内にデータがあるかどうか、初めて保存するか 
    if (storageObject && storageObject.length > 0) {

        const length = storageObject.length;

        if (length <= 140 + 13) {
            storageObject.push({
              value,
              timestamp,
              diff,
            });
            localStorage.setItem('keyJp', JSON.stringify(storageObject));
        }

    } else {

        const data = {
            items : [{
                value,
                timestamp,
                diff,
            }]
        };
        localStorage.setItem('keyJp', JSON.stringify(data.items));
    }

    });
  
    window.requestAnimationFrame(loop);
};
  
window.requestAnimationFrame(loop);

/*
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

    const data = JSON.parse(localStorage.getItem('keyJp')) || [];
    
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
*/