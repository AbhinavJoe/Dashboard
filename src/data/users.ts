import { User } from '@/types';
import { loadUserFromLocalStorage, saveUserToLocalStorage } from '@/utils/localStorage';

const SBI_USERS_KEY = 'sbi_users';
const AXIS_USERS_KEY = 'axis_users';


const defaultSbiUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91-9876543210',
    ageRange: '31-40',
    language: 'Hindi',
    website: 'https://rajeshkumar.com',
    tenant: 'sbi',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-10-20T14:45:00Z',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9123456789',
    ageRange: 'Below 30',
    language: 'English',
    tenant: 'sbi',
    createdAt: '2024-02-10T09:15:00Z',
    updatedAt: '2024-10-18T11:20:00Z',
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91-9988776655',
    ageRange: '41-50',
    language: 'Gujarati',
    website: 'https://amitpatel.in',
    tenant: 'sbi',
    createdAt: '2024-03-05T16:00:00Z',
    updatedAt: '2024-10-19T09:30:00Z',
  },
  {
    id: '4',
    name: 'Sunita Reddy',
    email: 'sunita.reddy@example.com',
    phone: '+91-9876512345',
    ageRange: '51-60',
    language: 'Telugu',
    tenant: 'sbi',
    createdAt: '2024-04-20T12:45:00Z',
    updatedAt: '2024-10-21T08:15:00Z',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91-9654321098',
    ageRange: '31-40',
    language: 'Punjabi',
    website: 'https://vikramsingh.net',
    tenant: 'sbi',
    createdAt: '2024-05-12T14:20:00Z',
    updatedAt: '2024-10-22T10:00:00Z',
  },
  {
    id: '6',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    phone: '+91-9112233445',
    ageRange: 'Below 30',
    language: 'Tamil',
    tenant: 'sbi',
    createdAt: '2024-06-08T11:30:00Z',
    updatedAt: '2024-10-20T15:40:00Z',
  },
  {
    id: '7',
    name: 'Ramesh Gupta',
    email: 'ramesh.gupta@example.com',
    phone: '+91-9876598765',
    ageRange: 'Above 60',
    language: 'Hindi',
    website: 'https://rameshgupta.org',
    tenant: 'sbi',
    createdAt: '2024-07-15T08:00:00Z',
    updatedAt: '2024-10-19T12:30:00Z',
  },
  {
    id: '8',
    name: 'Neha Kapoor',
    email: 'neha.kapoor@example.com',
    phone: '+91-9445566778',
    ageRange: '31-40',
    language: 'English',
    tenant: 'sbi',
    createdAt: '2024-08-22T13:15:00Z',
    updatedAt: '2024-10-21T16:20:00Z',
  },
  {
    id: '9',
    name: 'Sanjay Deshmukh',
    email: 'sanjay.deshmukh@example.com',
    phone: '+91-9334455667',
    ageRange: '41-50',
    language: 'Marathi',
    website: 'https://sanjaydeshmukh.com',
    tenant: 'sbi',
    createdAt: '2024-09-10T10:45:00Z',
    updatedAt: '2024-10-22T09:10:00Z',
  },
  {
    id: '10',
    name: 'Kavita Menon',
    email: 'kavita.menon@example.com',
    phone: '+91-9223344556',
    ageRange: '51-60',
    language: 'Malayalam',
    tenant: 'sbi',
    createdAt: '2024-10-01T15:30:00Z',
    updatedAt: '2024-10-20T11:50:00Z',
  },
];

