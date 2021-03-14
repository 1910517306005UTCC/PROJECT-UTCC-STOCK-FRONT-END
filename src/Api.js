const { v4: uuidv4 } = require('uuid');
export const equipmentApi = [
    {
        name: 'R100K',
        images: [
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        ],
        type: 'SMD',
        category: '1mps',
        size: '1564555',
        total: '25'

    },
    {
        name: 'R1M',
        images: [
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        ],
        type: 'Resister',
        category: '1mps',
        size: '1564554',
        total: '25'

    },
    {
        name: 'IC8001-1',
        images: [
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        ],
        type: 'IC',
        category: '1mps',
        size: '1564556',
        total: '25'

    },
    {
        name: 'IC8001-2',
        images: [
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        ],
        type: 'IC',
        category: '1mps',
        size: '1564557',
        total: '25'

    }
];


export const notificationApi = [
    {
        id: 'u1',
        user: "Hachiman",
        status: "Staff",
        description: "Add new project into database",
        time: "34 minutes",
        profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmlAGm_RRev6Cl83qW-_6VHZpEdXVOBww8Rg&usqp=CAU",
        exp: 1
    },
    {
        id: 'u2',
        user: "Yukino",
        status: "Admin",
        description: "Edit board ET-RS's description",
        time: "34 minutes",
        profile: "https://f.ptcdn.info/083/046/000/odr6r77nnA5k1CdKCJm-o.png",
        exp: 1
    },
    {
        id: 'u21',
        user: "Yukino",
        status: "Admin",
        description: "Edit board ET-RS's description",
        time: "34 minutes",
        profile: "https://f.ptcdn.info/083/046/000/odr6r77nnA5k1CdKCJm-o.png",
        exp: 1
    },
    {
        id: 'u3',
        user: "Yuigahama",
        status: "User",
        description: "requested board ET-RS",
        time: "Mon at 13:15",
        profile: "https://i.pinimg.com/originals/75/a1/72/75a1727c7940f6325fd7b922c913ed2b.jpg",
        exp: 0
    },
    {
        id: 'u4',
        user: "Yuigahama",
        status: "User",
        description: "requested board ET-RS",
        time: "Mon at 13:15",
        profile: "https://i.pinimg.com/originals/75/a1/72/75a1727c7940f6325fd7b922c913ed2b.jpg",
        exp: 0
    },
]


export const filterNotification = (items) => {
    let newData1 = [];
    let oldData1 = [];
    if (items.length > 0) {

        let countNewdata = 0;
        let countOlddata = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].exp === 1) {
                newData1[countNewdata] = items[i]
                countNewdata += 1

            } else {
                oldData1[countOlddata] = items[i]
                countOlddata += 1
            }
        }
    }
    return { newData: newData1, oldData: oldData1 }
}

