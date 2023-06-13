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
    
    // 文字間に適応させる
    /*
    span.style.paddingLeft = `${Math.max(diff / 4000, 1) * 4}em`;
    span.appendChild(document.createTextNode(value));
    fragment.appendChild(span);
    */
  });

  output.appendChild(fragment);
  window.requestAnimationFrame(loop);
  
};
  
window.requestAnimationFrame(loop);