import { useRef, useEffect } from 'react';

export const SECTION_LIST_MOCK_DATA = [
    {
      title: 'Appetizers',
      data: [
        {
          id: '1',
          title: 'Pasta',
          price: '10',
        },
        {
          id: '3',
          title: 'Pizza',
          price: '8',
        },
      ],
    },
    {
      title: 'Salads',
      data: [
        {
          id: '2',
          title: 'Caesar',
          price: '2',
        },
        {
          id: '4',
          title: 'Greek',
          price: '3',
        },
      ],
    },
  ];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
// export function getSectionListData(data) {
//   console.log('in sectionlist', data);
//   let SECTION_LIST_DATA = [];
//   for (item of data) {
//     // if (!item.category)
//   SECTION_LIST_DATA.push(item.category);

//   }
//   // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
//   // The title of each section should be the category.
//   // The data property should contain an array of menu items. 
//   // Each item has the following properties: "id", "title" and "price"
//   return SECTION_LIST_MOCK_DATA;
// }

// export function getSectionListData(menuItems) {
//   const SECTION_LIST_DATA = [];

//   // Create a map to group items by category
//   const itemsByCategory = new Map();

//   for (const item of menuItems) {
//     if (!itemsByCategory.has(item.category)) {
//       itemsByCategory.set(item.category, []);
//     }
//     itemsByCategory.get(item.category).push(item);
//   }

//   // Convert the map to the desired format
//   let idCounter = 1;

//   for (const [category, items] of itemsByCategory) {
//     SECTION_LIST_DATA.push({
//       id: idCounter++,
//       title: category,
//       data: items,
//     });
//     // console.log(category, items);
//   }
//   // console.log('transformed section data', SECTION_LIST_DATA);
//   return SECTION_LIST_DATA;
// }

export function getSectionListData(data) {
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      id: curr.id,
      title: curr.title,
      price: curr.price,
    };
    if (!Array.isArray(acc[curr.category])) {
      acc[curr.category] = [menuItem];
    } else {
      acc[curr.category].push(menuItem);
    }
    return acc;
  }, {});
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
