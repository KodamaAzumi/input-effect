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


const textarea = new Photo('#js-textarea');
console.log(textarea);
const output = document.querySelector('#js-output');
const imagePara = document.querySelector('#image-para');

const loop = () => {
  const fragment = document.createDocumentFragment();
  const fragmentI = document.createDocumentFragment();

  output.innerHTML = '';
  imagePara.innerHTML = '';

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

    // diffを適した値にするための計算
    const mathDiff = diff/(10 ** 3);
    //console.log(entityId, i, value, diff, mathDiff);

    // 不透明度に適応させる
    span.style.opacity = `${Math.max(mathDiff, 0.01)}`;
    span.appendChild(document.createTextNode(value));
    fragment.appendChild(span);
    
    // 文字間に適応させる
    /*
    span.style.paddingLeft = `${Math.max(diff / 4000, 1) * 4}em`;
    span.appendChild(document.createTextNode(value));
    fragment.appendChild(span);
    */

    // storageの画像を表示
    if (textarea.entity[entityId].imageData) {
      const spanI = document.createElement('span');
      spanI.style.fontSize = '64px';
      spanI.style.backgroundImage = `url(${textarea.entity[entityId].imageData.imageUrl})`;
      spanI.style.backgroundClip = 'text';
      spanI.style.webkitBackgroundClip = "text";
      spanI.style.color = 'transparent';
      spanI.appendChild(document.createTextNode(value));
      fragmentI.appendChild(spanI);
    }
  });

  output.appendChild(fragment);
  imagePara.appendChild(fragmentI);
  window.requestAnimationFrame(loop);
  
};
  
window.requestAnimationFrame(loop);