export default {
  no: {
    label: '№'
  },
  
  // user
  fullName: {
    label: 'Tam adı',
    type: 'text'
  },
  email: {
    label: 'Email',
    type: 'email'
  },
  login: {
    label: 'İstifadəçi adı',
    type: 'text'
  },
  password: {
    label: 'Şifrə',
    type: 'password'
  },
  role: {
    label: 'Rol',
    type: 'enum'
  },
  oldPassword: {
    label: 'Köhnə şifrə',
    type: 'password'
  },
  newPassword: {
    label: 'Yeni şifrə',
    type: 'password'
  },

  // customer
  id: {
    label: 'ID',
  },
  customerType: {
    label: 'Müştəri növü',
    type: 'enum'
  },
  phone: {
    label: 'Mobil nömrə',
    type: 'text'
  },
  fullName: {
    label: 'Tam adı',
    type: 'text'
  },
  description: {
    label: 'Qeydlər',
    type: 'area'
  },
  cooperativeType: {
    label: 'Korporativ rejim',
    type: 'enum'
  },
  balance: {
    label: 'Balans',
    type: 'number'
  },
  ordersLink: {
    label: 'Sifarişlər',
  },
  rating: {
    label: 'Reytinq',
  },
  status: {
    label: 'Sistemdəki statusu',
    type: 'text'
  },
  gender: {
    label: 'Cins',
    type: 'enum'
  },
  birthDate: {
    label: 'Doğum tarixi',
    type: 'date'
  },
  code: {
    label: 'Kod',
    type: 'number'
  },
  mobileNumber: {
    label: 'Mobil nömrələr',
    type: 'multiSelect',
    // opts: 'mobileNumbers'
  },


  // car  
  multiLanguage: {
    label: "Başlıq",
    type: "multiLanguage"
  },
  car: {
    label: 'Avtomobil',
  },
  class: {
    label: 'Sinif'
  },
  color: {
    label: 'Avtomobilin rəngi'
  }, 
  title: {
    label: "Başlıq",
  },

  // driver
  driverActivity: {
    label: "Fəaliyyət xalı",
  },
  carRegistrationNumber: {
    label: "Avtomobil nömrə",
  },
  depozit: {
    label: "Depozit",
  },
  phoneNumber: {
    label: 'Mobil nömrə',
    type: 'text'
  },
  driverRating: {
    label: 'Reytinq'
  },

  // promocode
  promocode: {
    label: "Kod",
    type: "text",
  },
  promocodeName: {
    label: "Promokodun adı",
    type: "text",
  },
  discount: {
    label: "Endirim",
    type: "number",
  },
  usageLimit:{
    label: "İstifadə limiti",
    type: "number",
  },
  usedCount: {
    label: "İstifadə olunmuş",
    type: "number",
  },
  available: {
    label: "Mövcüd",
    type: "number",
  },
  expireDate: {
    label: "Bitmə vaxtı",
    type: "date",
  },
  discountType: {
    label: 'Endirim növü',
    type: 'enum'
  },
  forFirstOrder: {
    label: "Birinci sifariş üçün",
    type: "checkbox"
  },

  // company
  companyType: {
    label: "Kompaniya növü",
  },
  companyNumber: {
    label: "Kompaniya",
  },
  numberOfTrips: {
    label: "Gediş sayı",
    type: "number",
  },
  numberOfTripsWithoutEnum: {
    label: "Gediş sayı",
  },
  time: {
    label: "Müddət",
  },
  finishTime: {
    label: "Bitmə tarixi",
    type: "date"
  },
  startTime: {
    label: "Başlanğıc tarix",
    type: "date"
  },
  continuity: {
    label: "Sürəklilik",
    type: "number"
  },
  period: {
    label: "Dövr",
    type: "enum"
  },
  minOrderCount: {
    label: "Minimal sifariş sayı",
    type: "number"
  },
  customerCount: {
    label: "Müştəri sayı",
    type: "number"
  },

  // statistic
  name: {
    label: "Name",
    type: "text",
    hide: true,
  },
  startKm: {
    label: "Başlanğıc km",
    type: "number"
  },
  endKm: {
    label: "Son km",
    type: "number"
  },
  price: {
    label: "Qiymət",
    type: "number"
  },
  rangeKm: {
    label: "Aralıq km"
  },


  // addition - tariff
  ratio: {
    label: "Əmsal (x)",
    type: "number"
  },
  region: {
    label: "Bölgə",
    type: "select"
  },
  dateFrom: {
    label: "Saat",
    type: "time"
  },
  dateTo: {
    label: "Saat",
    type: "time"
  },
  timeRange: {
    label: "Vaxt aralığı"
  },
  tariff: {
    label: "Aid olduğu tariflər",
    type: "selectGroup"
  },



  // Statik
};
