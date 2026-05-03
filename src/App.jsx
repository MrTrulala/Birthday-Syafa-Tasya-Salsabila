import confetti from "canvas-confetti";
import "./App.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const bottomRef = useRef(null);
  const audio1Ref = useRef(null);

  const NAME = "Syafa Tasya Salsabila";
  const DATE = "10 Mei";

  const [slide, setSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const slides = [
    `Pernahkah kamu menghitung berapa banyak detik yang telah kita lalui`,
    `Tiga ratus enam puluh lima hari baru saja terlewati dengan sejuta warna`,
    `Ada banyak cerita, tawa yang pecah, hingga lelah yang sempat singgah`,
    `Namun, lihatlah betapa hebatnya kamu tetap berdiri hingga detik ini`,
    `Di setiap langkah yang kamu ambil, dan di setiap lelah yang tidak kamu tunjukkan... Ketahuilah bahwa aku tidak pernah berhenti menyebut namamu dalam setiap sujudku`,
    `Aku selalu mendoakanmu. Mendoakan kesehatanmu, kelancaran setiap urusanmu, dan agar hatimu selalu dijaga oleh ketenangan yang luas.`,
    `Terima kasih sudah menjadi sosok yang luar biasa. Memilikimu di sampingku adalah hadiah terbaik yang pernah semesta berikan untukku.`,
    `Di usiamu yang baru ini, semoga setiap doa yang kamu langitkan segera menemukan jalan untuk menjadi nyata. Semoga bahagiamu selalu meluap`,
    `Selamat ulang tahun, Syafaa. Teruslah bersinar, karena dunia dan duniaku membutuhkan cahayamu. I love you, today, tomorrow, and forever`
  ];

  const openWA = (msg) => {
    const phone = "6281388919639";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // FUNGSI BARU: Memicu musik lewat interaksi klik
  const handleStart = () => {
    if (audio1Ref.current) {
      audio1Ref.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setStep(1);
  };

  useEffect(() => {
    if (step === 5) {
      confetti({
        particleCount: 200,
        spread: 80,
      });
    }
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      const words = slides[slide].split(" ");

      if (wordIndex < words.length) {
        const t = setTimeout(() => {
          setWordIndex(wordIndex + 1);
        }, 200);
        return () => clearTimeout(t);
      } else {
        if (slide < slides.length - 1) {
          setTimeout(() => {
            setSlide(slide + 1);
            setWordIndex(0);
          }, 1000);
        } else {
          setTimeout(() => {
            setStep(5);
          }, 5000);
        }
      }
    }
  }, [step, wordIndex, slide]);

  useEffect(() => {
    if (step === 4) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [wordIndex, slide, step]);

  return (
    <div className="container">
      {/* MUSIK TANPA MUTED DAN TANPA AUTOPLAY (DIPICU JS) */}
      <audio ref={audio1Ref} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="card">
        {step === 0 && (
          <>
            <h1>Hai 💖</h1>
            <p>Aku punya sesuatu buat kamu...</p>
            {/* Memanggil handleStart untuk memulai musik dan pindah ke step 1 */}
            <button onClick={handleStart}>Mulai</button>
          </>
        )}

        {step === 1 && (
          <>
            <h2>Kamu bener {NAME}?</h2>
            <button onClick={() => setStep(2)}>Iya 💕</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Kamu ulang tahun tanggal {DATE} kan?</h2>
            <button onClick={() => setStep(3)}>Iya 😍</button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Aku punya kejutan 🎁</h2>
            <button onClick={() => setStep(4)}>Lihat</button>
          </>
        )}

        {step === 4 && (
          <div className="typing-box">
            {slides.slice(0, slide).map((s, i) => (
              <p key={i} className="typing-text">
                {s}
              </p>
            ))}
            <p className="typing-text">
              {slides[slide]
                .split(" ")
                .slice(0, wordIndex)
                .join(" ")}
            </p>
            <div ref={bottomRef}></div>
          </div>
        )}

        {step === 5 && (
          <>
            <img src="/foto.jpg" alt="Birthday" style={{ width: "100%", borderRadius: "10px" }} />
            <h2>Selamat ulang tahun 🎂💖</h2>
            <p>
              Terima kasih sudah hadir di hidup aku ❤️  
              Kamu itu spesial banget buat aku.
            </p>
            <h3 style={{ marginTop: "20px" }}>
              Aku pengen ngerayain hari spesial kamu 💖
            </h3>
            <button
              className="wa"
              onClick={() => openWA("Bisa dong! Jemput jam 10 ya!")}
            >
              Bisa dong! Jemput jam 10 ya 💚
            </button>
            <button
              onClick={() => openWA("Mau, tapi jamnya aku yang tentuin ya")}
            >
              Aku yang Atur jam 💜
            </button>
          </>
        )}
      </div>

      <div className="hearts">
        <span>💖</span>
        <span>💕</span>
        <span>💗</span>
        <span>💓</span>
        <span>💞</span>
      </div>
    </div>
  );
}