const defaultAxisUsers: User[] = [
  {
    id: '11',
    name: 'Arjun Malhotra',
    email: 'arjun.malhotra@example.com',
    phone: '+91-9988112233',
    ageRange: '31-40',
    language: 'English',
    website: 'https://arjunmalhotra.com',
    tenant: 'axis',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-10-21T14:30:00Z',
  },
  {
    id: '12',
    name: 'Deepika Rao',
    email: 'deepika.rao@example.com',
    phone: '+91-9876567890',
    ageRange: 'Below 30',
    language: 'Kannada',
    tenant: 'axis',
    createdAt: '2024-02-15T11:45:00Z',
    updatedAt: '2024-10-19T10:15:00Z',
  },
  {
    id: '13',
    name: 'Manish Verma',
    email: 'manish.verma@example.com',
    phone: '+91-9123567890',
    ageRange: '41-50',
    language: 'Hindi',
    website: 'https://manishverma.in',
    tenant: 'axis',
    createdAt: '2024-03-10T14:20:00Z',
    updatedAt: '2024-10-20T16:40:00Z',
  },
  {
    id: '14',
    name: 'Pooja Nair',
    email: 'pooja.nair@example.com',
    phone: '+91-9445512345',
    ageRange: '31-40',
    language: 'Malayalam',
    tenant: 'axis',
    createdAt: '2024-04-05T10:30:00Z',
    updatedAt: '2024-10-22T08:20:00Z',
  },
  {
    id: '15',
    name: 'Karan Mehta',
    email: 'karan.mehta@example.com',
    phone: '+91-9667788990',
    ageRange: 'Below 30',
    language: 'Gujarati',
    website: 'https://karanmehta.net',
    tenant: 'axis',
    createdAt: '2024-05-18T12:00:00Z',
    updatedAt: '2024-10-21T13:50:00Z',
  },
  {
    id: '16',
    name: 'Shreya Chatterjee',
    email: 'shreya.chatterjee@example.com',
    phone: '+91-9334422110',
    ageRange: '51-60',
    language: 'Bengali',
    tenant: 'axis',
    createdAt: '2024-06-25T08:45:00Z',
    updatedAt: '2024-10-20T09:30:00Z',
  },
  {
    id: '17',
    name: 'Rohit Joshi',
    email: 'rohit.joshi@example.com',
    phone: '+91-9556677889',
    ageRange: '41-50',
    language: 'Marathi',
    website: 'https://rohitjoshi.org',
    tenant: 'axis',
    createdAt: '2024-07-12T15:15:00Z',
    updatedAt: '2024-10-19T14:10:00Z',
  },
  {
    id: '18',
    name: 'Divya Krishnan',
    email: 'divya.krishnan@example.com',
    phone: '+91-9778899001',
    ageRange: 'Below 30',
    language: 'Tamil',
    tenant: 'axis',
    createdAt: '2024-08-08T13:30:00Z',
    updatedAt: '2024-10-22T11:40:00Z',
  },
  {
    id: '19',
    name: 'Aditya Bose',
    email: 'aditya.bose@example.com',
    phone: '+91-9889900112',
    ageRange: 'Above 60',
    language: 'Bengali',
    website: 'https://adityabose.com',
    tenant: 'axis',
    createdAt: '2024-09-14T09:50:00Z',
    updatedAt: '2024-10-21T15:25:00Z',
  },
  {
    id: '20',
    name: 'Isha Kulkarni',
    email: 'isha.kulkarni@example.com',
    phone: '+91-9223311445',
    ageRange: '31-40',
    language: 'Marathi',
    tenant: 'axis',
    createdAt: '2024-10-05T11:00:00Z',
    updatedAt: '2024-10-20T10:35:00Z',
  },
];

let sbiUsers: User[] = loadUserFromLocalStorage(SBI_USERS_KEY, defaultSbiUsers);
let axisUsers: User[] = loadUserFromLocalStorage(AXIS_USERS_KEY, defaultAxisUsers);

const getSbiUsers = () => sbiUsers;

const getAxisUsers = () => axisUsers;

const removeSbiUser = (userId: string) => {
  sbiUsers = sbiUsers.filter(user => user.id !== userId);
  saveUserToLocalStorage(SBI_USERS_KEY, sbiUsers);
};

const removeAxisUser = (userId: string) => {
  axisUsers = axisUsers.filter(user => user.id !== userId);
  saveUserToLocalStorage(AXIS_USERS_KEY, axisUsers);
};

const addSbiUser = (user: User) => {
  sbiUsers = [...sbiUsers, user];
  saveUserToLocalStorage(SBI_USERS_KEY, sbiUsers);
};

const addAxisUser = (user: User) => {
  axisUsers = [...axisUsers, user];
  saveUserToLocalStorage(AXIS_USERS_KEY, axisUsers);
};

export { getSbiUsers, getAxisUsers, removeAxisUser, removeSbiUser, addAxisUser, addSbiUser }