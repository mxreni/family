const tree = [
  {
    id: 0,
    name: "sybil",
    partner: "flkdsflkdsjf",
    parent: null,
    children: [1],
    depth: 0,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },

tree.map((s)=> {
  s[id] = {
    ...s, 
    children : [ Object.entries(state.tree).map((s)=>{
      s.parent === 0 
    })]
  }
})
  {
    id: 1,
    name: "leader2",
    partner: "",
    parent: 0,
    depth: 1,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
  {
    id: 2,
    name: "something",
    partner: "",
    parent: 0,
    depth: 1,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
  {
    id: 3,
    name: "something",
    partner: "",
    parent: 0,
    depth: 1,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
  {
    id: 4,
    name: "something",
    partner: "",
    parent: 0,
    depth: 1,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
  {
    id: 5,
    name: "something-5",
    partner: "",
    parent: 1,
    depth: 2,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
  {
    id: 6,
    name: "something",
    partner: "",
    parent: 5,
    depth: 3,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
  {
    id: 7,
    name: "something",
    partner: "",
    parent: 6,
    depth: 4,
    createdAt: "2021-04-07T15: 13: 04.000Z",
    updatedAt: "2021-04-07T15: 13: 05.000Z",
  },
];
const reducefn = (arr) => {
  const s = arr.map((a) => ({ ...a, children: [] }));
  arr.forEach((a) => {
    if (a.parent !== null) {
      s[a.parent].children.push(a.id);
    }
  });
};

reducefn(tree);



const treestructure2 = {
  0: {
    id : 1, 
    name : 'sample',
    patner:  'sample2',
    left: 1, 
    right : 2 
  },
// to add children left+1 , left+2 when no child and parent right and all others with 2 
  1: {
    id: 2, 
    name:'smapplechild',
    partner: 'samplechild',
    left: parent.left + 1 , 
    right : parent.left+2 
  },
  // 1 2 3 4 
  // to insert a parent 
  2: {
      id: 3, 
      name : 'sample parent',
      partner: 'sample parent',
      left : parent.left, 
      right : parent.right + 2 
      // all others with 2 
  },
  // add a sibling  
  3: {
    id : 4 , 
    name :'sample sibling',
    patner: 'fdsfdsf',
    left: previous.right + 1 , 
    right :previous 
  }
  // 1 2 3 4 5 6  
}



