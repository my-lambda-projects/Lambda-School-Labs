
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';  /**************<<=========Need this to be a trashcan icon************ */

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 550,
    height: 500,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: '',
    title: '',
    link:'',
    featured: true,
  },
  {
    img: '',
    title: '',
    link: '',
  },
  {
    img: '',
    title: '',
    link: '',
  },
  {
    img: '',
    title: '',
    author: '',
    featured: true,
  },
  {
    img: '',
    title: '',
    link: '',
  },
  {
    img: '',
    title: '',
    link: '',
  },
  {
    img: '',
    title: '',
    link: '',
  },
  {
    img: '',
    title: '',
    link: '',
  },
];

/**
 * This component will display all the instagram photos after they've had links attached.
 */
const GridComplex = () => (
  <div style={styles.root}>
    <GridList
      cols={4}
      cellHeight={200}
      padding={1}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}  //TODO need trashcan button and removelink/delete function
          actionPosition="left"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridComplex;
