import Icons from "@/components/marketing/flag/icons";
import { degToRad } from "three/src/math/MathUtils.js";

export const TEACHERS: Teacher[] = ["Nanami", "Naoki"];

export const ANIMATION_FADE_TIME = 0.5;

export const CAMERA_POSITION = {
  default: [0, 6.123233995736766e-21, 0.0001] as const,
  loading: [
    0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058,
  ] as const,
  speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279] as const,
};

export const CAMERA_ZOOMS = {
  default: 2,
  loading: 1.3,
  speaking: 2.1204819420055387,
};

export const itemPlacement = {
  default: {
    classroom: {
      position: [0.2, -1.7, -2] as const,
    },
    teacher: {
      position: [-1, -1.7, -3] as const,
      rotation: [0, degToRad(20), 0] as [number, number, number],
    },
    board: {
      position: [0.45, 0.382, -6] as const,
    },
  },
  alternative: {
    classroom: {
      position: [0.3, -1.7, -1.5] as const,
      rotation: [0, degToRad(-90), 0] as [number, number, number],
      scale: 0.4,
    },
    teacher: {
      position: [-1, -1.7, -3] as const,
      rotation: [0, degToRad(20), 0] as [number, number, number],
    },
    board: { position: [1.4, 0.84, -8] as const },
  },
};

export const plans = [
  {
    title: "+50 Credits",
    price: 0,
    credits: 50,
    description: "Get +50 credits for free. No credit card required.",
    actionLabel: "Getting Started",
  },
  {
    title: "+100 Credits",
    price: 500,
    credits: 100,
    description:
      "Experience the convenience of getting +100 credits. Our AI assistant is perfect for casual conversations, language learning, and skill testing. Start your journey today!",
    actionLabel: "Buy Now",
  },
  {
    title: "+500 Credits",
    price: 50000,
    credits: 500,
    description:
      "Get +500 credits for chatting with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",

    actionLabel: "Buy Now",
    popular: true,
  },
];

