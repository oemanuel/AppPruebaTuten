import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Headline,
  Searchbar,
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
  ActivityIndicator,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {problem3Wait} from '../redux/action';
import moment from 'moment';

const Booking = ({bookings, AccesLogin}) => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    setBook(bookings);
  }, [bookings]);

  const [isID, setIsID] = useState(true);
  const [id, setId] = useState('');
  useEffect(() => {
    if (bookings != null) {
      setBook(
        bookings.filter((item) => item.bookingId.toString().includes(id)),
      );
      if (id == '') {
        setBook(bookings);
      }
    }
  }, [id]);

  const [price, setPrice] = useState('');
  const [filterr, setFilterr] = useState('=');

  useEffect(() => {
    if (bookings != null) {
      switch (filterr) {
        case '=':
          setBook(
            bookings.filter((item) => item.bookingPrice.toString() === price),
          );
          break;
        case '<=':
          setBook(
            bookings.filter((item) => item.bookingPrice.toString() <= price),
          );
          break;
        case '>=':
          setBook(
            bookings.filter((item) => item.bookingPrice.toString() >= price),
          );
          break;
        default:
          setBook(bookings);
          break;
      }
      if (price == '') {
        setBook(bookings);
      }
    }
  }, [price]);

  const renderItem = ({item}) => (
    <Card style={styles.Card}>
      <Card.Content>
        <Title>Booking</Title>
        <Paragraph> BookingId: {item.bookingId}</Paragraph>
        <Paragraph>
          {' '}
          Cliente: {item.locationId.tutenUser.firstName}{' '}
          {item.locationId.tutenUser.lastName}
        </Paragraph>
        <Paragraph>
          Fecha de Creación:
          {moment.unix(item.bookingTime).format('MM/DD/YY')}
        </Paragraph>
        <Paragraph>Dirección: {item.locationId.streetAddress}</Paragraph>
        <Paragraph>Precio: {item.bookingPrice}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.contain}>
      <Searchbar
        placeholder="Search"
        value={isID ? id : price}
        onChangeText={(value) => {
          if (isID) {
            setId(value);
          } else {
            setPrice(value);
          }
        }}
      />
      <View style={styles.fill}>
        <Headline style={{color: 'white'}}>Filters:</Headline>
        <Chip
          selected={isID}
          onPress={() => {
            setIsID(true);
            setPrice('');
          }}>
          Booking Id
        </Chip>
        <Chip
          selected={!isID}
          onPress={() => {
            setIsID(false);
            setId('');
          }}>
          Booking price
        </Chip>
      </View>
      {!isID && (
        <View style={styles.fill}>
          <Chip
            selected={filterr === '<=' ? true : false}
            onPress={() => {
              setFilterr('<=');
            }}>
            {'<='}
          </Chip>
          <Chip
            selected={filterr === '=' ? true : false}
            onPress={() => {
              setFilterr('=');
            }}>
            {'='}
          </Chip>
          <Chip
            selected={filterr === '>=' ? true : false}
            onPress={() => {
              setFilterr('>=');
            }}>
            {'>='}
          </Chip>
        </View>
      )}
      {book == null && (
        <ActivityIndicator
          animating={book == null ? true : false}></ActivityIndicator>
      )}
      <FlatList
        data={book}
        renderItem={renderItem}
        keyExtractor={(item) => item.bookingId.toString()}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: 'black',
    padding: '5%',
  },
  Card: {
    marginVertical: 5,
  },
  fill: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});

const mapStateToProps = (state) => ({
  bookings: state.problem3Reducer.data,
});
const mapDispatchToProps = (dispatch) => {
  return {
    AccesLogin: (payload) => dispatch(problem3Wait(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
