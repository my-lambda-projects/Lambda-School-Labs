const size = {
  mobile: "500px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1920px"
};

const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`
};

export default device;
