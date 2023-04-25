// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyImage');
console.log(JSON.parse(storage));

// storage内のデータを消去する
const dataClear = () => {
    localStorage.clear();
    location.reload();
};


const video = document.getElementById('video');
const canvas = document.createElement('canvas');
canvas.width = 320; // 幅を指定
canvas.height = 240; // 高さを指定
const captureButton = document.getElementById('imageShot');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const preview = document.getElementById('preview');
let stream = null;

// カメラを起動する関数
const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
        stream = s;
        video.srcObject = stream;
        })
        .catch((error) => {
        console.error('Media device error:', error);
        });
};

// カメラを停止する関数
const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
        video.srcObject = null;
    }
};

// スタートボタンをクリックしたときの処理
startButton.addEventListener('click', () => {
    startCamera();
});

// ストップボタンをクリックしたときの処理
stopButton.addEventListener('click', () => {
    stopCamera();
});

// キャプチャボタンをクリックしたときの処理
captureButton.addEventListener('click', () => {

    // 写真を撮った時の時刻
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    if (stream) {
        // キャンバスにビデオ画像を描画する
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // キャプチャした画像をプレビューする
        preview.src = canvas.toDataURL();
        const imageUrl = preview.src;
        //console.log(imageUrl);

        // // データをstorageから取り出す
        const storage = localStorage.getItem('keyImage');
        const storageObject = JSON.parse(storage);

        // storage内にデータがあるかどうか、初めて保存するか
        if (storageObject && storageObject.length > 0) {
            storageObject.push({
                now,
                imageUrl,
                hour,
                min,
                sec,
            });
            localStorage.setItem('keyImage', JSON.stringify(storageObject));
        } else {
            const imageData = {
                items : [{
                    now,
                    imageUrl,
                    hour,
                    min,
                    sec,
                }]
            };
            localStorage.setItem('keyImage', JSON.stringify(imageData.items));
        }

    }
});

// storageの画像を表示
const storageObject = JSON.parse(storage);
const list =  document.getElementById('list');
for (let i = 0; i < storageObject.length; i++) {
    
    list.innerHTML += `
    <li id="li-storage">
        <p>${storageObject[i].hour} : ${storageObject[i].min} : ${storageObject[i].sec}</p>
        <img class="img-storage" src="${storageObject[i].imageUrl}"></img>
    </li>
    `;
    //console.log(storageObject[i]);
}


