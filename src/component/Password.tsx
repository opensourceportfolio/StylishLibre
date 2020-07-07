import * as React from "react";
import { Icon, Input, InputProps } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "react-native";

const AlertIcon = () => <Icon name="alert-circle-outline" />;

const renderIcon = (
  toggleSecureEntry: () => void,
  secureTextEntry: boolean
) => (
  <TouchableWithoutFeedback onPress={toggleSecureEntry}>
    <Icon name={secureTextEntry ? "eye-off" : "eye"} />
  </TouchableWithoutFeedback>
);

export default function Password(props: InputProps) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Input
      accessoryRight={() => renderIcon(toggleSecureEntry, secureTextEntry)}
      caption={props.caption}
      captionIcon={AlertIcon}
      onChangeText={props.onChangeText}
      placeholder="Password"
      secureTextEntry={secureTextEntry}
      style={props.style}
      value={props.value}
    />
  );
}
