import React, { useState, useEffect } from 'react';
import CompanyQA from '../components/CompanyQA';
const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State for Provisioning
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Engineering',
    role: 'employee',
  });
  const [submitting, setSubmitting] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/api/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to load employee roster.');
      }

      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data.employees || []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      // Fallback empty array if endpoint returns 404/not populated yet
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/api/hr/create-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to provision employee account.');
      }

      setSuccessMsg(`Employee account created successfully for ${formData.name}!`);
      setFormData({
        name: '',
        email: '',
        password: '',
        department: 'Engineering',
        role: 'employee',
      });
      fetchEmployees(); // Refresh roster
    } catch (err) {
      setError(err.message || 'Error provisioning account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Employee Provisioning Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
        <h3 className="text-base font-semibold text-white mb-2">
          Provision New Employee Account
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Create credentials for hired talent to give them instant access to the Employee Onboarding Portal.
        </p>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 bg-emerald-500/10 border border-emerald-500 text-emerald-400 text-xs p-3 rounded-lg">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Initial Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Provisioning...' : 'Provision Account'}
            </button>
          </div>
        </form>
      </div>

      {/* Active Employees Roster */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
        <h3 className="text-base font-semibold text-white mb-4">
          Active Onboarding Employees ({employees.length})
        </h3>

        {loading ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            Loading active employee roster...
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-8 bg-slate-800/40 rounded-lg border border-dashed border-slate-700 text-slate-400 text-xs">
            No employee accounts provisioned yet. Use the form above to invite new hires.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Onboarding Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {employees.map((emp) => (
                  <tr key={emp._id || emp.email} className="hover:bg-slate-800/50">
                    <td className="p-3">
                      <div className="font-medium text-white">{emp.name}</div>
                      <div className="text-slate-400 text-[11px]">{emp.email}</div>
                    </td>
                    <td className="p-3">{emp.department || 'Engineering'}</td>
                    <td className="p-3 capitalize">{emp.role || 'employee'}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        In Progress
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManager;