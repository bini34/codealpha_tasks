"use client"
import { useState } from "react";

interface Age {
  years: number;
  months: number;
  days: number;
}

export default function Home() {
  const [dob, setDob] = useState<string>("");
  const [age, setAge] = useState<Age | null>(null);

  const calculateAge = (): void => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Age Calculator</h1>
        <input
          type="date"
          className="w-full p-3 border rounded-lg text-black shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button
          onClick={calculateAge}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition transform hover:scale-105 hover:bg-blue-700"
        >
          Calculate Age
        </button>
        {age && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md flex gap-2 justify-center">
            <p className="text-lg font-semibold text-gray-700">You are:</p>
            <p className="text-lg font-bold text-gray-900">{age.years} Years old </p>
          </div>
        )}
      </div>
    </div>
  );
}
