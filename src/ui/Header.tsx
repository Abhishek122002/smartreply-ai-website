import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onNewChat: () => void;
  onOpenHistorySession: (session: any) => void;
}

export default function Header({ onNewChat, onOpenHistorySession }: Props) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  
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

  /* LOCK BODY SCROLL WHEN MENU OPEN */
  useEffect(() => {
  const html = document.documentElement;

  if (menuOpen) {
    html.classList.add("overflow-hidden");
  } else {
    html.classList.remove("overflow-hidden");
  }

  return () => {
    html.classList.remove("overflow-hidden");
  };
}, [menuOpen]);


  /* LOGOUT */
  const handleLogout = async () => {
    localStorage.removeItem("sr_user");
    localStorage.removeItem("sr_token");

    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("sb-") && k.endsWith("-auth-token")) {
        localStorage.removeItem(k);
      }
    });

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

  /* GROUP HISTORY */
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

  /* GET INITIALS */
const getInitials = (name: string) => {
  if (!name) return "";

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

  return (
    <>
      {/* HEADER */}
      <header className="h-14 border-b bg-white flex items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Hamburger - visible on ALL devices */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>

        <h1 className="font-semibold text-sm md:text-base lg:text-lg truncate">
          DoDraft AI</h1>

       {!user ? (
  <button
    onClick={() => navigate("/login")}
    className="px-3 py-1.5 rounded border"
  >
    Log in
  </button>
) : (
  <>
    {/* Desktop & Tablet */}
    <span className="hidden sm:block text-sm text-gray-600 truncate max-w-[180px]">
      Hi, {user.name}
    </span>

    {/* Mobile Only */}
    <div className="sm:hidden w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
      {getInitials(user.name)}
    </div>
  </>
)}
      </header>

      {/* DRAWER OVERLAY (ALL DEVICES) */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full
          w-[85%] sm:w-[360px] md:w-[380px] lg:w-[400px]
          bg-white border-r shadow-2xl
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Menu Header */}
          <div className="p-4 border-b flex justify-between">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          {/* New Chat */}
          <button
            onClick={() => {
              onNewChat();
              setMenuOpen(false);
            }}
            className="text-left px-4 py-2.5 hover:bg-gray-50"
          >
            + New chat
          </button>

          <div className="mt-2 px-4 text-xs text-gray-500 tracking-wide">
            HISTORY
          </div>

          {/* History */}
          <div className="flex-1 min-h-0 overflow-y-auto mt-1">
            {history.length === 0 && (
              <p className="text-gray-400 text-sm px-4 mt-3">
                No conversations yet
              </p>
            )}

            {[...groups.today, ...groups.yesterday, ...groups.previous].map(
              (item) => (
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
              )
            )}
          </div>

          {/* Bottom User Section */}
          {user && (
            <div className="border-t p-4 space-y-3">
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
                onClick={() => {
  navigate("/account");
  setMenuOpen(false);
}}
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
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] sm:w-[480px] relative">
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

     
    </>
  );
}
