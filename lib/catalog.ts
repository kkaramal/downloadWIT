export type Lesson = {
  id: string;
  title: string;
  assetId: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export const COURSE_MODULES: Module[] = [
  {
    id: "module-0",
    title: "Introduction To The Course",
    lessons: [
      {
        id: "1",
        title: "Welcome! Introduction To The Course",
        assetId: "ast_113a4e3a65a1499d99ab3c4c7bbefec8",
      },
    ],
  },
  {
    id: "module-1",
    title: "Chapter 1: Islam is True",
    lessons: [
      {
        id: "2",
        title: "Discovery video 1.1",
        assetId: "ast_65b07f5bb5f7401faedd6242a3c5af86",
      },
      {
        id: "3",
        title: "What You Will Learn In This Module",
        assetId: "ast_a41978db557a447790210165d447170a",
      },
      {
        id: "4",
        title: "The Value of Evidence-Based Religious Belief",
        assetId: "ast_0449ccead0fa41d98f316389a1d0259e",
      },
      {
        id: "5",
        title: "Facts And Preferences",
        assetId: "ast_e7271b0be8f54283a79f1c0a629c5a72",
      },
      {
        id: "6",
        title: "Rejecting The Atheist Faith Frame",
        assetId: "ast_c0fc453a48804f0da07d24cd3214298a",
      },
      {
        id: "7",
        title: "What Do We Mean By Islam? (A)",
        assetId: "ast_16446542e29c43dcaabd9df5f1f299b7",
      },
      {
        id: "8",
        title: "The Definition Of Islam (B)",
        assetId: "ast_3bb75a127a464fc38096adb12484b157",
      },
    ],
  },
  {
    id: "module-2",
    title: "Chapter 2: Who is God?",
    lessons: [
      {
        id: "9",
        title: "How To Answer A Common Atheist Objection",
        assetId: "ast_9b0b6882f5b84d9e948f9431b05832d9",
      },
      {
        id: "10",
        title: "God's Existence",
        assetId: "ast_4a4d5b9ff4f24ccda32ddd8a8af301e6",
      },
      {
        id: "11",
        title: "God's Privative Attributes",
        assetId: "ast_1b5a100248574f159549a310073e9121",
      },
      {
        id: "12",
        title: "God's Volitional Agency",
        assetId: "ast_7d5550af5225412bbd6f2776fb989a46",
      },
      {
        id: "13",
        title: "God's Hearing, Sight, and Speech",
        assetId: "ast_5152bf0123524cd9ba56da6fae399f83",
      },
      {
        id: "14",
        title: "Atheism, Christianity, and Islam",
        assetId: "ast_a9f7d94d6f124dbd83c98828008e7e46",
      },
    ],
  },
  {
    id: "module-3",
    title: "Chapter 3: God Exists",
    lessons: [
      {
        id: "15",
        title: "The Universe Is Contingent And God Is Necessary",
        assetId: "ast_8bc340e00e554f11b62e6ef142eb033d",
      },
      {
        id: "16",
        title: "The Argument From Contingency",
        assetId: "ast_237e931b0fb141c7af68427e29fc13c0",
      },
      {
        id: "17",
        title: "The Argument From Contingency In The Quran",
        assetId: "ast_0cad756f5720484d8ff38f00a38ab617",
      },
      {
        id: "18",
        title: "We Just Proved The First Fact About God",
        assetId: "ast_a3a799238b1e4bbd821a0257e50acdcb",
      },
      {
        id: "19",
        title:
          "Discovery Video: Discover the Contingency Argument in the Quran",
        assetId: "ast_e0a12e48c0cd465891e611f97e923535",
      },
    ],
  },
  {
    id: "module-4",
    title: "Chapter 4: Science and God",
    lessons: [
      {
        id: "20",
        title: "Your Smartphone Is Contingent",
        assetId: "ast_85c0465f15514d648e7bfac0d6a9234c",
      },
      {
        id: "21",
        title: "Pavlov's Dogs",
        assetId: "ast_c7cfed46bacf42d0b8a8617db7207b64",
      },
      {
        id: "22",
        title: "What is Science? What are Laws of Nature?",
        assetId: "ast_c947aa99d27a411b8a043ab695a0f6ef",
      },
      {
        id: "23",
        title: "Three Worldviews",
        assetId: "ast_2b5e8d308b3a4d2fb62a1c8e965d71af",
      },
      {
        id: "24",
        title: "Reconditioning Ourselves Through The Remembrance Of God",
        assetId: "ast_375284f44f02402e9cd78bcf28121fc1",
      },
    ],
  },
  {
    id: "module-5",
    title: "Chapter 5: The Big Bang and the Kalam Cosmological Argument",
    lessons: [
      {
        id: "25",
        title: "Happy Birthday Universe! How Old Are You?",
        assetId: "ast_9f7e754dc5de4b3d90b6d71b57255190",
      },
      {
        id: "26",
        title: "Scientific Discovery Of The Big Bang",
        assetId: "ast_ce855d82e0614429a47c6735b4c2a31c",
      },
      {
        id: "27",
        title: "The Big Bang, Science, And Materialism",
        assetId: "ast_501792cee4374cc8a7af1e414ef7ea51",
      },
      {
        id: "28",
        title:
          "The Kalam Cosmological Argument (And Its Relation To The Quranic Contingency Argument)",
        assetId: "ast_b8a41338eff744359f790d799ec6285c",
      },
      {
        id: "29",
        title: "What Does This Hadith Mean?",
        assetId: "ast_79a52cfbb95546bf8c9655eb7eb92a27",
      },
      {
        id: "30",
        title: "We Just Proved The Second Fact About God",
        assetId: "ast_b9cc016f9afd4a5aabcd82e72d3cc405",
      },
    ],
  },
  {
    id: "module-6",
    title: "Chapter 6: Materialism is False",
    lessons: [
      {
        id: "31",
        title: "What Is Materialism?",
        assetId: "ast_44d1c15c5d124c919b3b18d7ec8e8367",
      },
      {
        id: "32",
        title: "God Exists And He Is Not A Physical Object",
        assetId: "ast_2ad8b40cd9ab4a7c93af14da3ac5cedc",
      },
      {
        id: "33",
        title: "The Second Worldview Is Based On Materialism",
        assetId: "ast_198e2bce743a4d7d885de794e4c1a9c5",
      },
    ],
  },
  {
    id: "module-7",
    title: "Chapter 7: God's Agency and the Argument From Design",
    lessons: [
      {
        id: "34",
        title: "We Don't Need Design To Prove That God Exists",
        assetId: "ast_af1c8e715c0c4df8a1f2ef08191842bf",
      },
      {
        id: "35",
        title: "Causation Vs Agency",
        assetId: "ast_c947eec4158540a894dd8af505680af0",
      },
      {
        id: "36",
        title: "Variety Proves That The Necessary Being Is An Agent",
        assetId: "ast_45845ea3feec44fdb403d59144b970eb",
      },
      {
        id: "37",
        title: "Design Proves That The Necessary Being Is An Agent",
        assetId: "ast_1b20f0090da24b0ab5182809a4ea2c09",
      },
      {
        id: "38",
        title: "The Atheist Design Trap",
        assetId: "ast_66530c5360d14f36babe012159461bcb",
      },
      {
        id: "39",
        title: "Who Designed The Designer?",
        assetId: "ast_bc2dd25afef7458eaead53ae4ec3f9a0",
      },
      {
        id: "40",
        title: "Why Evolution Is A Problem For Christians",
        assetId: "ast_583728a3e1ec4c66a390db91db7238d1",
      },
      {
        id: "41",
        title: "Discovery Video - Discover the Design Argument in the Quran",
        assetId: "ast_d546dde2cf2e4269b8c1711193f4ab21",
      },
    ],
  },
  {
    id: "module-8",
    title: "Chapter 8: The Oneness of God",
    lessons: [
      {
        id: "42",
        title: "The Big Picture",
        assetId: "ast_464ff4f5e0de438f8aba88c7480be8dd",
      },
      {
        id: "43",
        title: "The First Argument For God's Oneness (Harmony And Design)",
        assetId: "ast_37151aa163954f6c8a2628a0ca46c052",
      },
      {
        id: "44",
        title: "The Second Argument For God's Oneness (Contingency)",
        assetId: "ast_67cc3eb9e030440e9946db1996c3ce3d",
      },
      {
        id: "45",
        title: "The Argument For Divine Oneness In The Quran",
        assetId: "ast_73c789cfcb934ae1bf9a8f3329fcf444",
      },
      {
        id: "46",
        title: "The Three Worldviews",
        assetId: "ast_bbfa8011d452434492ba1ce122958f7f",
      },
    ],
  },
  {
    id: "module-9",
    title: "Chapter 9: Loaded Questions About God",
    lessons: [
      {
        id: "47",
        title: "Arguments Against The Existence Of God",
        assetId: "ast_797900c4a15d49428766497a5acdc509",
      },
      {
        id: "48",
        title: "The Unmask Strategy",
        assetId: "ast_6e265d6d633c46ddbdb009b02a2b0990",
      },
      {
        id: "49",
        title: "Loaded Questions About God",
        assetId: "ast_73b9bf52d6824095b041641f850bbf33",
      },
      {
        id: "50",
        title: "Can God Create a Rock that He Can't Lift?",
        assetId: "ast_896e4a23465049a9863fcda14255458d",
      },
      {
        id: "51",
        title:
          "Ayat Al Kursi Shows How Rational Arguments Come To Life Through A Spiritual Relationship With God",
        assetId: "ast_c27ea546149947c281e54d2855474af7",
      },
    ],
  },
  {
    id: "module-10",
    title: "Chapter 10: The Problem of Evil",
    lessons: [
      {
        id: "52",
        title: "Pain And Suffering Is Evidence For The Existence Of God",
        assetId: "ast_09d1950802414695b430bbeacd40bb72",
      },
      {
        id: "53",
        title: "The Truth-First Technique",
        assetId: "ast_9521d49203504d009a5d8c8c121f33de",
      },
      {
        id: "54",
        title: "Why Does God Create Suffering?",
        assetId: "ast_7e43fdd44e134e309b578bd9038d6fa0",
      },
      {
        id: "55",
        title: "The Wisdom Of Suffering",
        assetId: "ast_81912365344843bb9fdbbe6d0fe3238f",
      },
    ],
  },
  {
    id: "module-11",
    title: "Chapter 11: The Purpose Of Life",
    lessons: [
      {
        id: "56",
        title: "God Made Everything With A Purpose",
        assetId: "ast_69eddd343f4d48e18bb711fff2b69fb5",
      },
      {
        id: "57",
        title: "What Is A Messenger?",
        assetId: "ast_c3446fee62044ce2bf938c55bd9ec1b4",
      },
      {
        id: "58",
        title: "The Historical Claims Of Other Religions Are Unverifiable",
        assetId: "ast_5bf4401acfab465e9a697851d80b8452",
      },
      {
        id: "59",
        title: "The Central Historical Claims Of Islam Are Mass-Transmitted",
        assetId: "ast_d7c26f003de447e980334712cab7284f",
      },
    ],
  },
  {
    id: "module-12",
    title: "Chapter 12: Miracles",
    lessons: [
      {
        id: "60",
        title: "Causation Isn't Necessary / Miracles Aren't Unscientific",
        assetId: "ast_ad9cd5a315ac45e2b72f817efe59fb86",
      },
      {
        id: "61",
        title: "What Is A Miracle?",
        assetId: "ast_42c11770412a46e78256ad71baf6f71d",
      },
    ],
  },
  {
    id: "module-13",
    title: "Chapter 13: Kinds of Miracles",
    lessons: [
      {
        id: "62",
        title: "Miracles On Their Own Do Not Prove Anything",
        assetId: "ast_88252f1f19de4cdb95558bc33c8ee944",
      },
      {
        id: "63",
        title: "Prophetic Miracles",
        assetId: "ast_c041c6ab6a88480caad5e65c2a5a66d6",
      },
      {
        id: "64",
        title: "Other Kinds Of Miracles",
        assetId: "ast_d8bca3c7d9e74e64860d34a9d325af20",
      },
    ],
  },
  {
    id: "module-14",
    title: "Chapter 14: The Miracles of the Quran",
    lessons: [
      {
        id: "65",
        title: "How to Prove that Muhammad is God's Messenger",
        assetId: "ast_84e2f829669b4acea0c4501fc37de0b1",
      },
      {
        id: "66",
        title: "Eloquence: The Linguistic Miracle of the Quran",
        assetId: "ast_6e82650133b04f24b1238a732ee32975",
      },
      {
        id: "67",
        title: "Knowledge of the Future: The Predictive Miracle of the Quran",
        assetId: "ast_22301a01e16644dfb5b95f3a015bf2dd",
      },
      {
        id: "68",
        title: "Advanced Knowledge: The Scientific Miracle of the Quran",
        assetId: "ast_246f4a873f24410dad09fd82d4a0ae14",
      },
      {
        id: "69",
        title: "The Expansion of the Universe",
        assetId: "ast_f964ac86e6b841b3ba8be011da910751",
      },
      {
        id: "70",
        title: "Miraculous Knowledge of Embryonic Development",
        assetId: "ast_f6f93a30faad4348b56eff60c2ce0192",
      },
      {
        id: "71",
        title: "Knowledge of the Past: The Historical Miracle of the Quran",
        assetId: "ast_726813ac215646d999b3a3597ff6c5a6",
      },
    ],
  },
  {
    id: "module-15",
    title: "Chapter 15: The Quran Was Taught By God",
    lessons: [
      {
        id: "72",
        title: "A Process of Elimination",
        assetId: "ast_ef97d0e5b2c5470a93d7c666866164cb",
      },
      {
        id: "73",
        title: "The Prophet Muhammad Was Taught the Quran by Someone Else",
        assetId: "ast_52d4cb2f38f84621b7fc3e95f8928099",
      },
    ],
  },
  {
    id: "module-16",
    title: "Chapter 16: Other Prophetic Miracles",
    lessons: [
      {
        id: "74",
        title: "Other Prophetic Miracles",
        assetId: "ast_a643fdac007a441a9744c92c383987ec",
      },
    ],
  },
  {
    id: "module-17",
    title: "Chapter 17: The Prophet Was Not an Impostor",
    lessons: [
      {
        id: "75",
        title: "The Prophet Was Not an Impostor",
        assetId: "ast_26434ae79c334a6a888c6fc75743ad51",
      },
    ],
  },
  {
    id: "module-18",
    title: "Chapter 18: Revelation is a Source of Knowledge",
    lessons: [
      {
        id: "76",
        title: "Revelation is a Source of Knowledge",
        assetId: "ast_49bf1314ca294793824f282ecbc51ffd",
      },
      {
        id: "77",
        title: "God's Hearing, Sight And Speech",
        assetId: "ast_8ce5f14871564e0da26eda587b2bc652",
      },
      {
        id: "78",
        title: "Any Contingent Thing That Revelation Tells Us About is True",
        assetId: "ast_6c300f73118443da8032d1ff68ea8188",
      },
    ],
  },
  {
    id: "module-19",
    title: "Chapter 19: Preparing For Life After Death",
    lessons: [
      {
        id: "79",
        title: "Life After Death Makes Life Meaningful",
        assetId: "ast_1a46194b35f14b8fa1c8aaa335cc473a",
      },
      {
        id: "80",
        title: "We Have Five Lives",
        assetId: "ast_473a7648f55f4b46b86b3eb99087b8fe",
      },
      {
        id: "81",
        title: "Our Moral Responsibility",
        assetId: "ast_38895490df534ffe8e1b9e47745148bd",
      },
      {
        id: "82",
        title: "Good And Bad Deeds",
        assetId: "ast_d746a837afaa4da2b62106cdb57f6f59",
      },
    ],
  },
  {
    id: "module-20",
    title: "Chapter 20",
    lessons: [
      {
        id: "83",
        title: "The Conflict Between Religion And Science",
        assetId: "ast_f5be51fa33464c099576147dbffe98ff",
      },
      {
        id: "84",
        title: "Three Kinds Of Evidence",
        assetId: "ast_19e1b27d80684f128a4496e9f72aaa15",
      },
    ],
  },
];

const LESSONS_BY_ASSET = new Map(
  COURSE_MODULES.flatMap((module) =>
    module.lessons.map((lesson) => [lesson.assetId, lesson] as const),
  ),
);

export function findLessonByAssetId(assetId: string): Lesson | undefined {
  return LESSONS_BY_ASSET.get(assetId);
}

export function isCatalogAssetId(assetId: string): boolean {
  return LESSONS_BY_ASSET.has(assetId);
}
