"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";

const countdownTarget = new Date("2025-07-01T23:59:59");

function formatTimeArabic(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let dayLabel = "يومًا";
  if (days === 1) dayLabel = "يوم";
  else if (days >= 2 && days <= 10) dayLabel = "أيام";

  const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  const icon = days >= 1 ? "⏳" : "⏰";

  return `${icon} باقي: ${days} ${dayLabel} ${time}`;
}

function TopPar() {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, countdownTarget.getTime() - Date.now())
  );

  const locale = Cookies.get("NEXT_LOCALE") || "ar";

  // حركة النص: 
  // للعربية: من 100% (خارج اليمين) إلى -100% (خارج اليسار)
  // للغات أخرى: العكس
  const animationX =
    locale === "ar" ? ["100%", "-100%"] : ["-100%", "100%"];

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, countdownTarget.getTime() - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isUrgent = timeLeft <= 3600 * 1000;

  const messages = useMemo(
    () => [
      "🚚 توصيل مجاني وخصم 40% لأول 3 طلبات!",
      "🎁 اطلب الآن واحصل على مشروب مجاني!",
      "⚡ توصيل خلال أقل من 30 دقيقة!",
      formatTimeArabic(timeLeft),
    ],
    [timeLeft]
  );

  return (
    <div className="header-top-area py-2">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="overflow-hidden flex-grow-1 me-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="d-flex flex-nowrap text-nowrap"
              animate={isHovered ? { x: 0 } : { x: animationX }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="me-5 d-flex">
                  {messages.map((msg, j) => (
                    <span
                      key={`${i}-${j}`}
                      className={`fw-semibold mx-4 ${
                        j === messages.length - 1
                          ? isUrgent
                            ? "text-danger blink"
                            : "text-white"
                          : "text-white"
                      }`}
                    >
                      {msg}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* الاتصال */}
          <div className="d-flex text-white justify-content-md-end mt-2 mt-md-0">
            <div className="contact-number-area d-flex align-items-center px-2">
              <i className="fa-light fa-headset fs-2xl mx-2"></i>
              <Link
                className="d-none d-md-inline text-nowrap fw-medium tel"
                href="tel:+4733378901"
              >
                +258 3268 21485
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blink {
          animation: blink 1s linear infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default TopPar;