export const languagesSupport = [
  {
    language: "Indonesia",
    icon: Icons.indonesia,
    description:
      "Learn Indonesian with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
  {
    language: "English",
    icon: Icons.english,
    description:
      "Learn English with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
];

export const upcommingLanguages = [
  {
    language: "Russia",
    icon: Icons.russia,
    description:
      "Learn Russian with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
  {
    language: "Japan",
    icon: Icons.japan,
    description:
      "Learn Japanese with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
  {
    language: "Germany",
    icon: Icons.germany,
    description:
      "Learn German with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
  {
    language: "France",
    icon: Icons.france,
    description:
      "Learn French with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
  {
    language: "Italy",
    icon: Icons.italy,
    description:
      "Learn Italian with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
  {
    language: "Spain",
    icon: Icons.spain,
    description:
      "Learn Spanish with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
  },
];

interface CardProps {
  name: string;
  position: string;
  text: string;
  photoLink: string;
  tweetLink: string;
}

const testimonials1: CardProps[] = [
  {
    name: "Eko Kurniawan Khannedy",
    position: "Software Engineer",
    text: "I've been using Guru AI for a while now, and I'm really impressed with the quality of the conversations and the accuracy of the responses. I've been using it for personal projects and it's been a game changer. Highly recommended!",
    photoLink: "https://avatars.githubusercontent.com/u/17200675?v=4",
    tweetLink: "https://twitter.com/ekokurnia/status/1829780238884207616",
  },
  {
    name: "Reza Maulana",
    position: "Software Developer",
    text: "Guru AI is amazing! I've been using it for language learning and it's been a great help. The conversations are so natural and the responses are so accurate. I can't recommend it enough!",
    photoLink: "https://avatars.githubusercontent.com/u/4098021?v=4",
    tweetLink: "https://twitter.com/reza_maulana/status/1829780238884207616",
  },
  {
    name: "Kelvin S. Kurniawan",
    position: "Software Engineer",
    text: "I've been using Guru AI for a while now and I'm really impressed with the accuracy and fluency of the conversations. It's been a great help for my language learning journey. Highly recommended!",
    photoLink: "https://avatars.githubusercontent.com/u/1608007?v=4",
    tweetLink: "https://twitter.com/kelkurnia/status/1829780238884207616",
  },
  {
    name: "Muhammad Rizqi Haikal",
    position: "Software Engineer",
    text: "Guru AI adalah guru bahasa yang hebat! Saya menggunakan Guru AI untuk belajar bahasa Inggris dan hasilnya sangat memuaskan. Percakapannya terasa sangat alami dan jawabannya sangat tepat. Saya sangat merekomendasikannya!",
    photoLink: "https://avatars.githubusercontent.com/u/340040?v=4",
    tweetLink: "https://twitter.com/rizqihaikal/status/1829780238884207616",
  },
  {
    name: "Rizki Hariyanto",
    position: "Pelajar",
    text: "Guru AI benar-benar mengesankan! Saya telah memakainya untuk belajar bahasa dan sangat terbantu. Pesan-pesan yang diberikan terasa sangat alami dan responsnya sangat tepat. Saya sangat merekomendasikannya!",
    photoLink: "https://avatars.githubusercontent.com/u/2742000?v=4",
    tweetLink: "https://twitter.com/rizkix/status/1829780238884207616",
  },
  {
    name: "Ahmad Fakhri",
    position: "Web Developer",
    text: "Saya telah mencoba Guru AI untuk belajar bahasa dan sangat puas dengan hasilnya. Percakapannya terasa sangat alami dan responsnya sangat tepat. Saya benar-benar merekomendasikannya!",
    photoLink: "https://avatars.githubusercontent.com/u/1600974?v=4",
    tweetLink: "https://twitter.com/ahmadfakhri/status/1829780238884207616",
  },
  {
    name: "Rizki Pratama",
    position: "Pelajar",
    text: "Saya pakai Guru AI buat belajar bahasa dan ternyata keren banget! Percakapannya berasa natural banget dan jawabannya akurat abis. Pokoknya, saya rekomen banget deh!",
    photoLink: "https://avatars.githubusercontent.com/u/3?v=4",
    tweetLink: "https://twitter.com/rizkipratamaa/status/1829780238884207616",
  },
  {
    name: "Siti Nurhasanah",
    position: "Mahasiswa",
    text: "Guru AI membantu saya dalam memahami konsep-konsep sulit dalam pemrograman. Saya sangat terkesan dengan responsivitas dan kecerdasannya!",
    photoLink: "https://avatars.githubusercontent.com/u/31957516?v=4",
    tweetLink: "https://twitter.com/sitinurhasanah/status/1234567890123456789",
  },
  {
    name: "Ahmad Hidayat",
    position: "Pengusaha",
    text: "Saya menggunakan Guru AI untuk meningkatkan strategi pemasaran digital saya. Hasilnya luar biasa! Guru AI benar-benar membantu saya mendapatkan wawasan yang mendalam.",
    photoLink: "https://avatars.githubusercontent.com/u/103434966?v=4",
    tweetLink: "https://twitter.com/ahmadhidayat/status/2345678901234567890",
  },
  {
    name: "Dewi Lestari",
    position: "Penulis",
    text: "Pengalaman menggunakan Guru AI sangat memuaskan. Saya bisa mendiskusikan ide-ide cerita baru dan mendapatkan umpan balik yang berguna untuk karya saya.",
    photoLink: "https://avatars.githubusercontent.com/u/127705274?v=4",
    tweetLink: "https://twitter.com/dewilestari/status/3456789012345678901",
  },
  {
    name: "Budi Santoso",
    position: "Freelancer",
    text: "Guru AI membantu saya menyelesaikan proyek-proyek programming dengan lebih efisien. Sangat berguna bagi saya yang sering bekerja sendiri!",
    photoLink: "https://avatars.githubusercontent.com/u/93862969?v=4",
    tweetLink: "https://twitter.com/budisantoso/status/4567890123456789012",
  },
  {
    name: "Anisa Rahman",
    position: "Pengajar",
    text: "Sebagai seorang pengajar, saya menggunakan Guru AI untuk mempersiapkan materi pelajaran dengan lebih baik. Responsif dan informatif!",
    photoLink: "https://avatars.githubusercontent.com/u/68645946?v=4",
    tweetLink: "https://twitter.com/anisarahman/status/5678901234567890123",
  },
  {
    name: "Andika Pradana",
    position: "Desainer Grafis",
    text: "Saya sangat terkesan dengan kemampuan Guru AI dalam memberikan saran dan inspirasi untuk desain grafis. Hasilnya selalu memuaskan!",
    photoLink: "https://avatars.githubusercontent.com/u/122613756?v=4",
    tweetLink: "https://twitter.com/andikapradana/status/6789012345678901234",
  },
];

const testimonials2: CardProps[] = [
  {
    name: "Ahmad Firdaus",
    position: "Pelajar",
    text: "Saya sangat menyukai Guru AI. Saya telah menggunakan produk ini untuk belajar bahasa Inggris dan Indonesia. Saya sangat menyukai bahwa AI dapat menjelaskan bahasa Inggris dengan cara yang jelas dan mudah dipahami. Produk ini sangat membantu saya dalam memperkuat pemahaman bahasa Inggris saya. Saya sangat merekomendasikannya!",
    photoLink: "https://avatars.githubusercontent.com/u/1600974?v=4",
    tweetLink: "https://twitter.com/ahmadfakhri/status/1829780238884207616",
  },
  {
    name: "Lisa Suryani",
    position: "Mahasiswi",
    text: "Produk Guru AI sangat membantu saya belajar bahasa Inggris. Penjelasannya mudah dipahami dan sangat jelas. Saya merasa pemahaman bahasa Inggris saya semakin kuat setiap harinya. Sangat direkomendasikan!",
    photoLink: "https://avatars.githubusercontent.com/u/53365353?v=4",
    tweetLink: "https://twitter.com/lisasuryani/status/1829780238884207617",
  },
  {
    name: "Siti Nurhaliza",
    position: "Pelajar",
    text: "Saya sangat terbantu dengan produk Guru AI ini. Bahasa Inggris jadi lebih mudah dipahami dan dijelaskan dengan cara yang sangat baik. Ini benar-benar meningkatkan kemampuan bahasa saya.",
    photoLink: "https://avatars.githubusercontent.com/u/138379828?v=4",
    tweetLink: "https://twitter.com/sitinurhaliza/status/1829780238884207619",
  },
  {
    name: "David Smith",
    position: "University Student",
    text: "Using the Guru AI for learning Indonesian has been a game-changer. The content is clear, concise, and very effective. Highly recommend this product to anyone!",
    photoLink: "https://avatars.githubusercontent.com/u/4?v=4",
    tweetLink: "https://twitter.com/davidsmith/status/1829780238884207620",
  },
  {
    name: "Ayu Lestari",
    position: "Mahasiswi",
    text: "Belajar bahasa Inggris menjadi lebih menyenangkan dengan Guru AI. Penjelasannya sangat jelas dan mudah dipahami. Sangat membantu dalam memperkuat kemampuan bahasa saya.",
    photoLink: "https://avatars.githubusercontent.com/u/5?v=4",
    tweetLink: "https://twitter.com/ayulestari/status/1829780238884207621",
  },
  {
    name: "Mark Johnson",
    position: "Student",
    text: "Guru AI is an excellent tool for learning English. The explanations are straightforward and easy to understand. It's been a great help in improving my language skills.",
    photoLink: "https://avatars.githubusercontent.com/u/6?v=4",
    tweetLink: "https://twitter.com/markjohnson/status/1829780238884207622",
  },
  {
    name: "Rina Andriani",
    position: "Pelajar",
    text: "Saya sangat puas dengan Guru AI. Produk ini benar-benar membantu saya belajar bahasa Inggris dengan lebih efektif. Penjelasannya sangat jelas dan mudah dipahami.",
    photoLink: "https://avatars.githubusercontent.com/u/35027979?v=4",
    tweetLink: "https://twitter.com/rinaandriani/status/1829780238884207623",
  },
  {
    name: "Emily Brown",
    position: "College Student",
    text: "Learning Indonesian with Guru AI has been fantastic. The lessons are clear and make the language easy to grasp. It's an invaluable resource for language learners.",
    photoLink: "https://avatars.githubusercontent.com/u/8?v=4",
    tweetLink: "https://twitter.com/emilybrown/status/1829780238884207624",
  },
  {
    name: "Budi Santoso",
    position: "Pelajar",
    text: "Guru AI sangat membantu saya dalam belajar bahasa Inggris. Materi yang disampaikan sangat jelas dan mudah dipahami. Saya sangat merekomendasikan produk ini untuk belajar bahasa.",
    photoLink: "https://avatars.githubusercontent.com/u/7?v=4",
    tweetLink: "https://twitter.com/budisantoso/status/1829780238884207625",
  },
  {
    name: "Jessica Lee",
    position: "University Student",
    text: "The Guru AI product has been incredible for learning Indonesian. The clarity and simplicity of the lessons have made learning a new language so much easier. Highly recommended!",
    photoLink: "https://avatars.githubusercontent.com/u/10?v=4",
    tweetLink: "https://twitter.com/jessicalee/status/1829780238884207626",
  },
];

const testimonials3: CardProps[] = [
  {
    name: "Nina Kartini",
    position: "Pelajar",
    text: "Guru AI sangat membantu saya memahami bahasa Inggris dengan lebih baik. Penjelasannya sangat mudah dipahami dan sangat informatif. Saya sangat merekomendasikan produk ini!",
    photoLink: "https://avatars.githubusercontent.com/u/11?v=4",
    tweetLink: "https://twitter.com/ninakartini/status/1829780238884207627",
  },
  {
    name: "Alex Johnson",
    position: "Student",
    text: "Using Guru AI has improved my English significantly. The clear and easy-to-understand explanations are fantastic. This product is a must-have for language learners!",
    photoLink: "https://avatars.githubusercontent.com/u/12?v=4",
    tweetLink: "https://twitter.com/alexjohnson/status/1829780238884207628",
  },
  {
    name: "Wahyu Setiawan",
    position: "Mahasiswa",
    text: "Belajar bahasa Inggris menjadi lebih mudah dengan Guru AI. Penjelasannya jelas dan mudah dipahami. Produk ini sangat membantu saya dalam meningkatkan kemampuan bahasa saya.",
    photoLink: "https://avatars.githubusercontent.com/u/13?v=4",
    tweetLink: "https://twitter.com/wahyusetiawan/status/1829780238884207629",
  },
  {
    name: "Sarah Williams",
    position: "University Student",
    text: "The Guru AI product is excellent for learning Indonesian. The explanations are straightforward and easy to follow. It's a fantastic tool for language learners!",
    photoLink: "https://avatars.githubusercontent.com/u/138429906?v=4",
    tweetLink: "https://twitter.com/sarahwilliams/status/1829780238884207630",
  },
  {
    name: "Hendra Wijaya",
    position: "Pelajar",
    text: "Guru AI membantu saya dalam belajar bahasa Inggris dengan cara yang efektif. Materinya sangat jelas dan mudah dipahami. Saya sangat puas dengan produk ini.",
    photoLink: "https://avatars.githubusercontent.com/u/15?v=4",
    tweetLink: "https://twitter.com/hendrawijaya/status/1829780238884207631",
  },
  {
    name: "Emma Taylor",
    position: "Student",
    text: "Guru AI has been a great help in learning Indonesian. The lessons are clear and very effective. Highly recommend this product for anyone looking to learn a new language!",
    photoLink: "https://avatars.githubusercontent.com/u/45036724?v=4",
    tweetLink: "https://twitter.com/emmataylor/status/1829780238884207632",
  },
  {
    name: "Rizky Putra",
    position: "Mahasiswa",
    text: "Produk Guru AI sangat berguna untuk belajar bahasa Inggris. Penjelasannya mudah dipahami dan sangat membantu saya dalam meningkatkan pemahaman bahasa Inggris saya.",
    photoLink: "https://avatars.githubusercontent.com/u/17?v=4",
    tweetLink: "https://twitter.com/rizkyputra/status/1829780238884207633",
  },
  {
    name: "James Brown",
    position: "College Student",
    text: "Learning Indonesian with Guru AI has been a fantastic experience. The explanations are clear and concise, making the learning process much easier.",
    photoLink: "https://avatars.githubusercontent.com/u/18?v=4",
    tweetLink: "https://twitter.com/jamesbrown/status/1829780238884207634",
  },
  {
    name: "Dewi Anggraini",
    position: "Pelajar",
    text: "Guru AI sangat membantu saya dalam belajar bahasa Inggris. Penjelasannya sangat mudah dipahami dan sangat bermanfaat. Saya sangat merekomendasikan produk ini untuk belajar bahasa.",
    photoLink: "https://avatars.githubusercontent.com/u/137588265?v=4",
    tweetLink: "https://twitter.com/dewianggraini/status/1829780238884207635",
  },
  {
    name: "Michael Lee",
    position: "University Student",
    text: "The Guru AI is an amazing tool for learning Indonesian. The lessons are clear and easy to understand, making the learning process enjoyable and effective.",
    photoLink: "https://avatars.githubusercontent.com/u/20?v=4",
    tweetLink: "https://twitter.com/michaellee/status/1829780238884207636",
  },
];

export const testimonials = { testimonials1, testimonials2, testimonials3 };
