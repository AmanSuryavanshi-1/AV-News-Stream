import React from 'react'

const Notes = () => {
  return (
    <div className="relative mt-16 flex items-center justify-center w-full h-[95%] py-10 overflow-hidden bg-primary-bgColor text-primary-white">
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-primary-bgColor"></div>
      <div className="relative z-10 w-full max-w-md p-6 mx-auto text-center border shadow-xl rounded-xl bg-primary-grey/30 backdrop-blur-md border-primary-white/10 sm:p-8">
        <h1 className="mb-3 font-serif text-2xl font-bold tracking-wide text-primary-yellow sm:text-3xl">
          Smart Notes Feature Coming Soon!
        </h1>
        <p className="mb-4 font-sans text-sm leading-relaxed text-primary-light sm:text-base">
          Stay organized with our new Smart Notes feature. Jot down thoughts, get personalized recommendations, and stay informed on topics that matter to you.
        </p>
        <div className="inline-block px-4 py-2 font-sans text-sm font-semibold transition-all duration-300 ease-in-out transform rounded-full hover:scale-105 text-primary-dark bg-primary-yellow hover:bg-primary-light hover:text-primary-dark sm:text-base">
          Stay Tuned
        </div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-yellow animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 1}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Notes