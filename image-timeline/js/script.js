// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyImage');
console.log(JSON.parse(storage));

// storage内のデータを消去する
const dataClear = () => {
    localStorage.removeItem('keyImage');
    location.reload();
};

/*
const video = document.getElementById('video');
const canvas = document.createElement('canvas');
canvas.width = 320; // 幅を指定
canvas.height = 240; // 高さを指定
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

// classの数をカウントする
let count = 0;

// キャプチャボタンをクリックしたときの処理
const capture = async (event) => {
    console.log(event);
    const key = event.key;

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

        // データをstorageから取り出す
        const storage = await localStorage.getItem('keyImage');
        const storageObject = JSON.parse(storage);

        // storage内にデータがあるかどうか、初めて保存するか
        if (storageObject && storageObject.length > 0) {
            storageObject.push({
                now,
                imageUrl,
                hour,
                min,
                sec,
                key,
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
                    key,
                }]
            };
            localStorage.setItem('keyImage', JSON.stringify(imageData.items));
        }

        // storageの画像を表示
        count += 1;
        const list =  document.getElementById('list');
        list.innerHTML +=  `
        <li class="li-storage">
            <p class='key-word'>${key}</p>
            <p>${hour} : ${min} : ${sec}</p>
            <img class="img-storage" src="${imageUrl}"></img>
        </li>
        `;
        document.getElementsByClassName('li-storage')[count - 1].style.listStyleType = 'none';
        const keyWord = document.getElementsByClassName(`key-word`);
        keyWord[count - 1].style.fontSize = '64px';
        //keyWord[count - 1].style.backgroundImage = `url(${imageUrl})`;
        //keyWord[count - 1].style.backgroundClip = 'text';
        //keyWord[count - 1].style.webkitBackgroundClip = "text";
        //keyWord[count - 1].style.color = 'transparent';
    }
}
document.addEventListener('keydown', capture);
*/

// storageの画像を表示
const storageObject = JSON.parse(storage);
const list =  document.getElementById('list');
if (storageObject) {
    for (let i = 0; i < storageObject.length; i++) {
        
        list.innerHTML += `
        <li class="li-storage">
            <p class='key-word'>${storageObject[i].key}</p>
            <p>${storageObject[i].hour} : ${storageObject[i].min} : ${storageObject[i].sec}</p>
            <img class="img-storage" src="${storageObject[i].imageUrl}"></img>
        </li>
        `;
        //document.getElementsByClassName('key-word')[i].style.backgroundImage = `url(${storageObject[i].imageUrl})`;
    }
}
    