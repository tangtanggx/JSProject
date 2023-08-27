
const dom = ODom.getDom('.pic');
const dx = 0 - window.screenLeft;
const dy = 0 - window.screenTop;
ODom.setStyle(dom, { transform: `translate(${dx}px, ${dy}px)` });


const ODragNew = {
    data: {},
    add(domName) {
        const da = this.data[domName] = {
            x: 0,
            y: 0,
            dx, // 记录初始偏移的距离
            dy,

        };

        const dom = ODom.getDom(domName);
        dom.setAttribute('draggable', false);

        dom.onmousedown = (e) => {
            console.log(e);
            Object.assign(da, { x: e.x, y: e.y, ex: e.x, ey: e.y });
            const tempObj = {};

            window.onmousemove = (e) => {
                const dx = da.dx + e.x - da.x,
                    dy = da.dy + e.y - da.y;
                Object.assign(tempObj, { dx, dy });


                ODom.setStyle(dom, {
                    transform: `translate(${dx}px, ${dy}px)`
                });


                channel.postMessage({ domName, dx: e.x - da.ex, dy: e.y - da.ey });
                Object.assign(da, { ex: e.x, ey: e.y });

            }
            window.onmouseup = () => {
                window.onmousemove = undefined;
                window.onmouseup = undefined;
                Object.assign(da, tempObj);
            }
        }


    }
}

const channel = new BroadcastChannel('pic');
channel.onmessage = (e) => {
    const { domName, dx, dy } = e.data;
    const dom = ODom.getDom(domName);

    // 拿到元素transform值
    let str = ODom.getStyle(dom).transform;
    let [x, y] = str.split('(')[1].split(')')[0].split(',');
    x = +x.split('px')[0];
    y = +y.split('px')[0];

    console.log(x, y, dx, dy)

    ODom.setStyle(dom, {
        transform: `translate(${x + dx}px, ${y + dy}px)`
    });
}

function addBtn() {
    if (!location.href.includes('isSub=1')) {

        const btnDom = document.createElement('button');
        btnDom.innerText = '新增窗口';
        btnDom.onclick = () => {

            open(`${location.href}?isSub=1`)

        }
        document.body.append(btnDom);
    }
}

ODragNew.add('.pic');
addBtn();





