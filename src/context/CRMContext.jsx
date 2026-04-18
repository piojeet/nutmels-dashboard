/* This code snippet is creating a context provider and custom hooks for managing CRM (Customer
Relationship Management) related data in a React application. Here's a breakdown of what the code is
doing: */
import { createContext, useContext, useState, useEffect } from 'react';
import { crmProfile } from '../data/crmdata';
import useTabIndicator from '../hooks/useTabIndicator';
import { showAppToast } from '../utils/appToast';

const CRMContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCRM = () => useContext(CRMContext);

export const CRMProvider = ({ children }) => {
  const [orders, setOrders] = useState(crmProfile);
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

  const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(selectedTab);

  // Filter logic
const filteredOrders = orders.filter((order) => {
  const searchMatch =
    order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.emailId?.toLowerCase().includes(searchQuery.toLowerCase());

  const dateMatch = startDate
    ? new Date(order.date).toDateString() === startDate.toDateString()
    : true;

  return searchMatch && dateMatch;
});

// Delete handler
const handleDelete = (orderId) => {
  const deletedOrder = orders.find((order) => order.id === orderId);
  setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

  // Clean checkedItems if deleted
  setCheckedItems((prev) => {
    const updated = { ...prev };
    delete updated[orderId];
    return updated;
  });

  if (deletedOrder) {
    showAppToast({
      severity: 'success',
      summary: 'CRM',
      detail: `${deletedOrder.customerName} removed from the list.`,
    });
  }
};


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
    showAppToast({
      severity: 'info',
      summary: 'CRM',
      detail: `${order.customerName} opened in preview.`,
    });
  };

  const handleEdit = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setCurrentOrder(order);
      setIsEditing(true);
      showAppToast({
        severity: 'info',
        summary: 'CRM',
        detail: `${order.customerName} opened for editing.`,
      });
    }
  };

  const value = {
    orders,
    selectedTab,
    setSelectedTab,
    underlineStyle,
    getTabRef,
    tabListRef,
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
    setOrders,
    handleDelete,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};



