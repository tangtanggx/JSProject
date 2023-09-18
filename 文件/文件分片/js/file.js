const OFile = {
    getAssetsImg(url) {
        return `./assets/img/${url}`
    },



    /** 分片 */
    async fragment(file, { size = 1024 * 1024 * 5, workerNum = navigator.hardwareConcurrency || 4 }) {
        const f = await this.readFile(file);

        for (let i = 0; i < workerNum; i++) {

            new WebWorker('')
        }

        console.log(f);
    },

    /** 读取文件 */
    readFile() {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(e.target.result)
            }
            fileReader.readAsDataURL(file);
        });
    },

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