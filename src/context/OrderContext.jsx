import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialOrders } from '../data/orders';
import useTabIndicator from '../hooks/useTabIndicator';
import { showAppToast } from '../utils/appToast';

const OrderContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => useContext(OrderContext);


export const OrderProvider = ({ children }) => {
    const [orders] = useState(initialOrders);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState('All State');
    const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(selectedTab);
    const calendarRef = useRef(null);
    const filterRef = useRef(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [allCheckList, setAllCheckList] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target)) setOpenCalendar(false);
            if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilter(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleStatus = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAllCheckboxChange = () => {
        const newState = !allCheckList;
        setAllCheckList(newState);

        const newCheckedItems = {};
        filteredOrders.forEach(order => {
            newCheckedItems[order.id] = newState;
        });
        setCheckedItems(newCheckedItems);
    };

    const filteredOrders = orders.filter((order) => {
        const statusMatch =
            selectedTab === 'All State'
                ? (selectedStatuses.length === 0 || selectedStatuses.includes(order.status))
                : order.status === selectedTab;

        const searchMatch =
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase());

        const dateMatch = startDate
            ? new Date(order.date).toDateString() === startDate.toDateString()
            : true;

        return statusMatch && searchMatch && dateMatch;
    });


    const handleExport = () => {
        const selectedOrders = filteredOrders.filter(order => checkedItems[order.id]);

        if (selectedOrders.length === 0) {
            showAppToast({
                severity: 'warn',
                summary: 'Orders',
                detail: 'Please select at least one order to export.',
            });
            return;
        }

        // CSV headers
        const csvHeaders = [
            'Order ID',
            'Customer',
            'Date',
            'Status',
            'Payment Method',
            'Shipping Method',
            'Shipping Cost',
            'Product',
            'Size',
            'Qty',
            'UnitPrice',
            'Discount',
            'Tax'
        ];

        const csvRows = [];

        selectedOrders.forEach(order => {
            order.items.forEach(item => {
                csvRows.push([
                    order.orderId,
                    order.customer,
                    order.date,
                    order.status,
                    order.payMehod,
                    order.shippingMethod,
                    order.shippingCost,
                    item.product,
                    item.size,
                    item.qty,
                    item.UnitPrice,
                    item.discount,
                    item.tax
                ]);
            });
        });

        const csvContent = [csvHeaders, ...csvRows]
            .map(row => row.map(val => `"${val}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'selected_orders_detailed.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAppToast({
            severity: 'success',
            summary: 'Orders',
            detail: `${selectedOrders.length} order${selectedOrders.length > 1 ? 's' : ''} exported successfully.`,
        });
    };



    const handleView = (order) => {
        setCurrentOrder(order);
        setIsEditing(false);
        setIsViewing(true);
        showAppToast({
            severity: 'info',
            summary: 'Orders',
            detail: `${order.orderId} opened in preview.`,
        });
    };

    const handleEdit = (orderId) => {
        const order = orders.find((o) => o.id === orderId);
        if (order) {
            setCurrentOrder(order);
            setIsEditing(true);
            showAppToast({
                severity: 'info',
                summary: 'Orders',
                detail: `${order.orderId} opened for editing.`,
            });
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalItems = filteredOrders.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);


    const value = {
        orders,
        selectedTab,
        setSelectedTab,
        underlineStyle,
        getTabRef,
        tabListRef,
        startDate,
        setStartDate,
        openCalendar,
        setOpenCalendar,
        showFilter,
        setShowFilter,
        selectedStatuses,
        toggleStatus,
        calendarRef,
        filterRef,
        filteredOrders,
        checkedItems,
        handleCheckboxChange,
        handleAllCheckboxChange,
        allCheckList,
        setAllCheckList,
        searchQuery,
        setSearchQuery,
        handleExport,
        handleEdit,
        handleView,
        currentOrder,
        isEditing,
        isViewing,
        setIsViewing,
        setCheckedItems,
        setCurrentPage,
        currentPage,
        totalPages,
        startItem,
        endItem,
        totalItems,
        currentOrders
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};



