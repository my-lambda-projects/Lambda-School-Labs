import React, { Fragment, useContext } from 'react';
import { Context } from '../../contexts/Contexts';
//had to set a fixed itemSize for a FixedSizeList. Look into the VariableSizeList to make it so there aren't such big gaps between some calendar components
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Calendar from './Calendar';
import AddEventButton from '../events/AddEventButton';
import Loading from '../home/CalendarLoading';

//creates an object which keeps track of whether the calendar component has been rendered before
const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

//determines that an item has indeed been loaded by checking the above object
const isItemLoaded = index => itemStatusMap[index] === 2;

//Seems silly to make use a promise here but if you don't, it breaks
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 10)
  );
};

//As far as I can tell, style isn't actually imparting any normal style info, but it has something to do with scrolling through the components correctly. It will break if you take it out.
const Row = ({ data, index, style }) => {
  let label;
  if (itemStatusMap[index] === LOADED) {
    label = (
      <Calendar style={style} key={index} i={index} month={data.items[index]} />
    );
  } else {
    label = <Loading />;
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

//not *truly* infinite yet, but the scaffolding is in place. I think you would need to alter the loadMoreItems function to update some state that would change the months in the "items" array to really make it infinite.

//It currently will dynamically load a large number of components while only actually rendering the ones visible to the user (this is from react-window). Props passed in here must be given to the itemData attribute of the List component. Then they may be accessed above through "data" in Row, then pass it as a prop like so: data.whateverthepropnameis . DO NOT put Row directly inside the list inline. This causes a weird refresh bug that will be impossible to track down for a week. Not that I would know.
export default function NewInfCal({ items }) {
  const { templateFormOpen } = useContext(Context);

  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={50}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={window.innerHeight - 130}
            itemCount={24}
            itemSize={817}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={'100%'}
            itemData={{ items }}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
      {!templateFormOpen}
      {/* && <AddEventButton/> */}
    </Fragment>
  );
}
