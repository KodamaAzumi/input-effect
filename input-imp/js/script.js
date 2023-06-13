// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyJpImp');
console.log(JSON.parse(storage) || []);

// storage内のデータを消去する
const dataClear = () => {
    localStorage.removeItem('keyJpImp');
    location.reload();
};


const textarea = new Textarea('#js-textarea');
console.log(textarea);
const output = document.querySelector('#js-output');

const loop = () => {
  const fragment = document.createDocumentFragment();

  output.innerHTML = '';

  textarea.entityIds.forEach((entityId, i) => {
    // 入力された順に文字情報を順に取得する
    const { timestamp, value } = textarea.entity[entityId];
    // ひとつ前の ID を取得する
    const prevEntityId = textarea.entityIds[i - 1];
    const span = document.createElement('span');
    // ひとつ前の文字情報との時差
    let diff = 0;

    // ひとつ前の ID が見つからなければ、1文字目なので時差なし、になる
    if (prevEntityId) {
      diff = timestamp - textarea.entity[prevEntityId].timestamp;
    };

    // データをstorageから取り出す
    const storage = localStorage.getItem('keyJpImp');
    const storageObject = JSON.parse(storage) || [];
    storageObject.push({
      value,
      timestamp,
      diff
    });
    localStorage.setItem('keyJpImp', JSON.stringify(storageObject));
    
    span.style.paddingLeft = `${Math.max(diff / 4000, 1) * 4}em`;
    span.appendChild(document.createTextNode(value));
    fragment.appendChild(span);
  });

  output.appendChild(fragment);
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

    const data = JSON.parse(localStorage.getItem('keyJpImp')) || [];
    
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