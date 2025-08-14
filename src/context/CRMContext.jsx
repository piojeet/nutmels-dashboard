import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { crmProfile } from '../data/crmdata';

const CRMContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCRM = () => useContext(CRMContext);

export const CRMProvider = ({ children }) => {
  const [orders] = useState(crmProfile);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [allCheckList, setAllCheckList] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Customer Profile');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tabRefs = useRef([]);

  // Handle tab underline animation
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const current = tabRefs.current?.find((el) => el?.innerText === selectedTab);
    if (current) {
      setUnderlineStyle({ left: current.offsetLeft, width: current.offsetWidth });
    }
  }, [selectedTab]);

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      selectedTab === 'Customer Profile'
        ? selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
        : order.status === selectedTab;

    const searchMatch =
      (order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()))


    const dateMatch = startDate
      ? new Date(order.date).toDateString() === startDate.toDateString()
      : true;

    return statusMatch && searchMatch && dateMatch;
  });

  // Checkbox: Select all logic
  useEffect(() => {
    const allChecked =
      filteredOrders.length > 0 &&
      filteredOrders.every((order) => checkedItems[order.id]);
    setAllCheckList(allChecked);
  }, [checkedItems, filteredOrders]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAllCheckboxChange = () => {
    const newState = !allCheckList;
    const newCheckedItems = {};
    filteredOrders.forEach((order) => {
      newCheckedItems[order.id] = newState;
    });
    setCheckedItems(newCheckedItems);
  };

  // Pagination
  const itemsPerPage = 10;
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const currentOrders = filteredOrders.slice(startItem - 1, endItem);

  // View / Edit
  const handleView = (order) => {
    setCurrentOrder(order);
    setIsEditing(false);
    setIsViewing(true);
  };

  const handleEdit = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setCurrentOrder(order);
      setIsEditing(true);
    }
  };

  const value = {
    orders,
    selectedTab,
    setSelectedTab,
    underlineStyle,
    tabRefs,
    selectedStatuses,
    setSelectedStatuses,
    toggleStatus: (status) =>
      setSelectedStatuses((prev) =>
        prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
      ),
    startDate,
    setStartDate,
    searchQuery,
    setSearchQuery,
    checkedItems,
    handleCheckboxChange,
    handleAllCheckboxChange,
    allCheckList,
    setAllCheckList,
    filteredOrders,
    currentOrders,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    startItem,
    endItem,
    handleView,
    handleEdit,
    currentOrder,
    isEditing,
    isViewing,
    setIsViewing,
    setCheckedItems,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};
