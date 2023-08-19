
// 实现上传图片预览的功能
const OUploadImg = {
    fileReader: new FileReader(),

    init(wrapperEl = document.body) {
        const inp = this.createUpload({
            multiple: true,
            needBase64: true,
            accept: "image/*",
            onchange: (_files, base64Arr) => {
                this.removeImg();
                base64Arr.forEach(x => {
                    const img = this.createImg({ src: x });
                    wrapperEl.appendChild(img);
                })
            }
        })

        wrapperEl.appendChild(inp);
    }

    ,
    createUpload({ onchange, needBase64, multiple, accept }) {
        const inp = document.createElement("input");
        Object.assign(inp, { type: 'file', multiple, accept });
        // accept=".jpg,.jpeg,.png"
        // 也可以通过设置accept="image/*"来表示可以选择任何一种图片类型文件
        // capture属性用于移动设备，允许直接选择设备相机或麦克风录音

        if (onchange) {
            inp.onchange = async () => {
                const files = inp.files;
                let base64Arr;
                if (needBase64) {
                    base64Arr = await OFile.readAsDataURLs(files);
                }
                onchange(files, base64Arr);
            }
        }
        return inp;
    },

    createImg({ src }) {
        const dom = document.createElement("img");
        Object.assign(dom, { src });
        return dom;
    },

    removeImg() {
        const doms = document.querySelectorAll('img');
        doms.forEach(x => {
            x.remove();
        });
    }
}

const OFile = {
    readAsDataURLs(files) {
        const pros = []
        for (const item of files) {
            pros.push(this.readAsDataURL(item))
        }

        return Promise.all(pros);
    },
    readAsDataURL(file) {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(e.target.result)
            }
            fileReader.readAsDataURL(file);
        });
    }
}


OUploadImg.init();



