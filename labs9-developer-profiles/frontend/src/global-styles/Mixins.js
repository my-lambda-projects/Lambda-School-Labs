/* Simply import and use */

export function link(fontSize, color) {
  return `
    text-decoration: none;
    font-size: ${fontSize};
    color: ${color};
  `;
}

export function centerFlex(flexDirection = 'row') {
  return `
    display: flex;
    flex-direction: ${flexDirection};
    justify-content: center;
    align-items: center;
  `;
}

export function labelArea() {
  return `
    color: rgba(42,42,42,.8);
    display: inline-block;
    font-size: 1.7rem;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 23px;
    letter-spacing: 1px;
  `;
}

export function inputArea() {
  return `
    line-height: 23px;
    font-family: inherit;
    font-size: 1.7rem;
    color: rgb(42,42,42);
    padding: 10px;
    width: 85%;
    border: none;
    border-radius: 5px;
    border: solid 1px black;
    background: white;
    background-color: rgba(255,255,255,.8);
    @media (max-width: 1550px) {
      width: 100%;
    }
    &::placeholder {
      font-size: 1.4rem;
      line-height: 23px;
      font-family: inherit;
      opacity: .8;
    }
  `;
}
