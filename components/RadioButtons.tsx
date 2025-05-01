import { TouchableOpacity, View, Text } from "react-native";

interface RadioButtonsProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

// dark purple - 6B5FF0
// light purple - D5D3F8
// dark gray - 5D6371
// light gray - E5E5E7
export default function RadioButtons({options, selectedOption, onSelect}: RadioButtonsProps) {

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8}}>
      {options.map((option, index) => (
        <View 
          style={[
            { backgroundColor: '#E5E5E7', borderRadius: 20, },
            selectedOption === option && {backgroundColor: '#D5D3F8'}
            // selectedOption === option && {borderColor: 'rgba(57, 255, 20, 1)', borderWidth: 1}
          ]}
          key={index}
        >
          <TouchableOpacity onPress={() => onSelect(option)} style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <Text style={[
              { color: "#5D6371", fontSize: 14, fontWeight: 700},
              selectedOption === option && {color: '#6B5FF0'}
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

