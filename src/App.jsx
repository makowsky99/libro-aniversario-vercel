import React, { useEffect, useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Card, CardContent } from "@/components/ui/card";

const Page = ({ front, back }) => (
  <div className="w-full h-full">
    <Flippy
      flipOnHover={false}
      flipOnClick={true}
      flipDirection="horizontal"
      className="w-full h-full"
    >
      <FrontSide className="bg-white shadow-xl p-6 rounded-xl">
        {typeof front === 'string' || React.isValidElement(front) ? front : null}
      </FrontSide>
      <BackSide className="bg-[#fff8f1] shadow-xl p-6 rounded-xl">
        {typeof back === 'string' || React.isValidElement(back) ? back : null}
      </BackSide>
    </Flippy>
  </div>
);

const razones = [
  // ... (las 200 razones siguen intactas)
  "200. Porque amarte es lo más hermoso que me ha pasado."
];

const groupReasons = (list) => {
  const grouped = [];
  let groupSize = 0;
  for (let i = 0; i < list.length; ) {
    if (list.length - i > 8) {
      groupSize = (i % 2 === 0) ? 7 : 8;
    } else {
      groupSize = list.length - i;
    }
    grouped.push(list.slice(i, i + groupSize));
    i += groupSize;
  }
  return grouped;
};

const LibroAniversario = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("click", playAudio);
    return () => document.removeEventListener("click", playAudio);
  }, []);

  const razonesAgrupadas = groupReasons(razones);

  return (
    <div className="flex flex-col items-center gap-6 py-10 bg-pink-50 min-h-screen">
      <audio ref={audioRef} loop src="/music.mpeg" />

      <Page
        front={
          <>
            <img src="/image.jpg" alt="Portada" className="w-full h-48 object-cover rounded-xl mb-4" />
            <h1 className="text-2xl font-bold text-center">200 razones para quedarme... y 1 para irme</h1>
            <p className="text-center text-sm mt-4">Un libro para recordarte por qué Te amo TANTOO.</p>
          </>
        }
        back={<p className="text-center text-sm italic">Desliza para comenzar...</p>}
      />

      {razonesAgrupadas.map((grupo, index) => {
        const globalStart = razonesAgrupadas.slice(0, index).reduce((sum, g) => sum + g.length, 0);
        const globalEnd = globalStart + grupo.length;
        return (
          <Page
            key={index}
            front={
              <>
                <h2 className="text-xl font-semibold mb-2">Razones #{globalStart + 1} - #{globalEnd}</h2>
                <ul className="list-[square] pl-4 space-y-1 text-sm italic">
                  {grupo.map((razon, idx) => (
                    <li key={idx}>{razon}</li>
                  ))}
                </ul>
              </>
            }
            back={<p className="text-sm italic text-center">Seguimos...</p>}
          />
        );
      })}

      <Page
        front={
          <>
            <h2 className="text-xl font-semibold text-center">Y la única razón para irme...</h2>
            <p className="text-center text-sm italic mt-6">(aún no la encontré)</p>
          </>
        }
        back={<p className="text-center text-sm italic">Fin 💖</p>}
      />
    </div>
  );
};

export default LibroAniversario;