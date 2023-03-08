import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { colors } from '../assets/Themes/colors';

const SelectableChips = ({ options, icons, selectedKey, onSelect, keys }) => {
  const [disabledKeys, setDisabledKeys] = useState([]);

  const handleSelect = (key) => {
    onSelect(key);
    setDisabledKeys([key]);
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {options.map((option, index) => (
        <Chip
          key={keys[index]}
          mode={selectedKey === keys[index] ? 'contained' : 'outlined'}
          onPress={() => handleSelect(keys[index])}
          disabled={disabledKeys.includes(keys[index])}
          style={{ margin: 4, backgroundColor: selectedKey === keys[index] ? colors.chipselected : colors.chipbackground, borderColor: colors.chipborder }}
            theme={{ colors: { primary: selectedKey === keys[index] ? "#fff" : colors.chipicon } }}
            textStyle={{ color: selectedKey === keys[index] ? colors.chipbackground : colors.chiptext }}
          icon = {icons[index]}
        >
            {option}
        </Chip>
      ))}
    </View>
  );
};

export default SelectableChips;