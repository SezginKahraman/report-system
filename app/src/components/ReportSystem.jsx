import { ArrowLeft, FileText, ArrowUpDown, ArrowRight } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const colors = {
  primary: '#003507',
  complement: '#327DA9',
  accent1: '#F6BE00',
  accent2: '#E66E24',
  accent3: '#840028',
  accent4: '#42892E',
  accent5: '#7C235E',
  neutral1: '#404048',
  neutral2: '#63666A',
  neutral3: '#D0D0CD'
};
const API_BASE_URL = 'https://localhost:7281';

// API servis fonksiyonları
const api = {
  async getReports(page = 1, pageSize = 10) {
    try {
      const response = await fetch(
        //`${API_BASE_URL}/api/entrareports?page=${page}&pageSize=${pageSize}`
        `${API_BASE_URL}/api/EntraReports/getall`
      );
      if (!response.ok) throw new Error('Reports fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  async getRoles(page = 1, pageSize = 10, searchTerm = '', sortField = '', sortDirection = '') {
    try {
      const params = new URLSearchParams({
        // page: page.toString(),
        // pageSize: pageSize.toString(),
        searchTerm,
        sortField,
        sortDirection
      });

      const response = await fetch(`${API_BASE_URL}/api/entrarole/getall?${params}`);
      if (!response.ok) throw new Error('Roles fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  async getUserRoles(roleName, page = 1, pageSize = 10, searchTerm = '', sortField = '', sortDirection = '') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        searchTerm,
        sortField,
        sortDirection
      });

      const response = await fetch(
        `${API_BASE_URL}/api/roles/${encodeURIComponent(roleName)}/users?${params}`
      );
      if (!response.ok) throw new Error('User roles fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
  }
};

export default function ReportSystem() {
  // State tanımlamaları
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [userSortConfig, setUserSortConfig] = useState({ key: '', direction: 'asc' });

  // Pagination states
  const [reportsPagination, setReportsPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [rolesPagination, setRolesPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [userRolesPagination, setUserRolesPagination] = useState({ page: 1, pageSize: 10, total: 0 });

  // Data states
  const [reports, setReports] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [userRolesData, setUserRolesData] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    reports: false,
    roles: false,
    userRoles: false
  });

  // Error states
  const [error, setError] = useState({
    reports: null,
    roles: null,
    userRoles: null
  });

  // Reports fetching
  useEffect(() => {
    async function fetchReports() {
      setLoading(prev => ({ ...prev, reports: true }));
      try {
        const result = await api.getReports(reportsPagination.page, reportsPagination.pageSize);
        console.log(result.$values);
        setReports(prevReports => [...prevReports, ...result.$values]);
        setReportsPagination(prev => ({ ...prev, total: result.$values.length }));
      } catch (err) {
        setError(prev => ({ ...prev, reports: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, reports: false }));
      }
    }

    fetchReports();
  }, [reportsPagination.page, reportsPagination.pageSize]);

  // Roles fetching
  useEffect(() => {
    async function fetchRoles() {
      if (currentPage !== 'detail') return;

      setLoading(prev => ({ ...prev, roles: true }));
      try {
        const result = await api.getRoles(
          rolesPagination.page,
          rolesPagination.pageSize,
          searchTerm,
          sortConfig.key,
          sortConfig.direction
        );
        setRoleData(result.data);
        setRolesPagination(prev => ({ ...prev, total: result.total }));
      } catch (err) {
        setError(prev => ({ ...prev, roles: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, roles: false }));
      }
    }

    fetchRoles();
  }, [currentPage, rolesPagination.page, rolesPagination.pageSize, searchTerm, sortConfig]);

  // User roles fetching
  useEffect(() => {
    async function fetchUserRoles() {
      if (!selectedRole) return;

      setLoading(prev => ({ ...prev, userRoles: true }));
      try {
        const result = await api.getUserRoles(
          selectedRole.roleName,
          userRolesPagination.page,
          userRolesPagination.pageSize,
          userSearchTerm,
          userSortConfig.key,
          userSortConfig.direction
        );
        setUserRolesData(result.data);
        setUserRolesPagination(prev => ({ ...prev, total: result.total }));
      } catch (err) {
        setError(prev => ({ ...prev, userRoles: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, userRoles: false }));
      }
    }

    fetchUserRoles();
  }, [selectedRole, userRolesPagination.page, userRolesPagination.pageSize, userSearchTerm, userSortConfig]);

  // const reports = [
  //   {
  //     id: 1,
  //     name: "EntraID Privilege Role Dashboard Report",
  //     description: "Role assignments and eligibility analysis",
  //     date: "2024-03-15",
  //     type: "Security"
  //   }
  // ];

  // const roleData = [
  //   { id: 1, roleName: "Global Administrator", assigned: true, eligible: false },
  //   { id: 2, roleName: "Security Administrator", assigned: true, eligible: true },
  //   { id: 3, roleName: "User Administrator", assigned: false, eligible: true },
  //   { id: 4, roleName: "License Administrator", assigned: true, eligible: true },
  //   { id: 5, roleName: "Admin", assigned: false, eligible: false }
  // ];

  // const userRolesData = {
  //   "Global Administrator": [
  //     {
  //       id: 1,
  //       roleName: "Global Administrator",
  //       userName: "John Smith",
  //       userPrincipalName: "john.smith@company.com",
  //       type: "Group Membership",
  //       assignment: true,
  //       lastActivated: "2024-03-15T14:30:00"
  //     },
  //     {
  //       id: 2,
  //       roleName: "Global Administrator",
  //       userName: "Emma Wilson",
  //       userPrincipalName: "emma.wilson@company.com",
  //       type: "Directly Assigned",
  //       assignment: true,
  //       lastActivated: "2024-03-14T09:15:00"
  //     }
  //   ],
  //   "Security Administrator": [
  //     {
  //       id: 3,
  //       roleName: "Security Administrator",
  //       userName: "Michael Brown",
  //       userPrincipalName: "michael.brown@company.com",
  //       type: "Directly Assigned",
  //       assignment: true,
  //       lastActivated: "2024-03-13T16:45:00"
  //     }
  //   ]
  // };

  const handleSort = (key, isUserTable = false) => {
    if (isUserTable) {
      setUserSortConfig(prev => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setSortConfig(prev => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    }
  };

  const filteredAndSortedRoles = useMemo(() => {
    let filtered = roleData.filter(role =>
      role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === 'roleName') {
          const compareResult = a.roleName.localeCompare(b.roleName);
          return sortConfig.direction === 'asc' ? compareResult : -compareResult;
        } else {
          const compareResult = (a[sortConfig.key] === b[sortConfig.key]) ? 0 : a[sortConfig.key] ? -1 : 1;
          return sortConfig.direction === 'asc' ? compareResult : -compareResult;
        }
      });
    }

    return filtered;
  }, [roleData, searchTerm, sortConfig]);

  const filteredAndSortedUsers = useMemo(() => {
    if (!selectedRole) return [];

    let users = userRolesData[selectedRole.roleName] || [];

    let filtered = users.filter(user =>
      user.userName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.userPrincipalName.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    if (userSortConfig.key) {
      filtered.sort((a, b) => {
        if (['roleName', 'userName', 'userPrincipalName', 'type'].includes(userSortConfig.key)) {
          const compareResult = a[userSortConfig.key].localeCompare(b[userSortConfig.key]);
          return userSortConfig.direction === 'asc' ? compareResult : -compareResult;
        } else if (userSortConfig.key === 'lastActivated') {
          const dateA = new Date(a.lastActivated);
          const dateB = new Date(b.lastActivated);
          return userSortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        } else {
          const compareResult = (a[userSortConfig.key] === b[userSortConfig.key]) ? 0 : a[userSortConfig.key] ? -1 : 1;
          return userSortConfig.direction === 'asc' ? compareResult : -compareResult;
        }
      });
    }

    return filtered;
  }, [selectedRole, userSearchTerm, userSortConfig]);

  const pieData = useMemo(() => {
    const assignedCount = roleData.filter(role => role.assigned).length;
    const eligibleCount = roleData.filter(role => role.eligible).length;

    return [
      { name: 'Assigned', value: assignedCount },
      { name: 'Eligible', value: eligibleCount }
    ];
  }, [roleData]);

  // Pagination component
  const PaginationControls = ({ pagination, onChange, loading }) => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onChange(Math.max(1, pagination.page - 1))}
              disabled={pagination.page === 1 || loading}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => onChange(i + 1)}
                isActive={pagination.page === i + 1}
                disabled={loading}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onChange(Math.min(totalPages, pagination.page + 1))}
              disabled={pagination.page === totalPages || loading}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }) => (
    <div className="text-red-500 text-center p-4">
      Error: {message}
    </div>
  );

  if (currentPage === 'list') {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>Reports</h1>
        {loading.reports ? (
          <LoadingSpinner />
        ) : error.reports ? (
          <ErrorMessage message={error.reports} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <Card
                  key={report.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedReportId(report.id);
                    setCurrentPage('detail');
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.complement}20` }}>
                        <FileText className="w-6 h-6" style={{ color: colors.complement }} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                          {report.name}
                        </h2>
                        <p className="text-sm mb-3" style={{ color: colors.neutral2 }}>
                          {report.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm" style={{ color: colors.neutral2 }}>{report.date}</span>
                          <span className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                            {report.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <PaginationControls
              pagination={reportsPagination}
              onChange={(page) => setReportsPagination(prev => ({ ...prev, page }))}
              loading={loading.reports}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
        <div className="w-16 h-16 rounded flex items-center justify-center"
          style={{ backgroundColor: `${colors.complement}20` }}>
          <FileText className="w-8 h-8" style={{ color: colors.complement }} />
        </div>

        <h1 className="text-2xl font-semibold" style={{ color: colors.primary }}>
          {selectedRole ? `User Roles - ${selectedRole.roleName}` : reports[0].name}
        </h1>

        <div className="flex gap-2">
          {selectedRole ? (
            <Button
              variant="outline"
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Roles
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setCurrentPage('list')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Reports
            </Button>
          )}
        </div>
      </div>

      {!selectedRole ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="flex-1">
            <CardContent className="p-6">

              {loading.roles ? (
                <LoadingSpinner />
              ) : error.roles ? (
                <ErrorMessage message={error.roles} />
              ) : (
                <>
                  <div className="mb-4">
                    <Input
                      placeholder="Search by role name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-3 text-left border">
                            <button
                              className="flex items-center gap-2"
                              onClick={() => handleSort('roleName')}
                            >
                              Role Name
                              <ArrowUpDown className="h-4 w-4" />
                            </button>
                          </th>
                          <th className="p-3 text-left border">
                            <button
                              className="flex items-center gap-2"
                              onClick={() => handleSort('assigned')}
                            >
                              Assigned
                              <ArrowUpDown className="h-4 w-4" />
                            </button>
                          </th>
                          <th className="p-3 text-left border">
                            <button
                              className="flex items-center gap-2"
                              onClick={() => handleSort('eligible')}
                            >
                              Eligible
                              <ArrowUpDown className="h-4 w-4" />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedRoles.map((role) => (
                          <tr
                            key={role.id}
                            onClick={() => (role.assigned || role.eligible) && setSelectedRole(role)}
                            className={(role.assigned || role.eligible) ? 'cursor-pointer hover:bg-gray-50' : ''}
                          >
                            <td className="p-3 border">{role.roleName}</td>
                            <td className="p-3 border">
                              <span className={`px-2 py-1 rounded ${role.assigned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {role.assigned ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="p-3 border">
                              <span className={`px-2 py-1 rounded ${role.eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {role.eligible ? 'Yes' : 'No'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationControls
                    pagination={rolesPagination}
                    onChange={(page) => setRolesPagination(prev => ({ ...prev, page }))}
                    loading={loading.roles}
                  />
                </>
              )}
            </CardContent>
          </Card>

          <Card className="lg:w-[400px]">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill={colors.primary} />
                      <Cell fill={colors.complement} />
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            {loading.userRoles ? (
              <LoadingSpinner />
            ) : error.userRoles ? (
              <ErrorMessage message={error.userRoles} />
            ) : (
              <>
                <div className="mb-4">
                  <Input
                    placeholder="Search by user name or email..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-left border">
                          <button
                            className="flex items-center gap-2"
                            onClick={() => handleSort('userName', true)}
                          >
                            User Name
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="p-3 text-left border">
                          <button
                            className="flex items-center gap-2"
                            onClick={() => handleSort('userPrincipalName', true)}
                          >
                            User Principal Name
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="p-3 text-left border">
                          <button
                            className="flex items-center gap-2"
                            onClick={() => handleSort('type', true)}
                          >
                            Type
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="p-3 text-left border">
                          <button
                            className="flex items-center gap-2"
                            onClick={() => handleSort('assignment', true)}
                          >
                            Assignment
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="p-3 text-left border">
                          <button
                            className="flex items-center gap-2"
                            onClick={() => handleSort('lastActivated', true)}
                          >
                            Last Activated
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="p-3 border">{user.userName}</td>
                          <td className="p-3 border">{user.userPrincipalName}</td>
                          <td className="p-3 border">
                            <span className={`px-2 py-1 rounded ${user.type === 'Directly Assigned'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                              }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="p-3 border">
                            <span className={`px-2 py-1 rounded ${user.assignment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {user.assignment ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="p-3 border">
                            {new Date(user.lastActivated).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationControls
                  pagination={userRolesPagination}
                  onChange={(page) => setUserRolesPagination(prev => ({ ...prev, page }))}
                  loading={loading.userRoles}
                />
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}