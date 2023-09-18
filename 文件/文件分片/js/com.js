



export const OStr = {
    /** 移除html标签 */
    removeHtmlTag(d) {
        if (!d) return '';
        else {
            // 手动解析DOM树
            const dom = new DOMParser().parseFromString(d, 'text/html')
            return dom.body.textContent;
        }
    }
}

export const OData = {
    /** 两数组的值是否一样 */
    arrDataIsSame(arr1, arr2) {
        // 有一个不一样就知道结果了
        return arr1.length === arr2.length && !arr1.some((x, i) => !this.isSame(x, arr2[i]))
    },

    isSame(a, b) {
        // 考虑NaN的情况
        return Object.is(a, b);
    }
}

/** 计算缓存：计算参数不变化，就使用缓存值 */
export class CalcCache {
    data = {}
    get(key, arr, fn) {
        const data = this.data;
        const obj = data[key];
        if (obj) {
            if (OData.arrDataIsSame(arr, obj.arr)) {
                // 读缓存值
                return obj.value
            } else {
                // 更新值
                const v = fn();
                Object.assign(obj, { arr, value: v })
                return v;
            }
        } else {
            // 第一次计算
            const v = fn();
            data[key] = {
                arr,
                value: v
            }
            return v;
        }
    }
}
