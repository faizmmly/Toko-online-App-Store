'use client'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Bell, ShoppingBag, CheckCircle, CreditCard, Clock } from "lucide-react";

// Contoh data statis notifikasi transaksi (nanti bisa diambil dari state / database)
const dummyNotifications = [
  {
    id: 1,
    type: "success",
    title: "Pembayaran Berhasil!",
    description: "Jersey Boxy Unisex kamu sedang dipersiapkan oleh toko.",
    time: "2 menit yang lalu",
    icon: CheckCircle,
    iconColor: "text-green-500 bg-green-50 dark:bg-green-950/30",
  },
  {
    id: 2,
    type: "pending",
    title: "Menunggu Pembayaran",
    description: "Segera selesaikan pembayaran Midtrans untuk Knitwear Stusyy.",
    time: "1 jam yang lalu",
    icon: CreditCard,
    iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
  },
];

const NotificationDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* Tombol Lonceng */}
        <MenuButton className="relative flex items-center justify-center p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:scale-105 transition shadow-sm cursor-pointer">
          <Bell size={18} />
          {/* Badge Bulatan Merah (Menandakan ada notifikasi baru) */}
          {dummyNotifications.length > 0 && (
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
        </MenuButton>
      </div>

      {/* Pop-up Dropdown Kotak Notifikasi */}
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 top-16 md:top-auto w-[calc(100vw-32px)] sm:w-96 max-w-sm origin-top rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 shadow-xl ring-1 ring-black/5 focus:outline-none z-50">
          
          {/* Header Pop-up */}
          <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Notifikasi Transaksi</span>
            <span className="text-xs text-neutral-400 hover:underline cursor-pointer">Tandai dibaca</span>
          </div>

          {/* List Item Notifikasi */}
          <div className="max-h-80 overflow-y-auto mt-1 space-y-1 no-scrollbar">
            {dummyNotifications.length === 0 ? (
              <div className="py-8 text-center text-sm text-neutral-400">
                Belum ada notifikasi transaksi.
              </div>
            ) : (
              dummyNotifications.map((notif) => {
                const IconComponent = notif.icon;
                return (
                  <MenuItem key={notif.id}>
                    {({ focus }) => (
                      <div
                        className={`${
                          focus ? "bg-neutral-50 dark:bg-neutral-800/50" : ""
                        } flex gap-x-3 p-3 rounded-xl transition cursor-pointer`}
                      >
                        {/* Wrapper Lingkaran Ikon */}
                        <div className={`h-9 w-9 shrink-0 flex items-center justify-center rounded-xl ${notif.iconColor}`}>
                          <IconComponent size={18} />
                        </div>

                        {/* Detail Teks Notifikasi */}
                        <div className="flex flex-col min-w-0">
                          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                            {notif.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5 leading-relaxed">
                            {notif.description}
                          </p>
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    )}
                  </MenuItem>
                );
              })
            )}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default NotificationDropdown;