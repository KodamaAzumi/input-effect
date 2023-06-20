class Photo extends Textarea {
    constructor(selectors) {
        super(selectors);

        this. video = document.getElementById('video');
        this. canvas = document.createElement('canvas');
        this.canvas.width = 320; // 幅を指定
        this.canvas.height = 240; // 高さを指定
        this. startButton = document.getElementById('start');
        this. stopButton = document.getElementById('stop');
        this. preview = document.getElementById('preview');
        this.stream = null;
  
        // スタートボタンをクリックしたときの処理
        this.startButton.addEventListener('click', this.startCamera);

        // ストップボタンをクリックしたときの処理
        this.stopButton.addEventListener('click', this.stopCamera);

        // インプットイベントが起きたときの処理
        this.el.addEventListener('input', this.capture);

        // 写真の情報を保持するobj
        this.imageData= {};

    }

    // カメラを起動する関数
    startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((s) => {
                this.stream = s;
                this.video.srcObject = this.stream;
            })
            .catch((error) => {
                console.error('Media device error:', error);
            });
    }

    // カメラを停止する関数
    stopCamera = () => {
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
            this.video.srcObject = null;
        }
    };

    // 写真を取るときの処理
    capture = (event) => {

        // 写真を撮った時の時刻
        const now = new Date();
        const hour = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();

        if (this.stream) {

            // キャンバスにビデオ画像を描画する
            const context = this.canvas.getContext('2d');
            context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

            // 画像の容量を変更する
            const quality = 0.85;
            const imageUrl = this.canvas.toDataURL('image/jpeg', quality);
        
            // キャプチャした画像をプレビューする
            this.preview.src = imageUrl;

            this.imageData = {
                imageUrl
            }
            const length = this.entityIds.length;
            const entityIdsLast = this.entityIds[length - 1];
            if (this.entity[entityIdsLast]) {
                this.entity[entityIdsLast].imageData = this.imageData;
            }
            
            console.log(this.entity);
            console.log(this.entityIds);
            console.log(length);

            const imagePara =  document.getElementById('image-para');
            const keyWord = document.getElementsByClassName(`key-word`);

            // storageの画像を表示
            /*
            this.entityIds.forEach((entityId) => {
                if (this.entity[entityId].value) {
                    //console.log(this.entity[entityId].value);;
                    //console.log(this.entity[entityId].imageData.imageUrl)
                    const key = this.entity[entityId].value;
                    imagePara.innerHTML +=  `
                        <span class='key-word'>${key}</span>
                    `;
                    if (keyWord.length > 0) {
                        keyWord[length -1].style.fontSize = '64px';
                        keyWord[length -1].style.backgroundImage = `url(${this.entity[entityId].imageData.imageUrl})`;
                        keyWord[length -1].style.backgroundClip = 'text';
                        keyWord[length -1].style.webkitBackgroundClip = "text";
                        keyWord[length -1].style.color = 'transparent';
                    }
                }
            });
            */
        }
    }
    

}