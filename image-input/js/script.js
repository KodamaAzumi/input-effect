// リロードすると消去される
//localStorage.clear();

// データ確認用
const storage = localStorage.getItem('keyImage');
console.log(JSON.parse(storage) || []);

// storage内のデータを消去する
const dataClear = () => {
    localStorage.removeItem('keyImage');
    location.reload();
};

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
startButton.addEventListener('click', startCamera);

// ストップボタンをクリックしたときの処理
stopButton.addEventListener('click', stopCamera);

// 写真を取るときの処理
const capture = async (event) => {
    const key = event.key;

    // 写真を撮った時の時刻
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    if (stream) {
        if (key.match(/[a-z]/i) && key.length === 1 || key.match(/[0-9]/) || key === " " || key === "." || key === "'") {

             // キャンバスにビデオ画像を描画する
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // 画像の容量を変更する
            const quality = 0.85;
            const imageUrl = canvas.toDataURL('image/jpeg', quality);
        
            // キャプチャした画像をプレビューする
            preview.src = imageUrl;

            // データをstorageから取り出す
            let storage = await localStorage.getItem('keyImage');
            let storageObject = JSON.parse(storage) || [];

            // storage内にデータがあるかどうか、初めて保存するか
            if (storageObject && storageObject.length > 0) {
                // 140字未満だったら保存する
                if (storageObject.length < 140) {
                    storageObject.push({
                        now,
                        imageUrl,
                        hour,
                        min,
                        sec,
                        key,
                    });
                    localStorage.setItem('keyImage', JSON.stringify(storageObject));
                }
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

            // データをstorageから取り出す
            storage = localStorage.getItem('keyImage');
            storageObject = JSON.parse(storage) || [];
            const length = storageObject.length;

            // storageの画像を表示
            if (storageObject && length < 140) {
                const imagePara =  document.getElementById('image-para');
                imagePara.innerHTML +=  `
                    <span class='key-word'>${key}</span>
                `;
                const keyWord = document.getElementsByClassName(`key-word`);
                keyWord[length -1].style.fontSize = '64px';
                keyWord[length -1].style.backgroundImage = `url(${imageUrl})`;
                keyWord[length -1].style.backgroundClip = 'text';
                keyWord[length -1].style.webkitBackgroundClip = "text";
                keyWord[length -1].style.color = 'transparent';
            }

        } else if (key ==='Backspace') {

            console.log('ok');
            // データをstorageから取り出す
            const storage = localStorage.getItem('keyImage');
            const storageObject = JSON.parse(storage) || [];

            // storageから消去
            storageObject.length = storageObject.length - 1;
            localStorage.setItem('keyImage', JSON.stringify(storageObject));

            const keyWord = document.getElementsByClassName(`key-word`);
            keyWord[storageObject.length].remove();
        }
    }
}
document.addEventListener('keydown', capture);


// storageの画像を表示
const storageObject = JSON.parse(storage) || [];
const imagePara =  document.getElementById('image-para');
if (storageObject) {
    for (let i = 0; i < storageObject.length; i++) {
        
        imagePara.innerHTML += `
            <span class='key-word'>${storageObject[i].key}</span>
        `;
        document.getElementsByClassName('key-word')[i].style.backgroundImage = `url(${storageObject[i].imageUrl})`;
        //console.log(storageObject[i]);
    }
}
    