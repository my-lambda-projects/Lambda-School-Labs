import  styled  from "styled-components";

const sizes = {
    phone: 376,
    tablet: 768,
    desktop: 992,
};

function phone(...args) {
    return styled`
    @media(max-width: ${sizes.phone}px) {
        ${styled(...args)}
    }
    `;
}

function tablet(...args) {
    return styled`
    @media(max-width: ${sizes.tablet}px) {
        ${styled(...args)}
    }
    `;
}

function desktop(...args) {
    return styled`
    @media(max-width: ${sizes.desktop}px) {
        ${styled(...args)}
    }
    `;
}

const media = {
    phone,
    tablet,
    desktop
};


export default media;