import React from "react";
import Loading from "../../SubComponents/Loading.js";

const Preview = props => {
  let loading = props.loading ? <Loading className='loading'></Loading> : null;

  const preview = props.og_title ? (
    <div className='preview'>

      <div className='image-container' style={{backgroundImage: `url(${props.og_image})`}} />

      <div className='content'>

        <div className='title-container'>

          <span className='title'>{props.og_title}</span>
          
        </div>

        <div className='description'>{props.og_desc}</div>

        <div className='divide'>

          <div className='line'/>

          <div className='site'>{props.og_sitename}</div>

        </div>
      </div>

    </div>
  ) : null;

  return (
    <section className="recipe-preview">
      {loading}
      {preview}
    </section>
  );
};

export default Preview;
