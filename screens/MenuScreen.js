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
  Image
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
import { getSectionListData, useUpdateEffect } from '../utils/utils';

const API_URL =
'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
  // 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const sections = ['starters', 'mains', 'dessserts'];

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

  // const fetchData = async() => {
  //   // 1. Implement this function
  //   console.log('fetching')
  //   try {
  //     const response = await fetch(API_URL);
      
  //     const json = await response.json();

  //     let before = json.menu;

  //     console.log(before);
  //     const menuItems = before.map((item, index) => ({
  //       ...item,
  //       id: index + 1,
  //     }));
  //     console.log('after', menuItems);
  //     // const menuItems = before.map((item) => {
  //     //   item.key = item.category.title;
  //     //   delete item["category"];
  //     //   return item;
  //     // });

  //     return menuItems;

  //   } catch (e) {
  //     console.log(e);
  //   }
  //   // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
  //   // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
  //   // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
  //   // console.log('after', after);
  //   return [];
  // }

  

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const menu = json.menu.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }));
      return menu;
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    (async () => {
      let menuItems = [];
      try {
        await createTable();
        menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        await console.log('sectiondata:', sectionListData);
        setData(sectionListData);
        // const getProfile = await AsyncStorage.getItem("profile");
        // setProfile(JSON.parse(getProfile));
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  // useUpdateEffect(() => {
  //   (async () => {
  //     const activeCategories = sections.filter((s, i) => {
  //       if (filterSelections.every(item => item === false)) {
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

  // const lookup = useCallback(q => {
  //   setQuery(q);
  // }, []);

  // const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every(item => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback(q => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

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

  // const lookup = useCallback((q) => {
  //   setQuery(q);
  // }, []);

  // const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  const Item = ({ name, price, description, image }) => (
    <View style={styles.item}>
      <View style={styles.itemBody}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
        {/* <Text style={styles.price}>${image}</Text> */}
      </View>
      <Image
        style={styles.itemImage}
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`
        }}
      />
    </View>
  );

  // const MenuItem = async ({ item }) => {
    
  //   // let foodImage = ''
  //   // switch (item.image) {
  //   //   case 'pasta.jpg':
  //   //     foodImage = './pasta.jpg'
  //   //     break;
  //   //   case 'greekSalad.jpg':
  //   //     foodImage = './greekSalad.jpg'
  //   //     break;
  //   //   case 'bruschetta.jpg':
  //   //     foodImage = './bruschetta.jpg'
  //   //     break;
  //   //   case 'lemonDessert.jpg':
  //   //     foodImage = './lemmonDessert.jpg'
  //   //     break;
  //   //   case 'grilledFish.jpg':
  //   //     foodImage = './grilledFish.jpg'
  //   //     break;
  //   //   default:
  //   //     foodImage = './pasta.jpg'
  //   // }
  //   // let IMAGE_URL = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`
  //   // let foodImage = await fetch(IMAGE_URL);
  //   // let foodImage = ''
  //   return (
  //     <View style={styles.menuItemContainer}>
  //       <View style={styles.menuItemInfo}>
  //         {/* <Text style={styles.title}>{JSON.stringify(item)}</Text> */}
  //         <Text style={styles.title}>{item.name}</Text>
  //         <Text style={styles.description}>{item.description}</Text>
  //         <Text style={styles.price}>Price: ${item.price}</Text>
  //       </View>
  //       {/* <Image source={foodImage} />
  //        */}
  //         <Image
  //     style={styles.itemImage}
  //     source={{
  //       uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
  //     }}
  //   />
  //       {/* const imageNameWithoutExtension = imageName.replace(/\.[^/.]+$/, ""); */}
  //       {/* <Text>{foodImage}</Text> */}
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.heroSection}>
        <Text style={styles.heroHeader}>Little Lemon</Text>
        <View style={styles.heroBody}>
          <View style={styles.heroContent}>
            <Text style={styles.heroHeader2}>Chicago</Text>
            <Text style={styles.heroText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            style={styles.heroImage}
            source={require("../assets/grilledFish.jpg")}
            accessible={true}
            accessibilityLabel={"Little Lemon Food"}
          />
        </View>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#333333"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="#333333"
          inputStyle={{ color: "#333333" }}
          elevation={0}
        />
         </View>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
          )}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.itemHeader}>{name}</Text>
          )}
        />
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
  heroSection: {
    backgroundColor: "#495e57",
    padding: 15,
  },
  heroHeader: {
    color: "#f4ce14",
    fontSize: 54,
    fontFamily: "MarkaziText-Medium",
  },
  heroHeader2: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "MarkaziText-Medium",
  },
  heroText: {
    color: "#fff",
    fontFamily: "Karla-Medium",
    fontSize: 14,
  },
  heroBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroContent: {
    flex: 1,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
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
    paddingRight: 5,
    maxWidth: '80%',
    minWidth: '80%',
    flex: 70,
  },
  price: {
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: '90%',
    height: '90%',
    marginLeft: 10,
  },
  itemHeader: {
    fontSize: 26,
    paddingVertical: 8,
    color: "#495e57",
    backgroundColor: "#fff",
  },
  itemImage: {
    marginRight: 20,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
