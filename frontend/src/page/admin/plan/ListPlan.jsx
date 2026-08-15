import React, { useEffect, useState } from "react";
import { useApiState } from "../../../hook/useApiSate";
import { deletePlan, getplan } from "../../../api/plan/plan";
import {
  Package,
  Plus,
  Search,
  DollarSign,
  Calendar,
  Briefcase,
  Star,
  Eye,
  Trash2,
  Edit,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogoutModal from "../../../components/modals/logoutModal";
import SuccessModal from "../../../components/modals/SuccessModal";

const ListPlan = () => {
  const { error, setError } = useApiState();
  const [loading, setLoading] = useState(true);
  const [listPlan, setListPlan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showsucess, setShowsucess] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add this state

  const getPlanApi = async () => {
    try {
      const res = await getplan();
      if (res?.success) {
        setListPlan(res.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deletePlan(id);
      getPlanApi();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPlanApi();
  }, []);

  const filteredPlans = listPlan.filter((plan) =>
    plan.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRevenue = listPlan.reduce(
    (s, p) => s + parseFloat(p.price || 0),
    0,
  );
  const avgPrice =
    listPlan.length > 0 ? (totalRevenue / listPlan.length).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="bg-gray-800 text-white p-2 rounded-xl">
                <Package className="w-6 h-6" />
              </span>
              កញ្ចប់សេវាកម្ម
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              គ្រប់គ្រងកញ្ចប់សេវាកម្មទាំងអស់ក្នុងប្រព័ន្ធ
            </p>
          </div>
          <Link to="/admin/plan/add">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
              <Plus className="w-4 h-4" />
              បង្កើតថ្មី
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">សរុបកញ្ចប់</p>
                <p className="text-2xl font-bold text-gray-800">
                  {listPlan.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% ពីខែមុន
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">ប្រាក់ចំណូលសរុប</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${totalRevenue}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% ពីខែមុន
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">តម្លៃមធ្យម</p>
                <p className="text-2xl font-bold text-gray-800">${avgPrice}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              អតិបរមា{" "}
              {listPlan.length > 0
                ? Math.max(
                    ...listPlan.map((p) => parseInt(p.duration_days || 0)),
                  )
                : 0}
              ថ្ងៃ
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">កញ្ចប់សកម្ម</p>
                <p className="text-2xl font-bold text-gray-800">
                  {listPlan.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
              <Star className="w-3 h-3" />
              {listPlan.filter((p) => parseInt(p.featured_job) > 0).length}{" "}
              កញ្ចប់ពិសេស
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ស្វែងរកកញ្ចប់សេវាកម្ម..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none transition text-sm"
              />
            </div>
            <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
              {filteredPlans.length} កញ្ចប់
            </span>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-400 mt-3">កំពុងផ្ទុក...</p>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">មិនមានកញ្ចប់សេវាកម្ម</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      ឈ្មោះ
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      តម្លៃ
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      រយៈពេល
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      ការងារ
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      ពិសេស
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      CV
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      ស្ថានភាព
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      សកម្មភាព
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPlans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-50 transition-all group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition">
                            <Package className="w-5 h-5 text-gray-700" />
                          </div>
                          <span className="font-medium text-gray-800">
                            {plan.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          {plan.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {plan.duration_days} ថ្ងៃ
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          {plan.job_limit}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {plan.featured_job}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Eye className="w-4 h-4 text-gray-400" />
                          {plan.cv_access}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            Number(plan.status) === 1
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {Number(plan.status) === 1 ? "សកម្ម" : "អសកម្ម"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/admin/plans/edit/${plan.id}`}>
                            <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                              <Edit className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedCategoryId(plan.id);
                              setShowdelete(true);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <LogoutModal
                isOpen={showdelete}
                onClose={() => {
                  setShowdelete(false);
                  setSelectedCategoryId(null); // Clear the selected ID
                }}
                title="តើអ្នកពិតជាចង់លុបប្រភេទអាជីវកម្មនេះមែនទេ?"
                message="ការលុបហើយនឹងមិនអាចស្តារទីន្នីន័យមកវិញបានទេ"
                onConfirm={() => {
                  if (selectedCategoryId) {
                    handleDelete(selectedCategoryId); // Use the stored ID
                  }
                  setShowdelete(false);
                  setSelectedCategoryId(null);
                  setShowsucess(true);
                }}
              />
              <SuccessModal
                open={showsucess}
                onClose={() => setShowsucess(false)}
                title="ការលុបបានជោគជ័យ"
                message="ព័ត៌មានប្រភេទអាជីវកម្មត្រូវបានកែប្រែដោយជោគជ័យ។"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPlan;
