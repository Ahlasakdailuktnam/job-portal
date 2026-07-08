import React, { useEffect, useState } from "react";
import { Bell, MessageCircle, Save, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";
import {
  useRecruiterSettings,
  useUpdateRecruiterSettings,
} from "../../hook/useRecruiterSettings";

const RecruiterSettings = () => {
  const { data, isLoading, error } = useRecruiterSettings();
  const updateSettings = useUpdateRecruiterSettings();
  const [formData, setFormData] = useState({
    telegram_chat_id: "",
    telegram_notifications: false,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        telegram_chat_id: data.telegram_chat_id || "",
        telegram_notifications: Boolean(data.telegram_notifications),
      });
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    updateSettings.mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || "Settings updated");
      },
      onError: (mutationError) => {
        toast.error(
          mutationError?.response?.data?.message || "Unable to update settings",
        );
      },
    });
  };

  return (
    <div className="px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 text-white">
              <Settings size={21} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Recruiter Settings
              </h1>
              <p className="text-sm text-gray-500">
                Manage notification preferences for your recruiter account.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading settings...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-sm text-red-500">
              {error?.response?.data?.message || "Unable to load settings"}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <section className="rounded-lg border border-gray-200 p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Telegram notifications
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Receive alerts when applications arrive or statuses
                        change.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        telegram_notifications: !prev.telegram_notifications,
                      }))
                    }
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      formData.telegram_notifications
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {formData.telegram_notifications ? (
                      <ToggleRight size={20} />
                    ) : (
                      <ToggleLeft size={20} />
                    )}
                    {formData.telegram_notifications ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Telegram chat ID
                </label>
                <div className="relative">
                  <MessageCircle
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={formData.telegram_chat_id}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        telegram_chat_id: event.target.value,
                      }))
                    }
                    placeholder="Example: 123456789"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-700"
                  />
                </div>
              </section>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={updateSettings.isPending}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
                >
                  <Save size={16} />
                  {updateSettings.isPending ? "Saving..." : "Save settings"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterSettings;
