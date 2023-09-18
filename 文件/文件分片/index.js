import { ODomCreate } from "./js/index.js"

ODomCreate.createFile({
    append: true, onChange: (e) => {
        console.log(e)
    }
});