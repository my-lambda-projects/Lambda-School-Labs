import React, { useState, useEffect } from 'react';
import Tab from './Tab';
import {TabsWrapColumn} from '../mainStyle/styledComponent.js';
import './TabStyle.scss';


function TabList({tabs, navigation, setNavigation, tabColor, setTabColor}) {
  const [selected, setSelected] = useState(navigation);
  useEffect(() => {

  }, [selected])

  return (
      <TabsWrapColumn>
        {tabs.map((tab, index) => {
          return (
              <Tab 
                tab={tab}  
                selected={selected} 
                setSelected={setSelected} 
                tabColor={tabColor} 
                navigation={navigation} 
                setTabColor={setTabColor} 
                setNavigation={setNavigation} 
                key={index}
              />
          )
        })}
      </TabsWrapColumn>
  )
}


export default TabList;