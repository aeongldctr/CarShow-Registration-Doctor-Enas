const SAMPLE_REGISTRATIONS = [
  { id: "101a0001-0000-0000-0000-000000000001", registrationNumber: "CS27-0001", registrationDate: "2027-02-10T08:30:00Z", participantName: "Juan Dela Cruz", contactNumber: "09171234567", email: "juan@example.com", address: "Sorsogon City", carMakeModel: "Toyota Supra MK4", plateNumber: "ABC 1234", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 1000.00, paymentStatus: "Partial" },
  { id: "101a0001-0000-0000-0000-000000000002", registrationNumber: "CS27-0002", registrationDate: "2027-02-10T09:15:00Z", participantName: "Maria Santos", contactNumber: "09182345678", email: "maria.s@example.com", address: "Legazpi City", carMakeModel: "Nissan GT-R R35", plateNumber: "GTR 2027", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000003", registrationNumber: "CS27-0003", registrationDate: "2027-02-10T10:00:00Z", participantName: "Carlos Mendoza", contactNumber: "09193456789", email: "cmendoza@example.com", address: "Gubat, Sorsogon", carMakeModel: "Honda Civic Type R FK8", plateNumber: "EFG 5678", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000004", registrationNumber: "CS27-0004", registrationDate: "2027-02-11T11:20:00Z", participantName: "Rafael Reyes", contactNumber: "09204567890", email: "rreyes@example.com", address: "Naga City", carMakeModel: "Mazda RX-7 FD", plateNumber: "RX7 9012", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000005", registrationNumber: "CS27-0005", registrationDate: "2027-02-11T13:45:00Z", participantName: "Andrea Lim", contactNumber: "09215678901", email: "alim@example.com", address: "Sorsogon City", carMakeModel: "Subaru WRX STI", plateNumber: "SUB 3344", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000006", registrationNumber: "CS27-0006", registrationDate: "2027-02-12T08:10:00Z", participantName: "Marco Villanueva", contactNumber: "09226789012", email: "marco.v@example.com", address: "Bulan, Sorsogon", carMakeModel: "Mitsubishi Lancer Evo IX", plateNumber: "EVO 9900", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000007", registrationNumber: "CS27-0007", registrationDate: "2027-02-12T14:00:00Z", participantName: "Sofia Bautista", contactNumber: "09237890123", email: "sofia.b@example.com", address: "Tabaco City", carMakeModel: "BMW M4 Competition", plateNumber: "BMW 4401", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 2500.00, paymentStatus: "Partial" },
  { id: "101a0001-0000-0000-0000-000000000008", registrationNumber: "CS27-0008", registrationDate: "2027-02-13T09:30:00Z", participantName: "Miguel Torres", contactNumber: "09248901234", email: "mtorres@example.com", address: "Irosin, Sorsogon", carMakeModel: "Ford Mustang GT", plateNumber: "MST 5000", registrationType: "Exhibitor", status: "Cancelled", registrationFee: 1500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000009", registrationNumber: "CS27-0009", registrationDate: "2027-02-13T15:10:00Z", participantName: "Katrina Navarro", contactNumber: "09259012345", email: "knavarro@example.com", address: "Sorsogon City", carMakeModel: "Porsche 911 Carrera", plateNumber: "POR 9110", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000010", registrationNumber: "CS27-0010", registrationDate: "2027-02-14T10:25:00Z", participantName: "Jose Rizalino", contactNumber: "09260123456", email: "jrizalino@example.com", address: "Daraga, Albay", carMakeModel: "Toyota GR86", plateNumber: "GR8 6086", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 1000.00, paymentStatus: "Partial" },
  { id: "101a0001-0000-0000-0000-000000000011", registrationNumber: "CS27-0011", registrationDate: "2027-02-14T11:40:00Z", participantName: "Patricia Gomez", contactNumber: "09271234567", email: "pgomez@example.com", address: "Sorsogon City", carMakeModel: "Honda S2000", plateNumber: "S2K 2000", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000012", registrationNumber: "CS27-0012", registrationDate: "2027-02-15T08:50:00Z", participantName: "Daniel Aquino", contactNumber: "09282345678", email: "daquino@example.com", address: "Casiguran, Sorsogon", carMakeModel: "Nissan Silvia S15", plateNumber: "S15 7788", registrationType: "Competitor", status: "CheckedIn", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000013", registrationNumber: "CS27-0013", registrationDate: "2027-02-15T16:15:00Z", participantName: "Bianca Cruz", contactNumber: "09293456789", email: "bcruz@example.com", address: "Legazpi City", carMakeModel: "Audi RS3", plateNumber: "AUD 3003", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000014", registrationNumber: "CS27-0014", registrationDate: "2027-02-16T09:05:00Z", participantName: "Gabriel Castro", contactNumber: "09304567890", email: "gcastro@example.com", address: "Pilar, Sorsogon", carMakeModel: "Mazda Miata MX-5", plateNumber: "MX5 1995", registrationType: "Exhibitor", status: "Pending", registrationFee: 1500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000015", registrationNumber: "CS27-0015", registrationDate: "2027-02-16T13:30:00Z", participantName: "Lorenzo Ramos", contactNumber: "09315678901", email: "lramos@example.com", address: "Sorsogon City", carMakeModel: "Chevrolet Camaro SS", plateNumber: "CAM 6200", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 1500.00, paymentStatus: "Partial" },
  { id: "101a0001-0000-0000-0000-000000000016", registrationNumber: "CS27-0016", registrationDate: "2027-02-17T10:10:00Z", participantName: "Camille Diaz", contactNumber: "09326789012", email: "cdiaz@example.com", address: "Naga City", carMakeModel: "Toyota AE86 Trueno", plateNumber: "AE8 6860", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000017", registrationNumber: "CS27-0017", registrationDate: "2027-02-17T14:45:00Z", participantName: "Adrian Morales", contactNumber: "09337890123", email: "amorales@example.com", address: "Matnog, Sorsogon", carMakeModel: "Hyundai Elantra N", plateNumber: "HYN 2024", registrationType: "Competitor", status: "Cancelled", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000018", registrationNumber: "CS27-0018", registrationDate: "2027-02-18T08:20:00Z", participantName: "Isabella Flores", contactNumber: "09348901234", email: "iflores@example.com", address: "Sorsogon City", carMakeModel: "Mercedes-AMG A45", plateNumber: "AMG 4500", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 3000.00, paymentStatus: "Partial" },
  { id: "101a0001-0000-0000-0000-000000000019", registrationNumber: "CS27-0019", registrationDate: "2027-02-18T12:00:00Z", participantName: "Vincent Fernandez", contactNumber: "09359012345", email: "vfernandez@example.com", address: "Juban, Sorsogon", carMakeModel: "Honda NSX", plateNumber: "NSX 1992", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000020", registrationNumber: "CS27-0020", registrationDate: "2027-02-19T09:40:00Z", participantName: "Nicole Sy", contactNumber: "09360123456", email: "nsy@example.com", address: "Legazpi City", carMakeModel: "Volkswagen Golf R", plateNumber: "VWG 2023", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "101a0001-0000-0000-0000-000000000021", registrationNumber: "CS27-0021", registrationDate: "2027-02-19T15:50:00Z", participantName: "Patrick Ocampo", contactNumber: "09371234567", email: "pocampo@example.com", address: "Sorsogon City", carMakeModel: "Dodge Challenger R/T", plateNumber: "DDG 5700", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000022", registrationNumber: "CS27-0022", registrationDate: "2027-02-20T10:30:00Z", participantName: "Clarissa Tan", contactNumber: "09382345678", email: "ctan@example.com", address: "Donsol, Sorsogon", carMakeModel: "Lexus RC F", plateNumber: "LEX 5000", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 750.00, paymentStatus: "Partial" },
  { id: "101a0001-0000-0000-0000-000000000023", registrationNumber: "CS27-0023", registrationDate: "2027-02-20T14:15:00Z", participantName: "Emmanuel Velasco", contactNumber: "09393456789", email: "evelasco@example.com", address: "Sorsogon City", carMakeModel: "Toyota GR Yaris", plateNumber: "YRS 1600", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000024", registrationNumber: "CS27-0024", registrationDate: "2027-02-21T09:10:00Z", participantName: "Stephanie Chua", contactNumber: "09404567890", email: "schua@example.com", address: "Iriga City", carMakeModel: "Nissan 370Z Nismo", plateNumber: "NSM 3700", registrationType: "Exhibitor", status: "Cancelled", registrationFee: 1500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "101a0001-0000-0000-0000-000000000025", registrationNumber: "CS27-0025", registrationDate: "2027-02-21T16:00:00Z", participantName: "Christian Perez", contactNumber: "09415678901", email: "cperez@example.com", address: "Sorsogon City", carMakeModel: "Honda Civic EG6", plateNumber: "EG6 1994", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 1250.00, paymentStatus: "Partial" }
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  await delay(300);
  let filtered = [...SAMPLE_REGISTRATIONS];

  if (participantName.trim()) {
    const q = participantName.toLowerCase();
    filtered = filtered.filter((r) => r.participantName.toLowerCase().includes(q));
  }
  if (type && type !== 'All') {
    filtered = filtered.filter((r) => r.registrationType === type);
  }
  if (status && status !== 'All') {
    filtered = filtered.filter((r) => r.status === status);
  }

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return { items, page: safePage, pageSize, totalCount, totalPages };
}

export async function getSummary() {
  await delay(250);
  const active = SAMPLE_REGISTRATIONS.filter((r) => r.status !== 'Cancelled');
  const totalFees = active.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = active.reduce((sum, r) => sum + r.amountPaid, 0);

  return {
    totalRegistrations: SAMPLE_REGISTRATIONS.length,
    confirmed: SAMPLE_REGISTRATIONS.filter((r) => r.status === 'Confirmed').length,
    checkedIn: SAMPLE_REGISTRATIONS.filter((r) => r.status === 'CheckedIn').length,
    pending: SAMPLE_REGISTRATIONS.filter((r) => r.status === 'Pending').length,
    cancelled: SAMPLE_REGISTRATIONS.filter((r) => r.status === 'Cancelled').length,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}