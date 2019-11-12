export default [
  // {
  //   "graph": {
  //     "n": {
  //       "1": { "i": 1, "id": "5dbbf356f18ff7488e9b1096"}
  //     },
  //     "e": [],
  //     "r": []
  //   },
  //   "io": [
  //     {
  //       "input": {"a": 45},
  //       "output": [6]
  //     }
  //   ]
  // },
  {
    "graph": {"n":{"102":{"i":102,"id":"5dbbf356f18ff7488e9b1096"},"103":{"i":103,"id":"5dc1ac9333634f14a7cca672"},"104":{"i":104,"id":"5dca7a5c5427e54a5fe18e83"}},"e":[[102,1,103,2],[103,1,104,1]],"r":["h=>h*9"]},
    "io": [
      {
        "input": {"f1":"h => h*2","arr":[1,2,3,4,5,6],"f2":"h => h > 5"},
        "output": 6
      }
    ]
  },
  {
    "graph": {"n":{"101":{"i":101,"id":"5dc1ac9333634f14a7cca673"},"102":{"i":102,"id":"5dc1ac9333634f14a7cca674"},"103":{"i":103,"id":"5dbd6dee052a148d62eae282"}},"e":[[101,1,102,1],[102,1,103,1]],"r":[]},
    "io": [
      {
        "input": {"a": 4, b: 8, c: 9, d: 4},
        "output": 13,
      }
    ]
  },
  {
    "graph": {"n":{"101":{"i":101,"id":"5dcadec35427e54a5fe18e89"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"separator": "; ", "array": ["some", "interrupted", "sentence"]},
        "output": "some; interrupted; sentence",
      }
    ]
  },
  {
    "graph": {"n":{"102":{"i":102,"id":"5dcadd175427e54a5fe18e88"},"103":{"i":103,"id":"5dcac5c45427e54a5fe18e86"},"105":{"i":105,"id":"5dcaf0cd5427e54a5fe18e8a"}},"e":[[102,1,103,1],[103,1,105,1]],"r":[]},
    "io": [
      {
        "input": {"array1": [2, 6, 4, 8], "array2": [9, 3, 7, 1], "start": 2, "stop": 6},
        "output": [3,4,6,7],
      }
    ]
  },
  {
    "graph": {"n":{"101":{"i":101,"id":"5dbd6dee052a148d62eae282"},"102":{"i":102,"id":"5dc32dbfa047684155dff36d"},"103":{"i":103,"id":"5dcb146d5427e54a5fe18e8d"}},"e":[[103,1,101,1],[102,1,101,2]],"r":[]},
    "io": [
      {
        "input": {"power": 3, "base": 4, "number": 2},
        "output": 62,
      }
    ]
  },
  {
    "graph": {"n":{"101":{"i":101,"id":"5dbd6dee052a148d62eae282"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"a": 3, "b": 4},
        "output": 7,
      }
    ]
  },
  {
    "graph": {"n":{"102":{"i":102,"id":"5dc1ac9333634f14a7cca672"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"function": "i => i > 10", "array": [2,7,3,12,56,8]},
        "output": [12,56],
      }
    ]
  },
  {
    "graph": {"n":{"103":{"i":103,"id":"5dca8b125427e54a5fe18e85"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"function": "i => i %10 === 0", "array": [4,5,20,34,30]},
        "output": 20,
      }
    ]
  },
  {
    "graph": {"n":{"104":{"i":104,"id":"5dcb13895427e54a5fe18e8c"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"minuend": 100, "subtrahend": 75},
        "output": 25,
      }
    ]
  },
  {
    "graph": {"n":{"102":{"i":102,"id":"5dcb146d5427e54a5fe18e8d"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"number": 4},
        "output": -4,
      }
    ]
  },
  {
    "graph": {"n":{"104":{"i":104,"id":"5dca7a5c5427e54a5fe18e83"}},"e":[],"r":[]},
    "io": [
      {
        "input": {"array": [4,8,7,3,9]},
        "output": 3,
      }
    ]
  }
]
