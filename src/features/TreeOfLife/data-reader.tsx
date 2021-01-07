///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import rawAnimalData from "../../data/creaturekind/animals.json";

import { List, ListCategory } from "../../data/types";

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                             SETUP

type ComputeListExceptionsConfigType = {
  keysForExcludingWholeBranch: string[];
  keysForExcludingMembers: string[];
  specificMembersExcluded: string[];
}

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                COMPONENTS & LOGIC

export const eliminateInvalidFirstLevelNodes = (rawAnimalData: List) => {
  const invalidFirstLevelNodes = Object.keys(rawAnimalData).filter((key: string) => rawAnimalData[key].groupName === undefined);
  const validAnimalData = Object.assign(rawAnimalData);
  for (const invalidNodeKey of invalidFirstLevelNodes) {
    delete validAnimalData[invalidNodeKey];
  }
  return validAnimalData;
};

export const computeList = (animalData: List, computeListExceptions: ComputeListExceptionsConfigType) => {
  const validAnimalData = eliminateInvalidFirstLevelNodes(animalData);
  const returnList: string[] = [];
  const animalDataKeys = Object.keys(validAnimalData);
  
  const {keysForExcludingMembers,keysForExcludingWholeBranch,specificMembersExcluded} = computeListExceptions;
  const exceptions = keysForExcludingMembers.concat(keysForExcludingWholeBranch, specificMembersExcluded);

  for (const key of animalDataKeys) {
    returnList.push(...( unpackAndReduce([], key, validAnimalData[key], exceptions) ));
  }
  return returnList;
}

const unpackAndReduce = (
  returnArray: string[],
  currentKey: string,
  listCategory: ListCategory,
  exceptions: string[]
  ) => {

  if (!exceptions.includes(currentKey)) {
    // does object have groupName? add to returnArray
    if (listCategory.groupName !== undefined) {
      returnArray.push(listCategory.groupName);
    }
    // does object have specific members? add to returnArray
    if (listCategory.specific !== undefined) {
      returnArray.push(...listCategory.specific);
    }
    // does object have subcategories? open those up
    if (listCategory.subcategories !== undefined) {
      for (const key in listCategory.subcategories) {
        returnArray = unpackAndReduce(
          returnArray,
          key,
          listCategory.subcategories[key],
          exceptions
        );
      }
    }
  } 
  return returnArray;
};

const checkThatReducedListIsUnique = (list: string[]) => {
  const duplicates = list.filter((v, i, a) => a.indexOf(v) !== i);
  const thereAreNoDuplicates = duplicates.length === 0;
  return thereAreNoDuplicates ? true : duplicates;
};

const getRandomFromList = (list: string[]) => {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export const validAnimalData = computeList(rawAnimalData, {
  keysForExcludingWholeBranch: [],
  keysForExcludingMembers: [],
  specificMembersExcluded: []
});
