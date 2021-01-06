///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import React, { useState } from "react";

import rawAnimalData from "../../data/creaturekind/animals.json";

import { List, ListCategory } from "../../data/types";

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                             SETUP

type TreeNodeProps = {
  animalCategory: ListCategory;
  treeDepth: number;
}

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                COMPONENTS & LOGIC

const TreeOfLife = () => {
  const animalDataAsList = rawAnimalData as List;
  const validAnimalGroupKeys = Object.keys(animalDataAsList).filter((animalGroupName) => animalDataAsList[animalGroupName].groupName !== undefined);

  const listOfAnimalCategories: ListCategory[] = validAnimalGroupKeys.map((key: string) => animalDataAsList[key]);

  console.log(listOfAnimalCategories);

  return (
    <div>
      {
        listOfAnimalCategories.map((animalCategory: ListCategory, index: number) => {
          return (
            <div key={index}>
              {/* i'm a base group */}
              <TreeNode 
                animalCategory={animalCategory} 
                treeDepth={1}
              />
            </div>
          )
        })
      }
    </div>
  );
}

const TreeNode: React.FC<TreeNodeProps> = ({animalCategory, treeDepth}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const toggleVisibility = () => {visible ? setVisible(false) : setVisible(true)};

  const groupName = animalCategory.groupName || "";
  const subcategoriesObj = animalCategory.subcategories;
  const specificMembers = animalCategory.specific;
  const childTreeDepth: number = treeDepth + 1;

  return (
    <div style={{"marginLeft": "16px"}}>
      <p> groupName: {groupName} </p>

      <button
        onClick={toggleVisibility}
      >
        toggle specific members
      </button>

      <div
        style={{
          "overflow": "hidden",
          "height": visible ? "auto" : "0px"
        }}
      >
        {
          specificMembers ? specificMembers.map((specificMember: string, index: number) => (
            <p key={index}>
              {specificMember}
            </p>
          )) : <></>
        }

        {
          subcategoriesObj ? Object.keys(subcategoriesObj).map((subcategoryKey: string, index: number) => (
            <TreeNode 
              key={index}
              animalCategory={subcategoriesObj[subcategoryKey]}
              treeDepth={childTreeDepth}
            />
          ))
          : <></>
        }
      </div>
    </div>
  )
}

export default TreeOfLife;