import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function GitHubAdd(props) {
  const git_hub_add = `

    <svg width="549" height="565" viewBox="0 0 549 565"  xmlns="http://www.w3.org/2000/svg">
<path d="M165.9 470.4C165.9 472.4 163.6 474 160.7 474C157.4 474.3 155.1 472.7 155.1 470.4C155.1 468.4 157.4 466.8 160.3 466.8C163.3 466.5 165.9 468.1 165.9 470.4ZM134.8 465.9C134.1 467.9 136.1 470.2 139.1 470.8C141.7 471.8 144.7 470.8 145.3 468.8C145.9 466.8 144 464.5 141 463.6C138.4 462.9 135.5 463.9 134.8 465.9ZM179 464.2C176.1 464.9 174.1 466.8 174.4 469.1C174.7 471.1 177.3 472.4 180.3 471.7C183.2 471 185.2 469.1 184.9 467.1C184.6 465.2 181.9 463.9 179 464.2ZM244.8 81C106.1 81 0 186.3 0 325C0 435.9 69.8 530.8 169.5 564.2C182.3 566.5 186.8 558.6 186.8 552.1C186.8 545.9 186.5 511.7 186.5 490.7C186.5 490.7 116.5 505.7 101.8 460.9C101.8 460.9 90.4 431.8 74 424.3C74 424.3 51.1 408.6 75.6 408.9C75.6 408.9 100.5 410.9 114.2 434.7C136.1 473.3 172.8 462.2 187.1 455.6C189.4 439.6 195.9 428.5 203.1 421.9C147.2 415.7 90.8 407.6 90.8 311.4C90.8 283.9 98.4 270.1 114.4 252.5C111.8 246 103.3 219.2 117 184.6C137.9 178.1 186 211.6 186 211.6C206 206 227.5 203.1 248.8 203.1C270.1 203.1 291.6 206 311.6 211.6C311.6 211.6 359.7 178 380.6 184.6C394.3 219.3 385.8 246 383.2 252.5C399.2 270.2 409 284 409 311.4C409 407.9 350.1 415.6 294.2 421.9C303.4 429.8 311.2 444.8 311.2 468.3C311.2 502 310.9 543.7 310.9 551.9C310.9 558.4 315.5 566.3 328.2 564C428.2 530.8 496 435.9 496 325C496 186.3 383.5 81 244.8 81ZM97.2 425.9C95.9 426.9 96.2 429.2 97.9 431.1C99.5 432.7 101.8 433.4 103.1 432.1C104.4 431.1 104.1 428.8 102.4 426.9C100.8 425.3 98.5 424.6 97.2 425.9ZM86.4 417.8C85.7 419.1 86.7 420.7 88.7 421.7C90.3 422.7 92.3 422.4 93 421C93.7 419.7 92.7 418.1 90.7 417.1C88.7 416.5 87.1 416.8 86.4 417.8ZM118.8 453.4C117.2 454.7 117.8 457.7 120.1 459.6C122.4 461.9 125.3 462.2 126.6 460.6C127.9 459.3 127.3 456.3 125.3 454.4C123.1 452.1 120.1 451.8 118.8 453.4ZM107.4 438.7C105.8 439.7 105.8 442.3 107.4 444.6C109 446.9 111.7 447.9 113 446.9C114.6 445.6 114.6 443 113 440.7C111.6 438.4 109 437.4 107.4 438.7Z" />
<circle cx="467.5" cy="81.5" r="81.5" fill="#4CF39D"/>
<path d="M511.957 70.2939H478.466V36.6763C478.466 32.5511 475.133 29.2057 471.024 29.2057H463.581C459.472 29.2057 456.139 32.5511 456.139 36.6763V70.2939H422.648C418.538 70.2939 415.206 73.6396 415.206 77.7647V85.2351C415.206 89.3602 418.538 92.7058 422.648 92.7058H456.139V126.323C456.139 130.449 459.472 133.794 463.581 133.794H471.024C475.133 133.794 478.466 130.449 478.466 126.323V92.7058H511.957C516.067 92.7058 519.399 89.3602 519.399 85.2351V77.7647C519.399 73.6396 516.067 70.2939 511.957 70.2939Z" fill="#7B7D88"/>
</svg>
`;

  const GitHubAdd = () => (
    <SvgXml
      xml={git_hub_add}
      width='35'
      height='35'
      fill='#d3d3d3'
      {...props}
    />
  );

  return <GitHubAdd />;
}
