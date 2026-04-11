import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Intro = ({ onAnimationComplete }) => {
  const wrapperRef = useRef(null);
  const nameRef = useRef(null);
  const dotRef = useRef(null);
  const extRef = useRef(null);

  useGSAP(() => {
    const nameChars = Array.from(nameRef.current.children);
    const dotEl = dotRef.current;
    const extChars = Array.from(extRef.current.children);
    const originalExtText = "com";

    // 1. Başlangıç Durumları: Her şey gizli ve aşağıda
    gsap.set(nameChars, { opacity: 0, y: 20, filter: 'blur(10px)' });
    gsap.set(dotEl, { opacity: 0, scale: 0 });
    gsap.set(extChars, { opacity: 0, visibility: 'hidden' });

    // 2. Ana Zaman Çizelgesi
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        // Animasyon bitince ekranı yavaşça kaybet ve App.jsx'e haber ver
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onAnimationComplete) onAnimationComplete();
          }
        });
      }
    });

    // AŞAMA 1: "ibrahimeskin" harf harf yukarı kayarak belirir
    tl.to(nameChars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05, 
    });

    // AŞAMA 2: Nokta (.) güçlü bir şekilde vurur
    tl.to(dotEl, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2.5)',
    }, "-=0.4"); 

    // AŞAMA 3: "com" kısmı $, <, >, { } gibi sembollerle scramble olur
    extChars.forEach((char, index) => {
      tl.add(scrambleAndColorEffect(char, originalExtText[index]), "-=0.2");
    });

    // Ekranda 1 saniye kalıp kaybolur
    tl.to({}, { duration: 1.0 });

  }, { scope: wrapperRef });

  // Yazılımcı Sembolleri ve $ Efekti Fonksiyonu
  const scrambleAndColorEffect = (element, finalChar) => {
    const tl = gsap.timeline();
    // Ekranda akacak karakterler
    const chars = '$<>{}/#'; 
    // Renkler (Tailwind Mavi, Yeşil, İndigo)
    const softColors = ['#3b82f6', '#10b981', '#6366f1']; 
    const dummy = { frame: 0 };

    tl.set(element, { opacity: 1, visibility: 'visible' });

    tl.to(dummy, {
      frame: 10,
      duration: 0.7,
      ease: 'none',
      onUpdate: () => {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const randomColor = softColors[Math.floor(Math.random() * softColors.length)];
        element.textContent = randomChar;
        element.style.color = randomColor;
      },
      onComplete: () => {
        element.textContent = finalChar;
        gsap.to(element, { color: 'inherit', duration: 0.3 });
      }
    });
    return tl;
  };

  return (
    <div 
      ref={wrapperRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden select-none"
    >
      <h1 className="flex items-center text-4xl md:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
        
        <span ref={nameRef} className="flex">
          {'ibrahimeskin'.split('').map((char, i) => (
            <span key={i} className="inline-block">{char}</span>
          ))}
        </span>

        <span ref={dotRef} className="mx-[2px] text-primary-500">.</span>

        <span ref={extRef} className="flex text-primary-500">
          {'com'.split('').map((char, i) => (
            <span key={i} className="inline-flex justify-center w-[0.6em]">{char}</span>
          ))}
        </span>
        
      </h1>
    </div>
  );
};

export default Intro;