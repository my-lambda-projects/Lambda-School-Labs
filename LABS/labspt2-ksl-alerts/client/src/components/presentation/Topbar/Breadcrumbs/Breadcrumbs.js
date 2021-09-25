import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Breadcrumb } from 'semantic-ui-react';

const Breadcrumbs = props => {

  const { sections } = props;

  const mapSections = sections => {

    return sections.map((section, i) => {
      return (
        <Breadcrumb.Section
          key={ i }
          link={ i === sections.length -1 ? false : true}
          active={ i === sections.length -1 ? true : false }
          onClick={ i === sections.length -1 ? null : (e) => { alert(section.name) } }
        >
          { section.name }
          { i !== sections.length -1 && <Breadcrumb.Divider icon='right angle' /> }
        </Breadcrumb.Section>
      );
    });
  }

  return (
    <Breadcrumb as={ BreadcrumbsContainer }>
      { mapSections(sections) }
    </Breadcrumb>
  );
}

Breadcrumbs.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};

export default Breadcrumbs;

const BreadcrumbsContainer = styled.div`

  background: transparent;

`;
