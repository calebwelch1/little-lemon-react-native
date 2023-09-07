import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils';
import grilledFish from '../assets/grilledFish.jpg'

const API_URL =
'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
  // 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const sections = ['Appetizers', 'Salads', 'Beverages'];

const Item = ({ title, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}</Text>
  </View>
);

export default function Menu() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async() => {
    // 1. Implement this function
    console.log('fetching')
    try {
      const response = await fetch(API_URL);
      
      const json = await response.json();

      let before = json.menu;

      console.log(before);
      const menuItems = before.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      console.log('after', menuItems);
      // const menuItems = before.map((item) => {
      //   item.key = item.category.title;
      //   delete item["category"];
      //   return item;
      // });

      return menuItems;

    } catch (e) {
      console.log(e);
    }
    // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
    // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
    // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
    // console.log('after', after);
    return [];
  }

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        // console.log('menu items when retrieved from database:', menuItems);
        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        console.log('before fetch');
        if (!menuItems.length) {
          let menuItems = await fetchData();
          const transformedData = menuItems.map(item => ({
            category: item.category,
            description: item.description,
            id: item.id,
            image: item.image,
            name: item.name,
            price: item.price
          }));
          saveMenuItems(transformedData);
        }
        menuItems = await fetchData();
        const transformedData = menuItems.map(item => ({
          category: item.category,
          description: item.description,
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price
        }));
        console.log('this is menu before save:', transformedData);
        saveMenuItems(transformedData);

        // const sectionListData = getSectionListData(menuItems);
        // console.log('SectionlistData--------', sectionListData[3].data);
        // setData(sectionListData);
        setData(transformedData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  // useUpdateEffect(() => {
  //   (async () => {
  //     const activeCategories = sections.filter((s, i) => {
  //       // If all filters are deselected, all categories are active
  //       if (filterSelections.every((item) => item === false)) {
  //         return true;
  //       }
  //       return filterSelections[i];
  //     });
  //     try {
  //       const menuItems = await filterByQueryAndCategories(
  //         query,
  //         activeCategories
  //       );
  //       const sectionListData = getSectionListData(menuItems);
  //       setData(sectionListData);
  //     } catch (e) {
  //       Alert.alert(e.message);
  //     }
  //   })();
  // }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  const MenuItem = ({ item }) => {
    return (
      <View style={styles.menuItemContainer}>
        <View style={styles.menuItemInfo}>
          {/* <Text style={styles.title}>{JSON.stringify(item)}</Text> */}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
        </View>
        <Image source={item.image.replace(/^"(.*)"$/, '$1').replace(/\.[^/.]+$/, '')} style={styles.image} />
        {/* <Image source={require(`../assets/${item.image}`)} style={styles.image} /> */}
        {/* const imageNameWithoutExtension = imageName.replace(/\.[^/.]+$/, ""); */}
        {/* <Text>{item.image.replace(/\.[^/.]+$/, "")}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: 'white' }}
        elevation={0}
      /> */}
      {/* <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      /> */}
      {/* <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item title={item.title} price={item.price} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      /> */}
         <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MenuItem item={item} />}
      />
      {/* <View><Text>{[data]}</Text></View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#495E57',
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  menuItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  menuItemInfo: {
    flex: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: '20%',
    marginLeft: 10,
  },
});
