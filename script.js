addEventListener('wheel', ({ deltaY }) => {
    const willIncrease = Math.sign(deltaY) === 1;
    targetZoom = clamp(0.8, 1.6, targetZoom * (willIncrease ? 1.1 : 1 / 1.1));
});

requestAnimationFrame(function frame() {
    zoom = interpolate(zoom, targetZoom, 0.1);
    if (zoom !== targetZoom) dispatchEvent(new Event('resize'));

    requestAnimationFrame(frame);
});

const clamp = (min, max, value) => (
    Math.max(Math.min(max, value), min)
);

const interpolate = (a, b, t) => (
    a * (1 - t) + b * t
);

let targetZoom = 1.2, zoom = targetZoom;

Object.defineProperty(Object.prototype, 'Ya', {
    set(value) {
        const getPropertyFromEntries = (object, finder) => (
            Object.entries(object).find(([, value]) => value === finder)
        );

        const [widthKey, widthValue] = getPropertyFromEntries(this, 1824);
        const [heightKey, heightValue] = getPropertyFromEntries(this, 1026);
        delete Object.prototype.Ya;

        Object.defineProperties(this, {
            [widthKey]: {
                get: () => widthValue * zoom
            },

            [heightKey]: {
                get: () => heightValue * zoom
            },

            Ya: {
                value,
                writable: true,
                configurable: true,
                enumerable: true
            }
        });
    },

    configurable: true,
    enumerable: true
});