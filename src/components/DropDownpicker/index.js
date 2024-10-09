import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native';
import { Black, LightGrey } from '../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../utils/Fonts';

const DropdownComponent = ({ items, setItems, value, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ padding: 10 }}>
      <DropDownPicker
        multiple={true}
        min={1}
        max={items?.length}
        listMode="SCROLLVIEW"
        placeholder="Select your teachers..."
        searchable={true}
        closeOnBackPressed={true}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ backgroundColor: LightGrey, borderWidth: null }}
        listItemContainerStyle={{ backgroundColor: LightGrey }}
        textStyle={{ color: Black, fontFamily: PoppinsRegular }}
        dropDownContainerStyle={{ borderWidth: null }}
        searchContainerStyle={{ backgroundColor: LightGrey }}
        mode="BADGE"
        badgeStyle={{}}
        schema={{
          label: 'username',
          value: 'id',
        }}
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
      />
    </View>
  );
};

export default DropdownComponent;
