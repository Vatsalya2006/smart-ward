import { useState, useMemo } from 'react';
import { Search, Filter, Users, LayoutGrid, List, UserX } from 'lucide-react';
import StaffNavbar from '../../components/staff/StaffNavbar';
import StaffPatientCard from '../../components/staff/StaffPatientCard';
import { mockPatients } from '../../data/mockStaffData';

export default function StaffPatients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [viewMode, setViewMode] = useState('card');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    let list = mockPatients;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') {
      list = list.filter(p => {
        const s = (p.status || '').toLowerCase();
        if (statusFilter === 'moderate') return s === 'moderate' || s === 'warning';
        if (statusFilter === 'stable') return s === 'stable' || s === 'normal';
        return s === statusFilter;
      });
    }
    if (genderFilter !== 'all') {
      list = list.filter(p => (p.gender || '').toLowerCase() === genderFilter);
    }
    return list;
  }, [search, statusFilter, genderFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statusBtns = [
    { key: 'all', label: 'All' },
    { key: 'critical', label: 'Critical' },
    { key: 'moderate', label: 'Moderate' },
    { key: 'stable', label: 'Stable' },
  ];

  return (
    <div>
      <StaffNavbar />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-900 tracking-tight">Assigned Patients</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and monitor your assigned patients</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by name or ID…" value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border-2 border-emerald-100 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all backdrop-blur-sm" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            {statusBtns.map(({ key, label }) => (
              <button key={key} onClick={() => { setStatusFilter(key); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${statusFilter === key ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'text-slate-500 hover:text-emerald-700 bg-white/60 border border-slate-200 hover:border-emerald-200'}`}>
                {label}
              </button>
            ))}
          </div>

          <select value={genderFilter} onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 rounded-xl bg-white/70 border border-emerald-100 text-sm text-slate-700 focus:outline-none focus:border-emerald-400">
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <div className="flex items-center gap-1 bg-white/60 border border-emerald-100 rounded-xl p-1">
            <button onClick={() => setViewMode('card')} className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400'}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users className="w-4 h-4" />
          <span>Showing <span className="font-semibold text-slate-700">{filtered.length}</span> patient{filtered.length !== 1 && 's'}</span>
        </div>

        {paginated.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <UserX className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-500 mb-2">No patients found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginated.map((p, i) => (
              <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <StaffPatientCard patient={p} viewMode="card" />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-100 bg-emerald-50/30">
                    {['Patient','Age','Gender','Contact','Last Visit','Status','Action'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {paginated.map(p => <StaffPatientCard key={p.id} patient={p} viewMode="table" />)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 text-emerald-700 bg-white/60 hover:bg-emerald-50 disabled:opacity-40 transition-all">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${currentPage === page ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'text-slate-600 hover:bg-emerald-50 border border-emerald-100'}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 text-emerald-700 bg-white/60 hover:bg-emerald-50 disabled:opacity-40 transition-all">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