export const listToolApi = [
    {
        id: uuidv4(),
        toolName: "R10K",
        toolCode: "vdsv15",
        imageProfile: "/images/tool2.jpg",
        status: "2",
        type: "resister",
        size: "CODE_100",
        total: "0",
        category: "SURFACE",
        limit: "1500"
    },
    {
        id: uuidv4(),
        toolName: "C470UF",
        toolCode: "vdsv15",
        imageProfile: "/images/c1.jpg",
        status: "1",
        type: "c",
        size: "CODE_100",
        total: "150",
        category: "SURFACE",
        limit: "100"
    },
    {
        id: uuidv4(),
        toolName: "R560K",
        toolCode: "vdsv15",
        imageProfile: "/images/r2.jpg",
        status: "1",
        type: "resister",
        size: "CODE_105",
        total: "550",
        category: "SURFACE",
        limit: "1500"
    },
    {
        id: uuidv4(),
        toolName: "R120",
        toolCode: "vdsv15",
        imageProfile: "/images/tool2.jpg",
        status: "3",
        type: "resister",
        size: "CODE_107",
        total: "2000",
        category: "SURFACE",
        limit: "1500"
    },
    {
        id: uuidv4(),
        toolName: "LM-2575",
        toolCode: "vdsv15",
        imageProfile: "/images/lm.jpg",
        status: "1",
        type: "Lm",
        size: "CODE_845",
        total: "250",
        category: "SME",
        limit: "300"
    },
    {
        id: uuidv4(),
        toolName: "IC-1",
        toolCode: "vdsv15",
        imageProfile: "/images/ic1.jpg",
        status: "3",
        type: "IC",
        size: "CODE_448",
        total: "17",
        category: "SURFACE",
        limit: "10"


    },
    {
        id: uuidv4(),
        toolName: "IC-2",
        toolCode: "vdsv15",
        imageProfile: "/images/i2.jpg",
        status: "1",
        type: "IC",
        size: "CODE_449",
        total: "17",
        category: "SURFACE",
        limit: "20"
    },
    {
        id: uuidv4(),
        toolName: "IC-3",
        toolCode: "vdsv15",
        imageProfile: "/images/i2.jpg",
        status: "2",
        type: "IC",
        size: "CODE_441",
        total: "0",
        category: "SURFACE",
        limit: "10"
    },
    {
        id: uuidv4(),
        toolName: "Module-WIFI",
        toolCode: "vdsv15",
        imageProfile: "/images/tool1.jpg",
        status: "1",
        type: "Module",
        size: "CODE_170",
        total: "75",
        category: "SURFACE",
        limit: "75"

    },
    {
        id: uuidv4(),
        toolName: "Module-WIFI v.2",
        toolCode: "vdsv15",
        imageProfile: "/images/tool1.jpg",
        status: "3",
        type: "Module",
        size: "CODE_170",
        total: "71",
        category: "SURFACE",
        limit: "75"

    },
    {
        id: uuidv4(),
        toolName: "Module-WIFI v.3",
        toolCode: "vdsv15",
        imageProfile: "/images/tool1.jpg",
        status: "3",
        type: "Module",
        size: "CODE_170",
        total: "79",
        category: "SURFACE",
        limit: "75"
    },
    {
        id: uuidv4(),
        toolName: "R10M",
        toolCode: "vdsv15",
        imageProfile: "https://images.unsplash.com/photo-1615216865517-f2e0c2cd79a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        status: "1",
        type: "resister",
        size: "CODE_100",
        total: "790",
        category: "SURFACE",
        limit: "1500"
    },
    {
        id: uuidv4(),
        toolName: "R22k",
        toolCode: "vdsv15",
        imageProfile: "https://images.unsplash.com/photo-1612611679469-1f2f2da849fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        status: "2",
        type: "resister",
        size: "CODE_100",
        total: "790",
        category: "SURFACE",
        limit: "1500"
    }
]

// export const toolItem = {
//     id: uuidv4(),
//     nameTool: "R10K",
//     imageProfile: "/images/tool2.jpg",
//     images: [
//         { image: "/images/tool2.jpg" },
//         { image: "/images/b2.jpg" },
//         { image: "/images/b1.png" },
//         { image: "/images/b3.jpg" },
//         { image: "/images/detailTool.jpg" }
//     ],
//     status: "Out of Stock",
//     type: "RESISTER",
//     size: "CODE_100",
//     total: "0",
//     category: "SURFACE",
//     description: "this equipment is used for every project"
// }

export const toolItem = {
    id: uuidv4(),
    toolName: "R10K",
    toolCode: "vnsds",
    imageProfile: "/images/tool2.jpg",
    images: [
        "/images/tool2.jpg",
        "/images/b2.jpg",
        "/images/b1.png",
        "/images/b3.jpg",
        "/images/detailTool.jpg"
    ],
    status: "Out of Stock",
    type: "RESISTER",
    size: "CODE_100",
    total: "0",
    limit: "1500",
    category: "SURFACE",
    description: "this equipment is used for every project"
}

