import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import materialTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Dashboard":
        return (
          <Icon
            size={16}
            name="home"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Profile":
        return (
          <Icon
            size={16}
            name="circle-10"
            family="GalioExtra"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
        case "Spendings":
          return (
            <Icon
              size={16}
              name="money"
              family="fontAwsome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          );

      case "Sign Out":
        return (
          <Icon
            size={26}
            name="ios-log-out"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Sign Up":
        return (
          <Icon
            size={16}
            name="md-person-add"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
        case "Spendings Table":
          return (
            <Icon
              size={16}
              name="table-chart"
              family="MaterialIcons"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          );
          case "Avialable Cars":
            return (
              <Icon
                size={16}
                name="car-rental"
                family="MaterialIcons"
                color={focused ? "white" : materialTheme.COLORS.MUTED}
              />
            );
            case "Add / Edit car":
              return (
                <Icon
                  size={16}
                  name="car-sport"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              );
              case "Car list":
              return (
                <Icon
                  size={16}
                  name="format-list-numbered"
                  family="MaterialIcons"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;
    
    return (
      <TouchableOpacity style={{ height: 55 }} onPress={() => {navigation.navigate(title)}}>
        <Block
          flex
          row
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null
          ]}
        >
          <Block middle flex={0.1} style={{ marginRight: 28 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={18}
              color={
                focused
                  ? "white"
                  : "black"
              }
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36
  }
});
