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

export const MULTIPLIER_COST_CREDITS = 0.05;

export const plans = [
  {
    title: "+50 Credits",
    price: 0,
    credits: 50,
    description: "card1_description",
    actionLabel: "btn_get_started",
  },
  {
    title: "+100 Credits",
    price: 15000,
    credits: 100,
    description: "card2_description",
    actionLabel: "btn_buy_now",
  },
  {
    title: "+250 Credits",
    price: 20000,
    credits: 250,
    description: "card3_description",

    actionLabel: "btn_buy_now",
    popular: true,
  },
  {
    title: "+500 Credits",
    price: 50000,
    credits: 500,
    description: "card4_description",
    exclusive: true,
    actionLabel: "btn_buy_now",
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
  {
    language: "Japan",
    icon: Icons.japan,
    description:
      "Learn Japanese with our AI assistant. Perfect for casual conversations, learning, and testing your skills.",
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
  // {
  //   name: "Ahmad Firdaus",
  //   position: "Pelajar",
  //   text: "Sangat merekomendasikan Guru AI! Fitur text-to-speech dan terjemahan membuat belajar menjadi lebih interaktif dan efektif. Penjelasannya jelas dan mudah dimengerti.",
  //   photoLink: "https://avatars.githubusercontent.com/u/1600974?v=4",
  //   tweetLink: "https://twitter.com/ahmadfakhri/status/1829780238884207616",
  // },
  {
    name: "Lisa Suryani",
    position: "Mahasiswi",
    text: "Dengan Guru AI, belajar bahasa baru menjadi lebih menyenangkan. Terjemahannya sangat akurat dan membantu saya memahami bahasa asing.",
    photoLink: "https://avatars.githubusercontent.com/u/53365353?v=4",
    tweetLink: "https://twitter.com/lisasuryani/status/1829780238884207617",
  },
  {
    name: "Siti Nurhaliza",
    position: "Pelajar",
    text: "Terjemahan dan tata bahasa membuat belajar bahasa menjadi lebih mudah dan menyenangkan. Sangat membantu saya dalam memperdalam pemahaman bahasa.",
    photoLink: "https://avatars.githubusercontent.com/u/138379828?v=4",
    tweetLink: "https://twitter.com/sitinurhaliza/status/1829780238884207619",
  },
];

const testimonials4: CardProps[] = [
  {
    name: "Ayu Lestari",
    position: "Mahasiswi",
    text: "Guru AI luar biasa! Saya bisa belajar dengan mendengar dan mendapatkan terjemahan yang tepat ke bahasa pilihan saya. Penjelasan tatabahasanya juga sangat membantu. Sangat direkomendasikan!",
    photoLink: "https://avatars.githubusercontent.com/u/5?v=4",
    tweetLink: "https://twitter.com/ayulestari/status/1829780238884207621",
  },
  {
    name: "Rina Andriani",
    position: "Pelajar",
    text: "Dengan Guru AI, belajar bahasa baru menjadi lebih menyenangkan. Terjemahannya sangat akurat dan penjelasan tatabahasa membantu saya memahami bahasa asing.",
    photoLink: "https://avatars.githubusercontent.com/u/35027979?v=4",
    tweetLink: "https://twitter.com/rinaandriani/status/1829780238884207623",
  },
  // {
  //   name: "Budi Santoso",
  //   position: "Pelajar",
  //   text: "Guru AI sangat bagus! Fitur text-to-speech membantu saya mendengar pengucapan yang benar. Penjelasan tatabahasanya sangat rinci dan mudah dimengerti. Sangat direkomendasikan!",
  //   photoLink: "https://avatars.githubusercontent.com/u/7?v=4",
  //   tweetLink: "https://twitter.com/budisantoso/status/1829780238884207625",
  // },
];

const testimonials3: CardProps[] = [
  {
    name: "Nina Kartini",
    position: "Pelajar",
    text: "Guru AI sangat membantu saya memahami bahasa Inggris dengan lebih baik. Penjelasannya sangat mudah dipahami dan sangat informatif. Saya sangat merekomendasikan produk ini!",
    photoLink: "https://avatars.githubusercontent.com/u/95553914?v=4",
    tweetLink: "https://twitter.com/ninakartini/status/1829780238884207627",
  },
  {
    name: "Wahyu Setiawan",
    position: "Mahasiswa",
    text: "Belajar bahasa Inggris menjadi lebih mudah dengan Guru AI. Penjelasannya jelas dan mudah dipahami. Produk ini sangat membantu saya dalam meningkatkan kemampuan bahasa saya.",
    photoLink: "https://avatars.githubusercontent.com/u/161776956?v=4",
    tweetLink: "https://twitter.com/wahyusetiawan/status/1829780238884207629",
  },
  // {
  //   name: "Dewi Anggraini",
  //   position: "Pelajar",
  //   text: "Guru AI sangat membantu saya dalam belajar bahasa Inggris. Penjelasannya sangat mudah dipahami dan sangat bermanfaat. Saya sangat merekomendasikan produk ini untuk belajar bahasa.",
  //   photoLink: "https://avatars.githubusercontent.com/u/137588265?v=4",
  //   tweetLink: "https://twitter.com/dewianggraini/status/1829780238884207635",
  // },
];

export const testimonials = {
  testimonials1,
  testimonials2,
  testimonials3,
  testimonials4,
};
