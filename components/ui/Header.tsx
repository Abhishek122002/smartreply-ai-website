import { useState, useEffect } from "react";
import AccountModal from "../../src/account/AccountModal";
import { useNavigate } from "react-router-dom";

interface Props {
  onNewChat: () => void;
  onOpenHistorySession: (session: any) => void;
}

export default function Header({ onNewChat, onOpenHistorySession }: Props) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  /* LOAD USER */
  const loadUser = () => {
    const saved = localStorage.getItem("sr_user");
    setUser(saved ? JSON.parse(saved) : null);
  };

  /* LOAD HISTORY */
  const loadHistory = () => {
    const saved = localStorage.getItem("sr_history");
    setHistory(saved ? JSON.parse(saved) : []);
  };

  useEffect(() => {
    loadUser();
    loadHistory();

    window.addEventListener("storage", loadUser);
    window.addEventListener("storage", loadHistory);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("storage", loadHistory);
    };
  }, []);

  /* LOGOUT */
 const handleLogout = async () => {
  // ✅ Remove your normal auth
  localStorage.removeItem("sr_user");
  localStorage.removeItem("sr_token");

  // ✅ Remove any supabase auth keys too (IMPORTANT)
  Object.keys(localStorage).forEach((k) => {
    if (k.startsWith("sb-") && k.endsWith("-auth-token")) {
      localStorage.removeItem(k);
    }
  });

  // ✅ OPTIONAL: also clear session storage
  sessionStorage.clear();

  loadUser();
  setMenuOpen(false);
};

  /* DELETE HISTORY ITEM */
  const handleDeleteHistory = (id: string) => {
    const filtered = history.filter((h) => h.id !== id);

    setHistory(filtered);
    localStorage.setItem("sr_history", JSON.stringify(filtered));

    window.dispatchEvent(new Event("storage"));
  };

  /* TITLE TRIM */
  const getTitle = (item: any) => {
    const first = item?.conversations?.[0];
    if (!first?.replyFor) return "Untitled conversation";

    return first.replyFor.length > 40
      ? first.replyFor.slice(0, 40) + "..."
      : first.replyFor;
  };

  /* GROUP BY DATE */
  const groupHistory = () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    const groups = {
      today: [] as any[],
      yesterday: [] as any[],
      previous: [] as any[],
    };

    history.forEach((item) => {
      const d = new Date(item.createdAt);

      if (isSameDay(d, today)) groups.today.push(item);
      else if (isSameDay(d, yesterday)) groups.yesterday.push(item);
      else groups.previous.push(item);
    });

    return groups;
  };

  const groups = groupHistory();

  return (
    <>
      <header className="h-14 border-b bg-white flex items-center justify-between px-4">
        <button onClick={() => setMenuOpen(true)} className="text-xl">
          ☰
        </button>

        <h1 className="font-semibold">SmartReply AI</h1>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1.5 rounded border"
          >
            Log in
          </button>
        ) : (
          <span className="text-sm text-gray-600">Hi, {user.name}</span>
        )}
      </header>

      {menuOpen && (
        <div className="fixed top-0 left-0 h-full w-[300px] bg-white border-r shadow-xl z-40 flex flex-col">
          <div className="p-4 border-b flex justify-between">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          <button
            onClick={() => {
              onNewChat();
              setMenuOpen(false);
            }}
            className="text-left px-4 py-3 hover:bg-gray-50"
          >
            + New chat
          </button>

          <div className="mt-2 px-4 text-xs text-gray-500 tracking-wide">
            HISTORY
          </div>

          <div className="flex-1 overflow-y-auto mt-1">
            {history.length === 0 && (
              <p className="text-gray-400 text-sm px-4 mt-3">
                No conversations yet
              </p>
            )}

            {groups.today.length > 0 && (
              <>
                <p className="px-4 mt-3 mb-1 text-xs text-gray-500">Today</p>
                {groups.today.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between group px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <button
                      className="text-left flex-1"
                      onClick={() => {
                        onOpenHistorySession(item);
                        setMenuOpen(false);
                      }}
                    >
                      {getTitle(item)}
                    </button>

                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </>
            )}

            {groups.yesterday.length > 0 && (
              <>
                <p className="px-4 mt-3 mb-1 text-xs text-gray-500">
                  Yesterday
                </p>
                {groups.yesterday.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between group px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <button
                      className="text-left flex-1"
                      onClick={() => {
                        onOpenHistorySession(item);
                        setMenuOpen(false);
                      }}
                    >
                      {getTitle(item)}
                    </button>

                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </>
            )}

            {groups.previous.length > 0 && (
              <>
                <p className="px-4 mt-3 mb-1 text-xs text-gray-500">
                  Previous
                </p>
                {groups.previous.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between group px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <button
                      className="text-left flex-1"
                      onClick={() => {
                        onOpenHistorySession(item);
                        setMenuOpen(false);
                      }}
                    >
                      {getTitle(item)}
                    </button>

                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {user && (
            <div className="border-t p-3 space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {user.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                onClick={() => navigate("/pricing")}
              >
                Upgrade plan
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                onClick={() => setShowAccount(true)}
              >
                Account
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                onClick={() => setShowSettings(true)}
              >
                Settings
              </button>
            </div>
          )}
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[420px] relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Settings</h2>

            <button onClick={handleLogout} className="text-red-600 mt-4">
              Log out
            </button>
          </div>
        </div>
      )}

      {showAccount && (
        <AccountModal onClose={() => setShowAccount(false)} />
      )}
    </>
  );
}
