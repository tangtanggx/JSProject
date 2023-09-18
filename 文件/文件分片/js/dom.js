export const ODom = {
    getDom(domName) {
        // innerHTML
        if (domName) return document.querySelector(domName)
    },

    getWidth(dom) {
        return dom.clientWidth;
    },
    getHeight(dom) {
        return dom.clientHeight;
    },

    setStyle(dom, obj) {
        const style = this.getStyle(dom)
        Object.assign(style, obj);

        let newStyleStr = '';
        Object.keys(style).forEach(k => {
            newStyleStr += `${k}:${obj[k]};`
        })
        newStyleStr && dom.setAttribute('style', newStyleStr);
    },
    getStyle(dom) {
        let styleStr = dom.getAttribute('style') || '';
        styleStr = styleStr.replaceAll(' ', '');
        const arr = styleStr.split(';').filter(x => x);
        const style = {};
        arr.forEach(x => {
            const [key, value] = x.split(':');
            style[key] = value;
        })
        return style
    }
}

export const ODomCreate = {
    createDom(domStr, props) {
        const dom = document.createElement(domStr);
        props && Object.assign(dom, props);
        return dom;
    },
    createFile({ append, onChange }) {
        const inp = this.createDom('input', { type: 'file' });
        if (onChange) {
            inp.onchange = (e) => {
                onChange(e)
            }
        }
        if (append) document.body.append(inp);
    }
}

export const ODrag = {
    data: {},
    add(domName) {
        const da = this.data[domName] = {
            x: 0,
            y: 0,
            dx: 0, // 记录初始偏移的距离
            dy: 0
        };

        const dom = ODom.getDom(domName);
        dom.setAttribute('draggable', false);

        dom.onmousedown = (e) => {
            Object.assign(da, { x: e.x, y: e.y });
            console.log(da);
            const tempObj = {};

            window.onmousemove = (e) => {
                const dx = da.dx + e.x - da.x,
                    dy = da.dy + e.y - da.y;
                Object.assign(tempObj, { dx, dy });

                ODom.setStyle(dom, {
                    transform: `translate(${dx}px, ${dy}px)`
                });

            }
            window.onmouseup = () => {
                window.onmousemove = undefined;
                window.onmouseup = undefined;
                Object.assign(da, tempObj);
            }
        }


    }
}
