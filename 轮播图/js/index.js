function addCarousel({ data = [], wrapper, renderItem }) {
    const dom = document.createElement('div');
    dom.innerHTML = data.map(x => renderItem(x)).join('');
    wrapper.append(dom);
}

const imgs = ['black.jpg', 'home.jpg', 'onepice.jpg'];
addCarousel({
    wrapper: document.body,
    data: imgs,
    renderItem: (x) => {
        return `<img src=${OFile.getAssetsImg(x)} />`
    }
});