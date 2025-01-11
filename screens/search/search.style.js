import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.small,
    borderColor: COLORS.blue,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  input: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  searchImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 350,
  },
  tile: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});

export default styles;
