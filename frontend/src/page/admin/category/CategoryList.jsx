import React, { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../../api/job/jobcategory";
import Loading from "../../../components/common/Loading";
import { Link } from "react-router-dom";
import LogoutModal from "../../../components/modals/logoutModal";
import SuccessModal from "../../../components/modals/SuccessModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showdelete, setShowdelete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add this state
  const [showsucess, setShowsucess] = useState(false);
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ប្រភេទការងារ</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            គ្រប់គ្រងប្រភេទការងារទាំងអស់
          </p>
        </div>
        <Link to="/admin/categories/create">
          <button className="px-5 py-2.5 bg-gray-700 hover:bg-gray-900 text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            បន្ថែមថ្មី
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="text-left px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                រូបតំណាង
              </th>
              <th className="text-left px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ឈ្មោះប្រភេទ
              </th>
              <th className="text-left px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ថ្ងៃបង្កើត
              </th>
              <th className="text-left px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ស្ថានភាព
              </th>
              <th className="text-right px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                សកម្មភាព
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr
                  key={category.id}
                  className="group hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <td className="px-8 py-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                      <img
                        src={category.icon_url}
                        alt={category.name}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </td>

                  <td className="px-8 py-4">
                    <span className="font-medium text-gray-900">
                      {category.name}
                    </span>
                  </td>

                  <td className="px-8 py-4">
                    <span className="text-sm text-gray-500">
                      {new Date(category.created_at).toLocaleDateString(
                        "km-KH",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </td>

                  <td className="px-8 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      សកម្ម
                    </span>
                  </td>

                  <td className="px-8 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/categories/edit/${category.id}`}>
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="កែប្រែ"
                        >
                          <svg
                            className="w-4.5 h-4.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedCategoryId(category.id); // Store the ID
                          setShowdelete(true);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="លុប"
                      >
                        <svg
                          className="w-4.5 h-4.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      មិនមានប្រភេទការងារ
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      ចាប់ផ្តើមដោយបង្កើតប្រភេទថ្មី
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {categories.length > 0 && (
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            បង្ហាញ{" "}
            <span className="font-semibold text-gray-700">
              {categories.length}
            </span>{" "}
            ប្រភេទ
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              មុន
            </button>
            <button className="px-3.5 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              ១
            </button>
            <button className="px-3.5 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              ២
            </button>
            <button className="px-3.5 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              ៣
            </button>
            <button className="px-3.5 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              បន្ទាប់
            </button>
          </div>
        </div>
      )}

      <LogoutModal
        isOpen={showdelete}
        onClose={() => {
          setShowdelete(false);
          setSelectedCategoryId(null); // Clear the selected ID
        }}
        title="តើអ្នកពិតជាចង់លុបប្រភេទការងារនេះមែនទេ?"
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
        message="ព័ត៌មានប្រភេទការងារត្រូវបានកែប្រែដោយជោគជ័យ។"
      />
    </div>
  );
};

export default CategoryList;
