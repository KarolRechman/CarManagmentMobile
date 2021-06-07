import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

class Item extends React.Component {
  render() {
    const { item, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.item, styles.shadow, style]}>
        <TouchableWithoutFeedback>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: item.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.itemDescription}>
            <Text size={18} style={styles.itemTitle}>{item.title}</Text>
            <Text size={26} muted={!priceColor} color={priceColor}>{item.desc}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Item);

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  itemTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  itemDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});