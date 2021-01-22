///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import React, { useState } from "react";

import rawAnimalData from "../../data/creaturekind/animals-detailed.json";
import { validAnimalData, getRandomFromList } from "./data-reader";

import { List, ListCategory } from "../../data/types";

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                             SETUP
type TreeOfLifeSettingsProps = {};
type TreeOfLifeSettingsState = {
  keysForExcludingWholeBranch: string[],
  keysForExcludingMembers: string[],
  specificMembersExcluded: string[],
  list: List
};

type TreeNodeProps = {
  animalCategory: ListCategory;
  thisNodeKey: string;
  parentNodeKeys: string[];
};

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                COMPONENTS & LOGIC

class TreeOfLifeSettings extends React.Component<TreeOfLifeSettingsProps, TreeOfLifeSettingsState> {
  state: TreeOfLifeSettingsState = {
    keysForExcludingWholeBranch: [],
    keysForExcludingMembers: [],
    specificMembersExcluded: [],
    list: rawAnimalData as List
  }

  // computeList() {}

  render() {
    console.log(this.state.list)
    console.log(validAnimalData)
    return (
      <div>
        <TreeOfLifeDisplay />
      </div>
    )
  }
}

const TreeOfLifeDisplay = () => {
  const animalDataAsList = rawAnimalData as List;
  const validAnimalGroupKeys = Object.keys(animalDataAsList).filter((animalGroupName) => animalDataAsList[animalGroupName].groupName !== undefined);

  // console.log(validAnimalGroupKeys.map(key => animalDataAsList[key]));
  // console.log(animalDataAsList)

  return (
    <div>
      {
        validAnimalGroupKeys.map((key: string, index: number) => {
          return (
            <div key={index}>
              {/* i'm a base group */}
              <TreeNode 
                animalCategory={animalDataAsList[key]}
                thisNodeKey={key}
                parentNodeKeys={[]}
              />
            </div>
          )
        })
      }
    </div>
  );
}

// recursive
const TreeNode: React.FC<TreeNodeProps> = ({animalCategory, thisNodeKey, parentNodeKeys}) => {
  // console.log(`my name is ${thisNodeKey}. my parentNodeKeys are:`)
  // console.log(parentNodeKeys)
  // console.log()
  // console.log(animalCategory)

  const [visible, setVisible] = useState<boolean>(true);
  const toggleVisibility = () => {visible ? setVisible(false) : setVisible(true)};

  const groupName = animalCategory.groupName || "";
  const subcategoriesObj = animalCategory.subcategories;
  const specificMembers = animalCategory.specific;

  return (
    <div style={{"marginLeft": "16px"}}>
      <p> groupName: {groupName} </p>

      <button onClick={toggleVisibility}>
        toggle children visibility
      </button>

      <div
        style={{
          "width": "50%",
          "maxHeight": "120px",
          "overflowY": "scroll"
        }}
      >
        {
          specificMembers ? specificMembers.map((specificMember: string, index: number) => (
            <p key={index}>
              {specificMember}
            </p>
          )) : <></>
        }
      </div>
        {
          subcategoriesObj ? Object.keys(subcategoriesObj).map((subcategoryKey: string, index: number) => (
            <TreeNode 
              key={index}
              animalCategory={subcategoriesObj[subcategoryKey]}
              thisNodeKey={subcategoryKey}
              parentNodeKeys={[...parentNodeKeys, thisNodeKey]}
            />
          ))
          : <></>
        }
      
    </div>
  )
}

export default TreeOfLifeSettings;