export const listBoards = [
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.1",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b2.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.2",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b3.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.3",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b2.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.4",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b3.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.5",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b2.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.6",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b3.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.7",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b2.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-ARDUINO v.8",
        total: "0",
        boardCode: "f5d6gs",
        imageProfile: "/images/b3.jpg",
        images: [
            "/images/b1.png",
            "/images/b2.jpg",
            "/images/b3.jpg",
            "/images/detailTool.jpg"
        ],
        type: "education",
        description: "This board is only used for education.",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                imageProfile: "/images/tool2.jpg",
                status: "Out of Stock",
                type: "RESISTER",
                size: "CODE_100",
                total: "0",
                category: "SURFACE"
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                imageProfile: "/images/lm.jpg",
                status: "In Stock",
                type: "LM",
                size: "CODE_845",
                total: "250",
                category: "SME"

            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                imageProfile: "/images/ic1.jpg",
                status: "Getting out of Stock",
                type: "IC",
                size: "CODE_448",
                total: "17",
                category: "SURFACE"


            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                imageProfile: "/images/tool1.jpg",
                status: "In Stock",
                type: "Module",
                size: "CODE_170",
                total: "75",
                category: "SURFACE"

            }
        ]
    }
]

export const boardItem = {
    id: uuidv4(),
    boardName: "ET-ARDUINO",
    boardCode: "cdscs",
    imageProfile: "/images/b3.jpg",
    images: [
        "/images/b1.png",
        "/images/b2.jpg",
        "/images/b3.jpg",
        "/images/detailTool.jpg"
    ],
    type: "education",
    limit: "50",
    total: "105",
    status: "In Stock",
    description: "This board is only used for education.",
    tools: [
        {
            id: uuidv4(),
            toolName: "R10K",
            imageProfile: "/images/tool2.jpg",
            toolCode: "1235",
            status: "Out of Stock",
            type: "RESISTER",
            size: "CODE_100",
            total: "0",
            category: "SURFACE"
        },
        {
            id: uuidv4(),
            toolName: "LM-2575",
            imageProfile: "/images/lm.jpg",
            toolCode: "1235",
            status: "In Stock",
            type: "LM",
            size: "CODE_845",
            total: "250",
            category: "SME"

        },
        {
            id: uuidv4(),
            toolName: "ic1.jpg",
            imageProfile: "/images/ic1.jpg",
            toolCode: "1235",
            status: "Getting out of Stock",
            type: "IC",
            size: "CODE_448",
            total: "17",
            category: "SURFACE"


        },
        {
            id: uuidv4(),
            toolName: "Module-WIFI",
            imageProfile: "/images/tool1.jpg",
            toolCode: "1235",
            status: "In Stock",
            type: "Module",
            size: "CODE_170",
            total: "75",
            category: "SURFACE"

        }
    ]
}

export const todos = [
    {
        id: uuidv4(),
        name: "Developer",
        header: "Speed-Raider",
        date: '10/12/63 : 17.00',
        status: 'processing',
        deadline: 'Today : 17.00',
        description: 'This is still incomplete..........'
    },
    {
        id: uuidv4(),
        name: "Admin",
        header: "ET-OPPTO",
        date: '12/12/63 : 10.00',
        status: 'wait process',
        deadline: '15/12/63 : 09.00',
        description: 'This is still incomplete..........'
    }
]


export const boardIncompleteList = [
    {
        id: uuidv4(),
        boardName: "ET-OPPTO",
        username: "boonyarit",
        userStatus: "Admin",
        date: "12/12/63",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                total: "10",
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                total: "250",
            },
            {
                id: uuidv4(),
                toolName: "ic1.jpg",
                total: "17",
            },
            {
                id: uuidv4(),
                toolName: "Module-WIFI",
                total: "5",
            }
        ]
    },
    {
        id: uuidv4(),
        boardName: "ET-OPPTO",
        username: "Katagi",
        userStatus: "Admin",
        date: "11/12/63",
        tools: [
            {
                id: uuidv4(),
                toolName: "R10K",
                total: "10",
            },
            {
                id: uuidv4(),
                toolName: "LM-2575",
                total: "250",
            }
        ]
    }
]



