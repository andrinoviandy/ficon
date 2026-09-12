import {
    FaTachometerAlt,
    FaClipboardList,
    FaHistory,
    FaFileInvoiceDollar,
    FaUserCheck,
    FaMoneyCheckAlt,
    FaTasks,
    FaChartBar,
    FaDatabase,
    FaFileInvoice,
    FaUserCog,
    FaUsersCog,
    FaMoneyBillWave,
    FaBuilding,
} from "react-icons/fa";
import { MdOutlineRequestQuote } from "react-icons/md";

export const dummyMenu = [
    {
        id: 1,
        name: "Rasio Biaya",
        path: "/rasio-biaya",
        icon: FaMoneyBillWave,
        // roles: [],
        submenu: [],
    },
    {
        id: 2,
        name: "Performa Principal",
        path: "/performa-principal",
        icon: FaBuilding,
        // roles: [],
        submenu: [],
    },
];