///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import rawAnimalData from "../../data/creaturekind/animals.json";

import { List, ListCategory } from "../../data/types";

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                             SETUP

type ExclusionsConfigType = {
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

export const computeList = (animalData: List, exclusionsConfig: ExclusionsConfigType) => {
  const validAnimalData = eliminateInvalidFirstLevelNodes(animalData);
  const returnList: string[] = [];
  const animalDataKeys = Object.keys(validAnimalData);

  for (const key of animalDataKeys) {
    returnList.push(...( unpackAndReduce([], key, validAnimalData[key], exclusionsConfig) ));
  }
  return returnList;
}

const unpackAndReduce = (
  returnArray: string[],
  currentKey: string,
  listCategory: ListCategory,
  exclusionsConfig: ExclusionsConfigType
  ) => {
  
  const {specificMembersExcluded} = exclusionsConfig;
  const currentKeyIsWholeBranchExcluded = exclusionsConfig.keysForExcludingWholeBranch.includes(currentKey);
  const currentKeyIsSpecificMemberExcluded = exclusionsConfig.keysForExcludingMembers.includes(currentKey);

  if (!currentKeyIsWholeBranchExcluded) {
    // does object have groupName? add to returnArray
    if (listCategory.groupName !== undefined) {
      returnArray.push(listCategory.groupName);
    }
    // does object have specific members? add to returnArray
    if (!currentKeyIsSpecificMemberExcluded && listCategory.specific !== undefined) {
      // add specific members where member is not included in exclusions array
      returnArray.push(...listCategory.specific.filter(creatureName => !specificMembersExcluded.includes(creatureName)));
    }
    // does object have subcategories? open those up
    if (listCategory.subcategories !== undefined) {
      for (const key in listCategory.subcategories) {
        returnArray = unpackAndReduce(
          returnArray,
          key,
          listCategory.subcategories[key],
          exclusionsConfig
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

export const getRandomFromList = (list: string[]) => {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export const validAnimalData = computeList(rawAnimalData, {
  keysForExcludingWholeBranch: [],
  keysForExcludingMembers: [],
  specificMembersExcluded: []
});
