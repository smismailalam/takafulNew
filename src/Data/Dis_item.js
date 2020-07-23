export const Brands = [
  (Pranzo = {
    offersList: [
      {
        title: `20'' Half Pizza`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
      {
        title: `40'' Half Pizza`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
    ],

    outletList: [
      {
        title: `Karim Abad`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
      {
        title: `Garder East`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
      {
        title: `Zamzama Dha Phase 5`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
    ],
  }),

  (AgaKhanHospital = {
    offersList: [
      {
        title: `Cataract Surgery `,
        validity: 'Valid Until 30 Dec 2019',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
      {
        title: `Eye Surgery `,
        validity: 'Valid Until 30 Dec 2019',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '15% OFF',
      },
      {
        title: `General Surgery `,
        validity: 'Valid Until 30 Dec 2019',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '10% OFF',
      },
    ],

    outletList: [
      {
        title: `KhayabaneShahbaz`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
      {
        title: `KhayabaneBadar`,
        validity: 'Valid Until 30 Dec 2017',
        logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
        percentage: '20% OFF',
      },
    ],
  }),
];

export const discountList = [
  {
    title: 'Aga Khan Hospital',
    location: 'khayaban-e-shahbaz',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
    percentage: '20% OFF',
    offersList: Brands[1].offersList,
    outletList: Brands[1].outletList,
  },
  {
    title: 'Hashmanis',
    location: 'khayaban-e-shahbaz',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hashmani-logo.png'),
    percentage: '20% OFF',
    offersList: Brands[1].offersList,
    outletList: Brands[1].outletList,
  },
  {
    title: 'The Retreat',
    location: 'khayaban-e-shahbaz',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/retreat-logo.png'),
    percentage: '20% OFF',
    offersList: Brands[1].offersList,
    outletList: Brands[1].outletList,
  },
  {
    title: 'Dental Square',
    location: 'khayaban-e-shahbaz',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/dental-sq.png'),
    percentage: '20% OFF',
    offersList: Brands[1].offersList,
    outletList: Brands[1].outletList,
  },
  {
    title: 'Hm Studio',
    location: 'khayaban-e-shahbaz',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hmstudio.png'),
    percentage: '20% OFF',
    offersList: Brands[1].offersList,
    outletList: Brands[1].outletList,
  },
  {
    title: 'Eye Gallery',
    location: 'khayaban-e-shahbaz',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/eye-gallery.png'),
    percentage: '20% OFF',
    offersList: Brands[1].offersList,
    outletList: Brands[1].outletList,
  },
  // {
  //   title: 'Essa Laboratory',
  //   location: 'khayaban-e-shahbaz',
  //   logo: require('../../assets/icons/android/drawable-xxxhdpi/essa-lab.jpg'),
  //   percentage: '20% OFF',
  //   offersList: Brands[0].offersList,
  //   outletList: Brands[0].outletList
  // }
];
export const chatHistory = [
  {
    ticket: {
      no: '633459',
      timestamp: '06:00 pm 12 dec 2019',
      duration: '50 mins',
    },
  },
  {
    ticket: {
      no: '633459',
      timestamp: '06:00 pm 12 dec 2019',
      duration: '50 mins',
    },
  },
  {
    ticket: {
      no: '633459',
      timestamp: '06:00 pm 12 dec 2019',
      duration: '50 mins',
    },
  },
  {
    ticket: {
      no: '633459',
      timestamp: '06:00 pm 12 dec 2019',
      duration: '50 mins',
    },
  },
  {
    ticket: {
      no: '633459',
      timestamp: '06:00 pm 12 dec 2019',
      duration: '50 mins',
    },
  },
  {
    ticket: {
      no: '633459',
      timestamp: '06:00 pm 12 dec 2019',
      duration: '50 mins',
    },
  },
];
export const doctorsList = [
  {
    name: 'Dentists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/Dentist.png'),
    count: 47,
    navigate: '',
    type: 'Dentist',
  },
  {
    name: 'Cardiologists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/heart.png'),
    count: 47,
    navigate: '',
    type: 'Cardiologist',
  },
  {
    name: 'Pshychatrists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hospital.png'),
    count: 47,
    navigate: '',
    type: 'pshychatrists',
  },
  {
    name: 'Neurologists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hospital.png'),
    count: 47,
    navigate: '',
    type: 'neurologist',
  },
  {
    name: 'Allergists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hospital.png'),
    count: 47,
    navigate: '',
    type: 'Allergists',
  },
  // {
  //   count: 'VIEW ALL',
  //   logo: require('../../assets/icons/android/drawable-xxxhdpi/view_all_icon.png'),
  //   navigate: 'NearByList',
  //   // type: ''
  // },
];

export const completeDoctorsList = [
  {
    name: 'Pshychatrists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hospital.png'),
    count: 47,
    navigate: '',
    type: 'pshychatrists',
  },
  {
    name: 'Plastic Surgeon',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/medicals.png'),
    count: 47,
    navigate: '',
    type: 'plasticsurgeon',
  },
  {
    name: 'Neuro Surgeon',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/rehab.png'),
    count: 47,
    navigate: '',
    type: 'neurosurgeon',
  },
  {
    name: 'Neurologists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/bloodbank.png'),
    count: 47,
    navigate: '',
    type: 'neurologist',
  },
  {
    name: 'Gyneocologist',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/clinics.png'),
    count: 47,
    navigate: '',
    type: 'Gyneocologist',
  },
  {
    name: 'Physiotherapist',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/hospital.png'),
    count: 47,
    navigate: '',
    type: 'Physiotherapist',
  },
  {
    name: 'Dentist',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/medicals.png'),
    count: 47,
    navigate: '',
    type: 'Dentist',
  },
  {
    name: 'Cardiologist',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/clinics.png'),
    count: 47,
    navigate: '',
    type: 'Cardiologist',
  },
  {
    name: 'Allergists',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/rehab.png'),
    count: 47,
    navigate: '',
    type: 'Allergists',
  },
  {
    name: 'Epidemiologist',
    logo: require('../../assets/icons/android/drawable-xxxhdpi/bloodbank.png'),
    count: 47,
    navigate: '',
    type: 'Epidemiologist',
  },
];
