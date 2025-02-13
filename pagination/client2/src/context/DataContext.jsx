import React, { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        // const data = await fetch("https://fakestoreapi.com/products");
        const response = await data.json();
        console.log(response);
       const kake = [
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567890",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "1234567070",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "12345612120",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  {
    "userId": "100000000",
    "userIds": "1234567890",
    "userIds5": "1234567890",
    "userId5": "1234567890",
    "userId55": "1234567890",
    "userId555": "1234567890",
    "userId523": "1234567890",
    "name": {
      "first": "Deepak",
      "last": "Yadav"
    },
    "email": "deepak@gmail.com",
    "address": {
      "street": "123 Main St",
      "city": "Moni",
      "state": "UP",
      "country": "India",
      "geo": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    "contacts": [
      {
        "type": "mobile",
        "number": "+91 9876543210"
      },
      {
        "type": "work",
        "number": "+91 9123456789"
      }
    ],
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": {
          "enabled": true,
          "frequency": "daily"
        }
      },
      "theme": {
        "mode": "dark",
        "contrast": "high"
      }
    },
    "orders": [
      {
        "orderId": "ORD12345",
        "items": [
          {
            "productId": "P1001",
            "name": "Laptop",
            "quantity": 1,
            "price": 75000,
            "seller": {
              "id": "SELL5678",
              "name": "Tech Store",
              "ratings": {
                "average": 4.5,
                "reviews": [
                  {
                    "reviewId": "R1001",
                    "userId": "6789012345",
                    "rating": 5,
                    "comment": "Excellent product!"
                  }
                ]
              }
            }
          }
        ],
        "status": "Shipped",
        "tracking": {
          "carrier": "DHL",
          "trackingId": "DHL56789",
          "estimatedDelivery": "2025-02-15",
          "history": [
            {
              "status": "Dispatched",
              "timestamp": "2025-02-10T10:30:00Z"
            },
            {
              "status": "In Transit",
              "timestamp": "2025-02-11T15:45:00Z"
            }
          ]
        }
      }
    ]
  },
  
]
        setData(response);
        setRows(response);

        // setData(kake);
        // setRows(kake);

        const defaultVisibility =
          response.length > 0
            ? Object.keys(response[0]).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {})
            : {};

        setColumnVisibility(defaultVisibility);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

//   // create table columns on besis of data
//   const columns = data.length > 0 ? Object.keys(data[0]) : [];

  

  // Update headers when columnVisibility changes
  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]);

      const newHeaders = columns.map((key) => ({
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
        sortable: true,
        visible:
          columnVisibility[key] !== undefined ? columnVisibility[key] : true,
      }));

      setHeaders(newHeaders);
    }
  }, [data, columnVisibility]);

  // Function to toggle column visibility
  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));
  };

  // Handle Sorting
  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        rows,
        setRows,
        setRowsPerPage,
        rowsPerPage,
        headers,
        toggleColumnVisibility,
        handleSort,
        sortConfig,
        filteredData,
        setFilteredData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;



